// -------------------------------------------------------------
// This file contains schemas for test input by mapper
// -------------------------------------------------------------

import { JsonSchema } from '../dependencies/json-schema';

export const simple_schema1: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'username': {
      'type': 'string'
    },
    'password': {
      'type': 'string'
    }
  },
  'required': [
    'username',
    'password'
  ],
  'additionalProperties': false
};

export const simple_schema2: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'username': {
      'type': 'string',
      'title': 'user name',
      'description': 'a username description here',
      'default' : 'username default',
      'minLength' : 3,
      'maxLength' : 80,
      'pattern' : '[0-9\\wøæåÆØÅ]+'
    },
    'password': {
      'type': 'string',
      'title': 'password',
      'description': 'a password description here',
      'default' : 'password default',
      'minLength' : 8,
      'maxLength' : 256
    }
  },
  'required': [
    'username',
    'password'
  ],
  'additionalProperties': false
};

export const test_different_elements_schema1: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'username': {
      'type': 'string',
      'title': 'User name',
      'description': 'a username description here',
      'default' : 'username default',
      'minLength' : 3,
      'maxLength' : 80,
      'pattern' : '[0-9\\wæøåÆØÅ]+'
    },
    'usertype': {
      'type': 'string',
      'title': 'User type',
      'description': 'a type description here',
      'default' : 'user',
      'enum' : [ 'user', 'superuser']
    },
    'host': {
      'type': 'string',
      'title': 'Hostname',
      'description': 'a hostname description here',
      'default' : 'localhost',
      'format' : 'hostname',
    },
    'age': {
      'type': 'integer',
      'title': 'Age',
      'description': 'an age description here',
      'default' : 18,
      'maximum' : 99,
      'minimum' : 15,
      'exclusiveMaximum': true,
      'exclusiveMinimum': true,
      'multipleOf' : 2
    },
    'size': {
      'type': 'integer',
      'title': 'Size',
      'description': 'a size description here',
      'default' : 0,
      'enum' : [0, 1, 2, null]
    },
    'rate': {
      'type': 'number',
      'title': 'Rate',
      'description': 'a rate description here',
      'default' : 41.42
    },
    'rank': {
      'type': 'number',
      'title': 'Rank',
      'description': 'a rank description here',
      'default' : 3.14,
      'enum' : [3.14, 0.33, 9.99]
    },
    'registered': {
      'type': 'boolean',
      'title': 'Registered',
      'description': 'a registered description here',
      'default' : false
    }
  },
  'required': [
    'username',
    'usertype'
  ],
  'additionalProperties': false
};

export const test_groups_schema1: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'simple1': {
      'type': 'string',
      'title': 'A simple field level 1',
    },
    'group1': {
      'type': 'object',
      'title': 'Group at level 1',
      'properties': {
        'simple2': {
          'type': 'string',
          'title': 'A simple field level 2',
        },
        'group2': {
          'type': 'object',
          'title': 'Group at level 2',
          'properties': {
            'group3': {
              'type': 'object',
              'title': 'Group at level 3',
              'properties': {
                'simple4': {
                  'type': 'string',
                  'title': 'A simple field level 4',
                }
            }},
            'simple3': {
              'type': 'string',
              'title': 'A simple field level 3',
            }
        }}
      }
    }
  },
  'additionalProperties': false
};

export const complex_schema1: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'authentication': {
      'type': 'object',
      'title': 'Authentication',
      'description': 'an authentication description here',
      'properties': {
        'user': {
          'type': 'string',
          'minLength': 1,
          'default': '',
          'title' : 'User',
          'description': 'a username',
        },
        'password': {
          'type': 'string',
          'minLength': 1,
          'default': '',
          'title' : 'Password',
          'description': 'a password',
        },
        'scheme': {
          'type': 'string',
          'default': 'basic'
        },
        'preemptive': {
          'type': 'boolean',
          'default': true
        }
      },
      'required': [
        'user',
        'password',
        'scheme',
        'preemptive'
      ]
    },
    'server': {
      'type': 'object',
      'title': 'Server',
      'properties': {
        'host': {
          'type': 'string',
          'default': ''
        },
        'port': {
          'type': 'integer',
          'multipleOf': 1,
          'maximum': 65535,
          'minimum': 0,
          'exclusiveMaximum': false,
          'exclusiveMinimum': false,
          'default': 80
        },
        'protocol': {
          'type': 'string',
          'default': 'http',
          'enum' : ['http', 'ftp']
        }
      },
      'required': [
        'host',
        'port',
        'protocol'
      ]
    },
    'testing': {
      'type': 'object',
      'title': 'Testing',
      'properties': {
        'beforeOperationDelay': {
          'type': 'integer',
          'multipleOf': 1,
          'default': 1
        },
        'afterOperationDelay': {
          'type': 'integer',
          'multipleOf': 1,
          'default': 2
        }
      },
      'required': [
        'beforeOperationDelay'
      ]
    }
  },
  'required': [
    'authentication',
    'server'
  ],
  'additionalProperties': false
};

export const invalid_schema1: any = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    username: 'string',
    password: {
      type: false,
    }
  }
};


