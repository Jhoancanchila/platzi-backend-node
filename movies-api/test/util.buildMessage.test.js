const assert = require('assert');

const buildMessage = require('../utils/buildMessage');

describe.only('utils-buildMessage', function () {
  describe('when receives an entity an and action', function () {
    it('should return the respective message', function () {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });
  describe('when receives an entity and an action and a list', function () {
    it('should return the respective message with the entity in plural', function () {
      const result = buildMessage('movie', 'list');
      const expected = 'movie listed';
      assert.strictEqual(result, expected);
    });
  });
});