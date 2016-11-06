# json-schema-js-gui-model
Handy gui model and associated translator that can be used to construct javascript UI forms from json-schemas

WARNING: Work in progress.

Schemas can be translated using the exported GuiModelMapper class or by using the command line
client linked by npm: ```mapToGuiModel sourceSchema destFile```

**Example input schema:**
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "authentication": {
      "type": "object",
      "title": "Authentication",
      "description": "an authentication description here",
      "properties": {
        "user": {
          "type": "string",
          "minLength": 1,
          "default": "",
          "title" : "User",
          "description": "a username"
        },
        "password": {
          "type": "string",
          "minLength": 1,
          "default": "",
          "title" : "Password",
          "description": "a password"
        },
        "scheme": {
          "type": "string",
          "default": "basic"
        },
        "preemptive": {
          "type": "boolean",
          "default": true
        }
      },
      "required": [
        "user",
        "password"
      ]
    },
    "server": {
      "type": "object",
      "title": "Server",
      "properties": {
        "host": {
          "type": "string",
          "default": ""
        },
        "port": {
          "type": "integer",
          "multipleOf": 1,
          "maximum": 65535,
          "minimum": 0,
          "exclusiveMaximum": false,
          "exclusiveMinimum": false,
          "default": 80
        },
        "protocol": {
          "type": "string",
          "default": "http",
          "enum" : ["http", "ftp"]
        }
      }
    }
  }
}
```

**Example gui model output:**
```
{
  "kind": "group",
  "name": "",
  "controlType": "group",
  "settingsObjectPath": "",
  "label": "",
  "tooltip": "",
  "isRoot": true,
  "required": true,
  "elements": [
    {
      "kind": "group",
      "name": "authentication",
      "controlType": "group",
      "settingsObjectPath": "authentication",
      "label": "Authentication",
      "tooltip": "an authentication description here",
      "isRoot": false,
      "required": false,
      "elements": [
        {
          "kind": "field",
          "name": "user",
          "controlType": "input",
          "label": "User",
          "tooltip": "a username",
          "settingsObjectPath": "authentication.user",
          "defaultValue": "",
          "required": true,
          "type": "string",
          "subType": "none"
        },
        {
          "kind": "field",
          "name": "password",
          "controlType": "input",
          "label": "Password",
          "tooltip": "a password",
          "settingsObjectPath": "authentication.password",
          "defaultValue": "",
          "required": true,
          "type": "string",
          "subType": "none"
        },
        {
          "kind": "field",
          "name": "scheme",
          "controlType": "input",
          "label": "scheme",
          "tooltip": "",
          "settingsObjectPath": "authentication.scheme",
          "defaultValue": "basic",
          "required": false,
          "type": "string",
          "subType": "none"
        },
        {
          "kind": "field",
          "name": "preemptive",
          "controlType": "yesno",
          "label": "preemptive",
          "tooltip": "",
          "settingsObjectPath": "authentication.preemptive",
          "defaultValue": true,
          "required": false,
          "type": "boolean",
          "subType": "none"
        }
      ]
    },
    {
      "kind": "group",
      "name": "server",
      "controlType": "group",
      "settingsObjectPath": "server",
      "label": "Server",
      "tooltip": "",
      "isRoot": false,
      "required": false,
      "elements": [
        {
          "kind": "field",
          "name": "host",
          "controlType": "input",
          "label": "host",
          "tooltip": "",
          "settingsObjectPath": "server.host",
          "defaultValue": "",
          "required": false,
          "type": "string",
          "subType": "none"
        },
        {
          "kind": "field",
          "name": "port",
          "controlType": "input",
          "label": "port",
          "tooltip": "",
          "settingsObjectPath": "server.port",
          "defaultValue": 80,
          "required": false,
          "type": "integer",
          "subType": "none"
        },
        {
          "kind": "field",
          "name": "protocol",
          "controlType": "dropdown",
          "label": "protocol",
          "tooltip": "",
          "settingsObjectPath": "server.protocol",
          "defaultValue": "http",
          "values": [
            "http",
            "ftp"
          ],
          "required": false,
          "type": "string",
          "subType": "none"
        }
      ]
    }
  ],
  "errors": []
}
```

