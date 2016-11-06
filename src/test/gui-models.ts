import { GuiModel } from '../lib/gui-model';

/* tslint:disable:max-line-length */

export const simple_gui_model1: GuiModel = Object.freeze<GuiModel>(
{
  kind: 'group',
  name: '',
  controlType: 'group',
  label: '',
  tooltip: '',
  settingsObjectPath: '',
  required: true,
  elements: [
    { kind: 'field', name: 'username', controlType: 'input', label: 'username', tooltip: '', settingsObjectPath: 'username', defaultValue: '', required: true, type: 'string', subType: 'none' },
    { kind: 'field', name: 'password', controlType: 'input', label: 'password', tooltip: '', settingsObjectPath: 'password', defaultValue: '', required: true, type: 'string', subType: 'none' }
  ],
  errors: [],
  isRoot: true
});

export const simple_gui_model2: GuiModel = Object.freeze<GuiModel>({
  kind: 'group',
  name: '',
  controlType: 'group',
  label: '',
  tooltip: '',
  settingsObjectPath: '',
  required: true,
  elements: [
    { kind: 'field', name: 'username', controlType: 'input', label: 'user name', tooltip: 'a username description here', settingsObjectPath: 'username', defaultValue: 'username default', required: true, type: 'string', subType: 'none' },
    { kind: 'field', name: 'password', controlType: 'input', label: 'password', tooltip: 'a password description here', settingsObjectPath: 'password', defaultValue: 'password default', required: true, type: 'string', subType: 'none' }
  ],
  errors: [],
  isRoot: true
});

export const test_different_elements_gui_model1: GuiModel = Object.freeze<GuiModel>({
  kind: 'group',
  name: '',
  controlType: 'group',
  label: '',
  tooltip: '',
  settingsObjectPath: '',
  required: true,
  elements: [
    { kind: 'field', name: 'username', controlType: 'input', label: 'User name', tooltip: 'a username description here', settingsObjectPath: 'username', defaultValue: 'username default', required: true, type: 'string', subType: 'none' },
    { kind: 'field', name: 'usertype', controlType: 'dropdown', label: 'User type', tooltip: 'a type description here', settingsObjectPath: 'usertype', defaultValue: 'user', values: [ 'user', 'superuser'], required: true, type: 'string', subType: 'none' },
    { kind: 'field', name: 'host', controlType: 'input', label: 'Hostname', tooltip: 'a hostname description here', settingsObjectPath: 'host', defaultValue: 'localhost', required: false, type: 'string', subType: 'hostname' },
    { kind: 'field', name: 'age', controlType: 'input', label: 'Age', tooltip: 'an age description here', settingsObjectPath: 'age', defaultValue: 18, required: false, type: 'integer', subType: 'none' },
    { kind: 'field', name: 'size', controlType: 'dropdown', label: 'Size', tooltip: 'a size description here', settingsObjectPath: 'size', defaultValue: 0, values: [ 0, 1, 2, null], required: false, type: 'integer', subType: 'none' },
    { kind: 'field', name: 'rate', controlType: 'input', label: 'Rate', tooltip: 'a rate description here', settingsObjectPath: 'rate', defaultValue: 41.42, required: false, type: 'number', subType: 'none' },
    { kind: 'field', name: 'rank', controlType: 'dropdown', label: 'Rank', tooltip: 'a rank description here', settingsObjectPath: 'rank', defaultValue: 3.14, values: [ 3.14, 0.33, 9.99], required: false, type: 'number', subType: 'none'},
    { kind: 'field', name: 'registered', controlType: 'yesno', label: 'Registered', tooltip: 'a registered description here', settingsObjectPath: 'registered', defaultValue: false, required: false, type: 'boolean', subType: 'none' }
  ],
  errors: [],
  isRoot: true
});

