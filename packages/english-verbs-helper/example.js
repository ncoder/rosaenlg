/**
 * @license
 * Copyright 2019 Ludan Stoecklé
 * SPDX-License-Identifier: Apache-2.0
 */

const EnglishVerbs = require('./dist/index.js');
const Irregular = require('english-verbs-irregular/dist/verbs.json');
const Gerunds = require('english-verbs-gerunds/dist/gerunds.json');

const VerbsData = EnglishVerbs.mergeVerbsData(Irregular, Gerunds);

// eats
console.log(EnglishVerbs.getConjugation(null, 'eat', 'PRESENT', 'S'));

// ate
console.log(EnglishVerbs.getConjugation(VerbsData, 'eat', 'SIMPLE_PAST', 'S'));

// swimming
console.log(EnglishVerbs.getIngPart(VerbsData['swim'], 'swim'));
