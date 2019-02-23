import fs = require('fs');

let wordsWithGender: any;

export function getGenderFrenchWord(word: string): 'M'|'F' {
  // lazy loading
  if (wordsWithGender!=null) {
    // console.log('DID NOT RELOAD');
  } else {
    // console.log('LOAD');
    wordsWithGender = JSON.parse(fs.readFileSync(__dirname + '/../resources_pub/wordsWithGender.json', 'utf8'));
  }

  if (word==null) {
    var err = new Error();
    err.name = 'TypeError';
    err.message = 'word must not be null';
    throw err;
  }

  if (wordsWithGender[word]!=null) {
    return wordsWithGender[word];
  } else {
    var err = new Error();
    err.name = 'NotFoundInDict';
    err.message = `${word} not found in dict`;
    throw err;
  }

}

