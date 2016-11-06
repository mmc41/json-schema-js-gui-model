import { JsonSchema } from '../dependencies/json-schema';
import { isString, isNumber, isBoolean, isIntegerNumber, isArray, isObject } from './type-utils';

import { GuiModel, Group, GuiElement, SubDataType,
         TranslationError, TypedField } from './gui-model';

/**
 * Process a json schema node. This can either be the root or an object inside it when called recursively from within each property.
 * @param settingsKeyPath The corresponding object path in the settings object for the schema element. Used by clients of gui model.
 * @param schemaPath The path of the element inside the schema itself. Used for error reporting.
 * @param accumulatedErrors A mutable(!) array where any errors during processing are appended.
 */
function processProperties(obj: JsonSchema, settingsKeyPath: string, schemaPath: string, accumulatedErrors: TranslationError[]): GuiElement[] {
    let result: GuiElement[] = [];

    let properties = obj.properties || {};
    let requiredKeys = new Set(obj.required || []);

    for (let key in properties) {
        if (properties.hasOwnProperty(key)) {
            validate(key, 'key', 'string', (v) => isString(v), settingsKeyPath, accumulatedErrors);

            let settingsPropertyKeyPath = (settingsKeyPath === '') ? key : settingsKeyPath + '.' + key;
            let schemaPropertyPath = (schemaPath === '') ? 'properties.' + key : schemaPath + '.' + 'properties.' + key;

            let requiredItem = requiredKeys.has(key);

            let value = properties[key] as JsonSchema;
            if (isObject(value)) {
               let element = processProperty(key, value, requiredItem, settingsPropertyKeyPath, schemaPropertyPath, accumulatedErrors);
               // Guard against fatal errors in recursive call:
               if (element) {
                 result.push(element);
               }
            } else {
               addError(accumulatedErrors, 'Unsupported element type ' + typeof value, schemaPropertyPath);
            }
        }
    }

    return result;
}

/**
 * Process a json schema key/value property definition.  
 */
function processProperty(key: string, value: any, requiredItem: boolean, keyPath: string, schemaPath: string, accumulatedErrors: TranslationError[]): GuiElement {
    let type = value.type;
    if (!isString(type)) {
        addError(accumulatedErrors, 'Type elements must be strings (not ' + typeof type + ') ', schemaPath);
    }

    let label = value.title || key;
    validate(label, 'title', 'string', (v) => isString(v), schemaPath, accumulatedErrors);

    let tooltip = value.description || '';
    validate(tooltip, 'tooltip', 'string', (v) => isString(v), schemaPath, accumulatedErrors);

    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'integer') {
        let defaultValue = value.default;
        if (defaultValue === undefined || defaultValue === null) {
            switch (type) {
                case 'number': defaultValue = 0.0; break;
                case 'boolean': defaultValue = false; break;
                case 'integer': defaultValue = 0; break;
                default: defaultValue = '';
            }
        }

        let dataSubType: SubDataType = value.format || 'none';
        let enumValues = value.enum; // Undefined otherwise.

        validateField(type, dataSubType, defaultValue, enumValues, keyPath, schemaPath, requiredItem, accumulatedErrors);

        let prop: GuiElement;
        switch (type) {
            case 'number':  prop = createNumberField(key, keyPath, label, tooltip, defaultValue, requiredItem, dataSubType, enumValues);
                            break;
            case 'boolean': prop = createBooleanField(key, keyPath, label, tooltip, defaultValue, requiredItem, dataSubType, enumValues);
                            break;
            case 'integer': prop = createIntegerField(key, keyPath, label, tooltip, defaultValue, requiredItem, dataSubType, enumValues);
                            break;
            case 'string':  prop = createStringField(key, keyPath, label, tooltip, defaultValue, requiredItem, dataSubType, enumValues);
                            break;

            default:        prop = null;
                            addError(accumulatedErrors, 'Unsupported type ' + type, schemaPath);
                            break;
        }

        return prop;
    } else if (type === 'object') {
        let nestedProperties = processProperties(value, keyPath, schemaPath, accumulatedErrors); // Note mutal recursive call.

        // Guard against fatal errors in recursive call:
        if (nestedProperties != null) {
          let group = createGroupProperty(key, keyPath, label, tooltip, requiredItem, nestedProperties);
          return group;
        }
    } else if (type === 'array') {
        // TODO: Consider supporting arrays if there are valid use cases: https://spacetelescope.github.io/understanding-json-schema/reference/array.html
        addError(accumulatedErrors, 'Arrays not supported (yet)', schemaPath);
    } else {
        addError(accumulatedErrors, 'Unrecognized element type ' + type, schemaPath);
    }

    return null;
}

