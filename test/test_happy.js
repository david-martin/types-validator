var types_validator = require('../index.js');

exports.testValidParams = function(test) {
  types_validator({}, {});
  test.done()
};

exports.testValidConfig = function(test) {
  types_validator({
    should_be_a_array: [],
    should_be_a_number: 7,
    should_be_a_string: 'a string',
    should_be_a_object: {}
  }, {
    should_be_a_array: Array,
    should_be_a_number: Number,
    should_be_a_string: String,
    should_be_a_object: Object
  });
  test.done();
};

exports.testValidConfigNumber = function(test) {
  types_validator({
    should_be_a_number: 7
  }, {
    should_be_a_number: Number
  });
  test.done();
};

exports.testValidConfigString = function(test) {
  types_validator({
    should_be_a_string: 'a string'
  }, {
    should_be_a_string: String
  });
  test.done();
};

exports.testValidConfigObject = function(test) {
  types_validator({
    should_be_a_object: {}
  }, {
    should_be_a_object: Object
  });
  test.done();
};

exports.testValidConfigArray = function(test) {
  types_validator({
    should_be_a_array: []
  }, {
    should_be_a_array: Array
  });
  test.done();
};