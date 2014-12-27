var typesValidator = require('../index.js');

exports.testNoConfig = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator();
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, 'The Config object is missing!');

  test.done();
};

exports.testNoSchema = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({});
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, 'The Schema object is missing!');

  test.done();
};

exports.testConfigMissing = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({}, {
      should_be_in_config: Number
    });
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, 'Config section should_be_in_config missing!');

  test.done();
};

exports.testConfigTypeMismatchNumber = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({
      should_be_a_number: 'a string'
    }, {
      should_be_a_number: Number
    });
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, "Expected \'should_be_a_number\' property to be of type \'function Number() { [native code] }\', " +
    "but was \'function String() { [native code] }\' with a value of \'a string\'");

  test.done();
};

exports.testConfigTypeMismatchString = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({
      should_be_a_number: 1
    }, {
      should_be_a_number: String
    });
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, "Expected \'should_be_a_number\' property to be of type \'function String() { [native code] }\', " +
    "but was \'function Number() { [native code] }\' with a value of \'1\'");

  test.done();
};

exports.testConfigTypeMismatchObject = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({
      should_be_a_number: 'a string'
    }, {
      should_be_a_number: Object
    });
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, "Expected \'should_be_a_number\' property to be of type \'function Object() { [native code] }\', " +
    "but was \'function String() { [native code] }\' with a value of \'a string\'");

  test.done();
};

exports.testConfigTypeMismatchArray = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({
      should_be_a_number: 'a string'
    }, {
      should_be_a_number: Array
    });
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, "Expected \'should_be_a_number\' property to be of type \'function Array() { [native code] }\', " +
    "but was \'function String() { [native code] }\' with a value of \'a string\'");

  test.done();
};

exports.testSchemaMissing = function(test) {
  var caught = false;
  var msg;

  try {
    typesValidator({}, {}).get('extra_config_not_in_schema');
  } catch(e) {
    msg = e;
    caught = true;
  }

  test.ok(caught, 'Expected exception');
  test.equal(msg, 'The config section extra_config_not_in_schema is missing from the validation schema');

  test.done();
};