function validateField(type: string, dataSubType: SubDataType, defaultValue: any, enumValues: any[],
                       keyPath: string, schemaPath: string,
                       requiredItem: boolean, accumulatedErrors: TranslationError[]): void {

    validate(dataSubType, 'format', 'string', (v) => isString(v), schemaPath, accumulatedErrors);

    let valueValidator: (value: any) => boolean;
    switch (type) {
        case 'number':  valueValidator = (v) => isNumber(v);
                        break;
        case 'boolean': valueValidator = (v) => isBoolean(v);
                        break;
        case 'integer': valueValidator = (v) => isIntegerNumber(v);
                        break;
        case 'string': valueValidator = (v) => isString(v);
                        break;
        default: valueValidator = (v) => true; // Don't validate.
                    addError(accumulatedErrors, 'Unsupported type ' + type, schemaPath);
                    break;
    }

    validate(defaultValue, 'default', type, valueValidator, schemaPath, accumulatedErrors);
    if (enumValues) {
        validateArray(enumValues, 'enum', !requiredItem, type, valueValidator, schemaPath, accumulatedErrors);
    }
}

/**
 * Create an immutable gui input dropdown element for a number, making any contained objects immutable in the process.
 */
function createNumberField(key: string, objectPath: string, label: string, tooltip: string, defaultValue: number,
                           required: boolean, dataType: SubDataType, values: number[] = undefined): TypedField<number> {
    return Object.freeze<TypedField<number>>({
        kind: 'field',
        name: key,
        controlType: values && values.length > 0  ? 'dropdown' : 'input',
        label: label,
        tooltip: tooltip,
        settingsObjectPath: objectPath,
        defaultValue: defaultValue,
        required: required,
        type: 'number',
        subType: dataType,
        values: values ? Object.freeze(values) : values
    });
}

/**
 * Create an immutable gui input dropdown element for an integer, making any contained objects immutable in the process.
 */
function createIntegerField(key: string, objectPath: string, label: string, tooltip: string, defaultValue: number,
                            required: boolean, dataType: SubDataType, values: number[] = undefined): TypedField<number> {
    return Object.freeze<TypedField<number>>({
        kind: 'field',
        name: key,
        controlType: values && values.length > 0  ? 'dropdown' : 'input',
        label: label,
        tooltip: tooltip,
        settingsObjectPath: objectPath,
        defaultValue: defaultValue,
        values: values ? Object.freeze(values) : values,
        required: required,
        type: 'integer',
        subType: dataType
    });
}

/**
 * Create an immutable gui input element for a boolean, making any contained objects immutable in the process.
 */
function createBooleanField(key: string, objectPath: string, label: string, tooltip: string, defaultValue: boolean,
                            required: boolean, dataType: SubDataType, values: boolean[] = undefined): TypedField<boolean> {
    return Object.freeze<TypedField<boolean>>({
        kind: 'field',
        name: key,
        controlType: 'yesno',
        label: label,
        tooltip: tooltip,
        settingsObjectPath: objectPath,
        defaultValue: defaultValue,
        values: values ? Object.freeze(values) : values,
        required: required,
        type: 'boolean',
        subType: dataType
    });
}

