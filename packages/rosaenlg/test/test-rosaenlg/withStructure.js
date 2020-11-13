const assert = require('assert');
const rosaenlgPug = require('../../dist/index.js');

const templateQuickStart = `span
  eachz fruit in data with { separator: ',', last_separator: 'and' }
    | #{fruit}
`;

const templateWithP = `
p
  | this
  | is
  | a sentence .
  p
    | and yes ,
    | this is another sentence
    | !
`;

describe('rosaenlg', function() {
  describe('quickstart', function() {
    const rendered = rosaenlgPug.render(templateQuickStart, {
      language: 'en_US',
      data: ['apples', 'bananas', 'apricots'],
    });

    it('test quickstart with render', function() {
      assert.strictEqual(rendered, '<span>Apples, bananas and apricots</span>');
    });
  });
  describe('with p', function() {
    const rendered = rosaenlgPug.render(templateWithP, {
      language: 'en_US',
    });

    it('test with p', function() {
      assert.strictEqual(rendered, '<p>This is a sentence. <p>And yes, this is another sentence!</p></p>');
    });
  });
});
