const assert = require('assert');
const FrenchVerbs = require('../dist/index.js');

describe('french-verbs', function() {
  describe('#getConjugation()', function() {
    it(`null verb`, function() {
      assert.throws(() => FrenchVerbs.getConjugation(null), /verb/);
    });
    it(`null person`, function() {
      assert.throws(() => FrenchVerbs.getConjugation('manger', 'PRESENT', null), /person/);
    });
    it(`invalid tense`, function() {
      assert.throws(() => FrenchVerbs.getConjugation('manger', 'blabla', 1), /tense/);
    });
    it(`verb not in dict`, function() {
      assert.throws(() => FrenchVerbs.getConjugation('farfouillasser', 'PRESENT', 1), /dict/);
    });
  });
});
