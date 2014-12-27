var typesValidator = require('../index.js');

exports.testValidParams = function(test) {
  typesValidator({}, {});
  test.done()
};

exports.testValidConfig = function(test) {
  var config = typesValidator({
    should_be_a_array: ['val'],
    should_be_a_number: 7,
    should_be_a_string: 'a string',
    should_be_a_object: {
      'key': 'val'
    }
  }, {
    should_be_a_array: Array,
    should_be_a_number: Number,
    should_be_a_string: String,
    should_be_a_object: Object
  });

  test.equal(config.get('should_be_a_number'), 7);
  test.equal(config.get('should_be_a_string'), 'a string');
  var val = config.get('should_be_a_object');
  test.ok(val instanceof Object);
  test.equal(val.key, 'val');
  val = config.get('should_be_a_array');
  test.ok(val instanceof Array);
  test.equal(val[0], 'val');
  test.done();
};

exports.testValidConfigNumber = function(test) {
  var config = typesValidator({
    should_be_a_number: 7
  }, {
    should_be_a_number: Number
  });

  test.equal(config.get('should_be_a_number'), 7);
  test.done();
};

exports.testValidConfigString = function(test) {
  var config = typesValidator({
    should_be_a_string: 'a string'
  }, {
    should_be_a_string: String
  });

  test.equal(config.get('should_be_a_string'), 'a string');
  test.done();
};

exports.testValidConfigObject = function(test) {
  var config = typesValidator({
    should_be_a_object: {
      'key': 'val'
    }
  }, {
    should_be_a_object: Object
  });

  var val = config.get('should_be_a_object');
  test.ok(val instanceof Object);
  test.equal(val.key, 'val');
  test.done();
};

exports.testValidConfigArray = function(test) {
  var config = typesValidator({
    should_be_a_array: ['val']
  }, {
    should_be_a_array: Array
  });

  var val = config.get('should_be_a_array');
  test.ok(val instanceof Array);
  test.equal(val[0], 'val');
  test.done();
};
