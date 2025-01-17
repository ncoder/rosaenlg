/**
 * @license
 * Copyright 2018, Ludan Stoecklé
 * SPDX-License-Identifier: MIT
 */

import { LanguageCodeGen, VerbInfo, WordInfo, AdjectiveInfo } from './LanguageCodeGen';
import germanWordsDict from 'german-words-dict/dist/words.json';
import { WordsInfo } from 'german-words-dict';
import { getWordInfo } from 'german-words';

import { AdjectivesInfo } from 'german-adjectives-dict';
import { getAdjectiveInfo } from 'german-adjectives';
import germanAdjectivesDict from 'german-adjectives-dict/dist/adjectives.json';

import { getVerbInfo, VerbsInfo } from 'german-verbs';
import germanVerbsDict from 'german-verbs-dict/dist/verbs.json';

export class LanguageCodeGenGerman extends LanguageCodeGen {
  iso2 = 'de';
  hasFlexVerbs = true;
  hasFlexWords = true;
  hasFlexAdjectives = true;

  getVerbInfo(verb: string): VerbInfo {
    return getVerbInfo(germanVerbsDict as VerbsInfo, verb);
  }
  getWordInfo(word: string): WordInfo {
    return getWordInfo(germanWordsDict as WordsInfo, word);
  }
  getAdjectiveInfo(adjective: string): AdjectiveInfo {
    return getAdjectiveInfo(germanAdjectivesDict as AdjectivesInfo, adjective);
  }
}
