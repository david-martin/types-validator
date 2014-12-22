# Types Validator

[![npm version](https://badge.fury.io/js/types-validator.svg)](http://badge.fury.io/js/types-validator)
[![Build Status](https://travis-ci.org/david-martin/types-validator.svg)](https://travis-ci.org/david-martin/types-validator)

A value type validator.
Validates the types in an object against a schema, exposing them through an accessor.

# Usage

```
npm install --save types-validator
```

```js
var types_validator = require('types-validator');

var raw_config = {
  ipaddress: '127.0.0.1',
  port: 8080,
  mongo: {
    user: 'db-user',
    pass: 'db-pass'
  }
};

var schema = {
  'ipaddress': String,
  'port': Number,
  'mongo.user': String,
  'mongo.pass': String
};

// validate config against schema
// NOTE: this will throw an exception if the raw config doesn't match the schema
var config = types_validator(raw_config, schema);

// returned object exposes an accessor for getting config values,
// which validates the requested key against the schema at runtime
var port = config.get('port'); // returns 8080

// nested keys are retrieved using dot notation
var mongo_user = config.get('mongo.user');

// it is not necessary to add every nested key path to the schema,
// only the key paths that will be retrieved by your application through
// the accessor (config.get())
// For exmaple, if we wanted to only validate the 'mongo' config was an object,
// and retrieve the full object, we could use this schema instead:
 var schema = {
  'ipaddress': String,
  'port': Number,
  'mongo': Object
};
// and retrieve the mongo config (as an object) using:
var mongo_config = config.get('mongo');

// NOTE: the following will throw an exception as the key has not beed added to the schema
var use_ssl = config.get('use_ssl');

// the schema and the raw config are available on the returned object if needed
config.raw; // ==> raw_config
config.schema; // ==> schema
```

For further examples and usage (and exceptions), see test/*.js
