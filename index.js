var assert = require('assert');
var util = require('util');
var exceptionMessages = {
  MISSING_CONFIG : "The Config object is missing!",
  MISSING_SCHEMA : "The Schema object is missing!",
  MISSING_CONFIG_SECTION : "Config section %s missing!",
  MISSING_CONFIG_FROM_SCHEMA : "The config section %s is missing from the validation schema",
  BAD_CONFIG_TYPE : "Expected '%s' property to be of type '%s', but was '%s' with a value of '%s'"
};

function validateKey(config, schema, schema_key) {
  // ensure key is in the schema
  if (Object.keys(schema).indexOf(schema_key) === -1) {
    throw util.format(exceptionMessages.MISSING_CONFIG_FROM_SCHEMA, schema_key);
  }

  var schema_type = schema[schema_key];
  var config_val;

  try {
    config_val = eval('config.' + schema_key);
  } catch(e) {
    throw util.format(exceptionMessages.MISSING_CONFIG_SECTION, schema_key);
  }

  if (config_val != null) {
    if (config_val.constructor !== schema_type) {
      throw util.format(exceptionMessages.BAD_CONFIG_TYPE, schema_key, schema_type, config_val.constructor, config_val);
    }
  } else {
    throw util.format(exceptionMessages.MISSING_CONFIG_SECTION, schema_key);
  }
}

function validate (config, schema) {
  if ('object' !== typeof config) throw exceptionMessages.MISSING_CONFIG;
  if ('object' !== typeof schema) throw exceptionMessages.MISSING_SCHEMA;

  var errors = [];

  Object.keys(schema).forEach(function(schema_key) {
    try {
      validateKey(config, schema, schema_key);
    } catch (e) {
      errors.push(e);
    }
  });

  if (errors.length) {
    throw errors.join('\n');
  }
}


// Validates the passed in config against the passed in schema,
// returning a config object with a getter for config values.
// The getter validates the key/value at call time too.
// See README.md or example/config.js for usage.
// For additional usage, see tests in test/ folder.
module.exports = function(config, schema) {
  validate(config, schema);

  return {
    raw: config,
    schema: schema,

    // ensure the requested key in in the validation schema
    get: function(key) {
      validateKey(config, schema, key);

      return eval('config.' + key);
    }
  };
};

