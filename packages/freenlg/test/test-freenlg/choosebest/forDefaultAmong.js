var assert = require('assert');
const freenlgPug = require('../../../dist/index.js');


const forDefaultAmong = `
p
  - var param = {debug:true}
  choosebest param
    | AAA AAA
  | #{param.debugRes.maxTest}
`;

describe('freenlg', function() {
  describe('choosebest', function() {
    it(`general default among`, function() {
      assert( freenlgPug.render(forDefaultAmong, { language: 'en_US' }).indexOf( 5 )>-1 );
    });

    it(`override globally default among`, function() {
      assert( freenlgPug.render(forDefaultAmong, { language: 'en_US', defaultAmong:10 }).indexOf( 10 )>-1 );
    });

  });
});