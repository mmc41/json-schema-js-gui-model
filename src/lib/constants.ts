import { GuiModel, Group } from './gui-model';
import { JsonSchema } from '../dependencies/json-schema';

export let EMPTY_SCHEMA: JsonSchema = Object.freeze({});

export let EMPTY_GUI_MODEL: GuiModel  = Object.freeze<GuiModel>({
    kind: 'group',
    name: '',
    controlType: 'group',
    label: '',
    tooltip: '',
    dataObjectPath: '',
    required: true,
    elements: [],
    errors: []
});

export let EMPTY_GUI_MODEL_GROUP: Group = Object.freeze<Group>({
    kind: 'group',
    name: '',
    controlType: 'group',
    label: '',
    tooltip: '',
    dataObjectPath: '',
    required: true,
    elements: []
});

