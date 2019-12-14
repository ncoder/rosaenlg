const assert = require('assert');
const rosaenlgPug = require('../../dist/index.js');

const template = `
p
  a(href='https://www.google.com/') Google
  | bla.bla
`;

describe('rosaenlg', function() {
  describe('renderFileParams', function() {
    it('test sophisticated anchor', function() {
      const rendered = rosaenlgPug.render(template, {
        language: 'en_US',
      });
      assert.equal(rendered, '<p><a href="https://www.google.com/">Google</a>bla. Bla</p>');
    });

    it('no language', function() {
      assert.throws(() => {
        rosaenlgPug.render(`p`, {});
      }, /language/);
    });
  });
});
