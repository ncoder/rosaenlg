# french-words-gender

Gender of French words, based on the Lefff: _autoroute_ is feminine, _déjeuner_ is masculine, etc.

The [Lefff](http://pauillac.inria.fr/~sagot/index.html#lefff) (Lexique des Formes Fléchies du Français) is a large-scale morphological and syntactic lexicon for French, distributed under the free LGPL-LR licence (Lesser General Public License For Linguistic Resources).

The derived resource file (verbs list) remains under [LGPLLR](http://www.labri.fr/perso/clement/lefff/licence-LGPLLR.html).

## Installation 
```sh
npm install french-words-gender
```

## Usage

```javascript
var FrenchWords = require('french-words-gender');

// M
console.log( FrenchWords.getGenderFrenchWord('déjeuner') );

// F
console.log( FrenchWords.getGenderFrenchWord('console') );
```

One single function `getGenderFrenchWord`, with a single string param which is the word at its root form (will find _autoroute_ but not _autoroutes_).


## Dependancies

.Dependancies
[options="header"]
|=====================================================================
| Resource | Usage | Licence
| `Lefff` | database content | [LGPLLR](http://www.labri.fr/perso/clement/lefff/licence-LGPLLR.html)
|=====================================================================