/**
 * Create an immutable gui input dropdown element for a string, making any contained objects immutable in the process.
 */
function createStringField(key: string, objectPath: string, label: string, tooltip: string, defaultValue: string,
                           required: boolean, dataType: SubDataType, values: string[] = undefined): TypedField<string> {
    return Object.freeze<TypedField<string>>({
        kind: 'field',
        name: key,
        controlType: values && values.length > 0 ? 'dropdown' : 'input',
        label: label,
        tooltip: tooltip,
        settingsObjectPath: objectPath,
        defaultValue: defaultValue,
        values: values ? Object.freeze(values) : values,
        required: required,
        type: 'string',
        subType: dataType
    });
}

/**
 * Create an immutable gui group element with nested gui elements inside, making any contained objects immutable in the process.
 */
function createGroupProperty(key: string, objectPath: string, label: string, tooltip: string, required: boolean, elements: GuiElement[]): Group {
    return Object.freeze<Group>({
        kind: 'group',
        name: key,
        controlType: 'group',
        settingsObjectPath: objectPath,
        label: label,
        tooltip: tooltip,
        isRoot: false,
        required: required,
        elements: Object.freeze(elements)
    });
}

function validate(value: any, valueName: string, allowedTypeName: string, validator: (value: any) => boolean, schemaPath: string, accumulatedErrors: TranslationError[]) {
  if (!validator(value)) {
     addError(accumulatedErrors, 'Illegal default ' + value + '. ' + allowedTypeName + ' expected ' , schemaPath + '.' + valueName);
     return false;
  } else {
    return true;
  }
}

function validateArray(values: any, valueName: string, allowNulls: boolean, allowedTypeName: string, validator: (value: any) => boolean,
                       schemaPath: string, accumulatedErrors: TranslationError[]) {
  if (!isArray(values)) {
     addError(accumulatedErrors, 'Illegal default. Array expected' + values, schemaPath + '.' + valueName);
     return false;
  } else {
    (values as Array<any>).forEach(value => {
        if (value === null) {
            if (!allowNulls) {
              addError(accumulatedErrors, 'Null not allowed in required array', schemaPath + '.' + valueName);
            }
        } else if (!validator(value)) {
          addError(accumulatedErrors, 'Illegal value types in array. Array of ' + allowedTypeName + ' expected', schemaPath + '.' + valueName);
        }
    });
    return true;
  }
}

function addError(errors: TranslationError[], errorText: string, schemaPath: string) {
    let error = {
        schemaPath: schemaPath,
        errorText: errorText
    };

    errors.push(error);
    return errors;
}

// --- Actual service starts here ---

/**
 * Mapping service that can convert a json schema to a gui model for presentation.
 */
export class GuiModelMapper {
  public constructor () {
  }

  /**
  * Converts a json schema into an immutable gui model. In case of errors, the associated error array will be non-empty and the 
  * resulting gui model may be invalid.
  */
  mapToGuiModel(schema: JsonSchema): GuiModel {
    // Setup mutable error reporting array that will have values added during procesing in case of errors.
    let errors: TranslationError[] = [];

    let result: GuiElement[];
    try {
         // Exceptions should not be thrown during processing but if they are (due to programming error) than safely process them here:
        result = processProperties(schema || {}, '', '', errors);
    } catch (err) {
        // Fallback: These errors should not occur - if they do the processing should be made more rubust to avoid them:
        result = [];
        addError(errors, 'Internal error processing json schema: ' + err, '');
    }

    // The expected result is an expanded group with error information:
    return Object.freeze<GuiModel>({
      kind: 'group',
      name: '',
      controlType: 'group',
      settingsObjectPath: '',
      label: '',
      tooltip: '',
      isRoot: true,
      required: true,
      elements: Object.freeze(result),
      errors: Object.freeze(errors)
    });
  }
}
