/**
* The main gui controls that should be used.
*/
export type ControlType =
    'group' | 'input' | 'dropdown' | 'yesno';

/**
 * The javascript data types used.
 */
export type DataType =
     'string' | 'number' | 'integer' | 'boolean';

/**
* Special subtypes for strings; superset of json schema string formats.
*/
export type StringSubDataType =
    'text'
    | 'password'
    | 'date'
    | 'time'
    | 'date-time'
    | 'uri'
    | 'email'
    | 'hostname'
    | 'ipv4'
    | 'ipv6'
    | 'regex'
    | 'uuid'
    | 'json-pointer'
    | 'relative-json-pointer'
    ;

export type IntegerSubType =
      'port-number'
    | 'miliseconds'
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    ;

export type SubDataType = StringSubDataType | IntegerSubType | 'none';

/**
 * Common interface for all gui elements.
 */
export interface GuiElementBase {
  readonly name: string;

  readonly controlType: ControlType;

  readonly label: string;
  readonly tooltip: string;

    /**
     * A string representing a path to the property in json data file conforming to the plugin schema,
     * where each path component is seperated by a dot. Same as string representation of 
     * Lodash.get method or mariocasciaro's object-path (https://github.com/mariocasciaro/object-path).
     * This string is unique for all elements in a model and may thus be used as a key if needed.
     */
  readonly dataObjectPath: string;
  readonly required: boolean;
}


/**
 * Base interface for all types of gui input elements that are not containers for other elements.
 */
export interface FieldBase extends GuiElementBase {
  readonly kind: 'field';
  readonly type: DataType;
  readonly subType: SubDataType;
};

export interface TypedField<T> extends FieldBase {
  readonly defaultValue: T;
  readonly values?: ReadonlyArray<T>;
}

/**
 * A containers for other gui elements.
 */
export interface Group extends GuiElementBase {
  readonly kind: 'group';
  readonly elements: ReadonlyArray<GuiElement>;
}

export interface TranslationError {
  readonly schemaPath: string;
  readonly errorText: string;
};

/**
 * Represents a full gui model. Essentially a group but with an extra errors field.
 */
export interface GuiModel extends Group {
  readonly errors: ReadonlyArray<TranslationError>;
}

export type Field = TypedField<string> | TypedField<number> | TypedField<boolean>;

export type GuiElement = Group | Field;
