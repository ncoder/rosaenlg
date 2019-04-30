# synonym-optimizer

Gives a score to a string depending on the variety of the synonyms used. 

For instance, let's compare _The coffee is good. I love that coffee_ with _The coffee is good. I love that bewerage_. The second alternative is better because a synonym is used for _coffee_. This module will give a better score to the second alternative.

*The lowest score the better.*

How it works:

* single words are extracted thanks to a tokenizer `wink-tokenizer`, lowercased, and stemmed using `snowball-stemmer`
* stopwords are removed (you can customize the list of stopwords)
* when the same word appears multiples times, it raises the score depending on the distance of the two occurrences (if the occurrences are closes it raises the score a lot).

Designed primarly to test the output of a NLG (Natural Language Generation) system.

Works for English, German and French.

## Installation 
```sh
npm install synonym-optimizer
```

## Usage

```javascript
var synOptimizer = require('synonym-optimizer');

alts = [
  'The coffee is good. I love that coffee.',
  'The coffee is good. I love that bewerage.'
]

/*
The coffee is good. I love that coffee.: 0.5
The coffee is good. I love that bewerage.: 0
*/
alts.forEach((alt) => {
  let score = synOptimizer.scoreAlternative('en_US', alt, null, null, null, null);
  console.log(`${alt}: ${score}`);
});
```

The main function is `scoreAlternative`. It takes a string and returns its score. Arguments are:

* `lang` (string, mandatory): the language. Available languages are `fr_FR`, `en_US` and `de_DE`, but it should be pretty straightforward to manage more.
* `alternative` (string, mandatory): the string to score
* `stopWordsToAdd` (string[], optional): list of stopwords to _add_ to the standard stopwords list
* `stopWordsToRemove` (string[], optional): list of stopwords to _remove_ to the standard stopwords list
* `stopWordsOverride` (string[], optional): replaces the standard stopword list
* `identicals` (string[][], optional): list of words that should be considered as beeing identical, for instance `[ ['diamond', 'diamonds'], ['phone', 'cellphone', 'smartphone'] ]`. You can put some plurals here as there is no lemmatizer presently.

You can also use the `getBest` function. Most arguments are exactly the same, but instead of `alternative`, use `alternatives` (string[]). The output number will not be the score, but simply the index of the best alternative.

## Todo



## Dependancies and licences

* `wink-tokenizer` to tokenize sentences in multiple languages (MIT).
* `stopwords-en/de/fs` for standard stopwords lists per language (MIT).
* `snowball-stemmer` to stem words per language (MIT).