export const test_groups_gui_model1: GuiModel = Object.freeze<GuiModel>({
  kind: 'group',
  name: '',
  controlType: 'group',
  label: '',
  tooltip: '',
  settingsObjectPath: '',
  required: true,
  elements: [
    { kind: 'field', name: 'simple1', controlType: 'input', label: 'A simple field level 1', tooltip: '', settingsObjectPath: 'simple1', defaultValue: '', required: false, type: 'string', subType: 'none' },
    { kind: 'group', name: 'group1', controlType: 'group', label: 'Group at level 1', tooltip: '', settingsObjectPath: 'group1', isRoot: false, required: false,
      elements: [
        { kind: 'field', name: 'simple2', controlType: 'input', label: 'A simple field level 2', tooltip: '', settingsObjectPath: 'group1.simple2', defaultValue: '', required: false, type: 'string', subType: 'none' },
        { kind: 'group', name: 'group2', controlType: 'group', label: 'Group at level 2', tooltip: '', settingsObjectPath: 'group1.group2', isRoot: false, required: false,
          elements: [
            { kind: 'group', name: 'group3', controlType: 'group', label: 'Group at level 3', tooltip: '', settingsObjectPath: 'group1.group2.group3', isRoot: false, required: false,
              elements: [
                { kind: 'field', name: 'simple4', controlType: 'input', label: 'A simple field level 4', tooltip: '', settingsObjectPath: 'group1.group2.group3.simple4', defaultValue: '', required: false, type: 'string', subType: 'none' }
              ]
            },
            { kind: 'field', name: 'simple3', controlType: 'input', label: 'A simple field level 3', tooltip: '', settingsObjectPath: 'group1.group2.simple3', defaultValue: '', required: false, type: 'string', subType: 'none' }
          ]
        }
      ]
    }
  ],
  errors: [],
  isRoot: true
});

export const complex_gui_model1: GuiModel = Object.freeze<GuiModel>({
  kind: 'group',
  name: '',
  controlType: 'group',
  label: '',
  tooltip: '',
  settingsObjectPath: '',
  required: true,
  elements: [
    { kind: 'group', name: 'authentication', controlType: 'group', label: 'Authentication', tooltip: 'an authentication description here', settingsObjectPath: 'authentication', isRoot: false, required: true,
      elements: [ { kind: 'field', name: 'user', controlType: 'input', label: 'User', tooltip: 'a username', settingsObjectPath: 'authentication.user', defaultValue: '', required: true, type: 'string', subType: 'none' },
                  { kind: 'field', name: 'password', controlType: 'input', label: 'Password', tooltip: 'a password', settingsObjectPath: 'authentication.password', defaultValue: '', required: true, type: 'string', subType: 'none' },
                  { kind: 'field', name: 'scheme', controlType: 'input', label: 'scheme',  tooltip: '', settingsObjectPath: 'authentication.scheme', defaultValue: 'basic', required: true, type: 'string', subType: 'none' },
                  { kind: 'field', name: 'preemptive', controlType: 'yesno', label: 'preemptive',  tooltip: '', settingsObjectPath: 'authentication.preemptive', defaultValue: true, required: true, type: 'boolean', subType: 'none'}
                ]
    },
    { kind: 'group', name: 'server', controlType: 'group', label: 'Server', tooltip: '', settingsObjectPath: 'server', isRoot: false, required: true,
      elements: [ { kind: 'field', name: 'host', controlType: 'input', label: 'host', tooltip: '', settingsObjectPath: 'server.host', defaultValue: '', required: true, type: 'string', subType: 'none' },
                  { kind: 'field', name: 'port', controlType: 'input', label: 'port', tooltip: '', settingsObjectPath: 'server.port', defaultValue: 80, required: true, type: 'integer', subType: 'none' },
                  { kind: 'field', name: 'protocol', controlType: 'dropdown', label: 'protocol', tooltip: '', settingsObjectPath: 'server.protocol', defaultValue: 'http', values: ['http', 'ftp'], required: true, type: 'string', subType: 'none' }
                ]
    },
    { kind: 'group', name: 'testing', controlType: 'group', label: 'Testing', tooltip: '', settingsObjectPath: 'testing', isRoot: false, required: false,
      elements: [ { kind: 'field', name: 'beforeOperationDelay', controlType: 'input', label: 'beforeOperationDelay', tooltip: '', settingsObjectPath: 'testing.beforeOperationDelay', defaultValue: 1, required: true, type: 'integer', subType: 'none' },
                  { kind: 'field', name: 'afterOperationDelay', controlType: 'input', label: 'afterOperationDelay', tooltip: '', settingsObjectPath: 'testing.afterOperationDelay', defaultValue: 2, required: false, type: 'integer', subType: 'none' }
                ]
    }
  ],
  errors: [],
  isRoot: true
});

export const invalid_gui_model1: GuiModel = {
   kind : 'group', name: '', controlType: 'group', settingsObjectPath: '', label: '', tooltip: '', isRoot: true, required: true, elements: [],
   'errors': [
     { schemaPath: 'properties.username', errorText: 'Unsupported element type string' },
     { schemaPath: 'properties.password', errorText: 'Type elements must be strings (not boolean) ' },
     { schemaPath: 'properties.password', errorText: 'Unrecognized element type false' }
   ]
};