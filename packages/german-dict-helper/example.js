var GermanDictHelper = require('./dist/index.js').GermanDictHelper;

var gdh = new GermanDictHelper();

// Frühstück
console.log( gdh.getNoun("Frühstücken") );

// schön
console.log( gdh.getAdj("schöner") );