/**
 * @license
 * Copyright 2019 Ludan Stoecklé
 * SPDX-License-Identifier: Apache-2.0
 */

const assert = require('assert');
const italianWords = require('../dist/words.json');

describe('italian-words-dict', function () {
  it('should contain something', function () {
    assert(italianWords != null);
    assert(Object.keys(italianWords).length > 100);
  });
  it('pizza should be ok', function () {
    const pizza = italianWords['pizza'];
    assert(pizza != null);
    assert.strictEqual(pizza['G'], 'F');
    assert.strictEqual(pizza['P'], 'pizze');
  });
});
