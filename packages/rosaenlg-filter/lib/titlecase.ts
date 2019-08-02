import * as titleCaseEnUs from 'better-title-case';
import * as titleCaseFrFr from 'titlecase-french';

import { Languages } from './constants';

export function titlecase(input: string, lang: Languages): string {
  let res: string = input;

  const titlecaseFlag = '_TITLECASE_';
  let regexTitlecase = new RegExp(`${titlecaseFlag}\\s*(.*?)\\s*${titlecaseFlag}`, 'g');

  res = res.replace(regexTitlecase, function(corresp, first): string {
    // debug("TITLECASE :<" + corresp + '><' + first + '>');
    switch (lang) {
      case 'en_US':
        return titleCaseEnUs(first);
      case 'fr_FR':
        return titleCaseFrFr.convert(first);
      case 'it_IT':
      case 'de_DE': {
        // not supported for de_DE
        let err = new Error();
        err.name = 'InvalidArgumentError';
        err.message = `titlecase is not available for ${lang}`;
        throw err;
      }
    }
  });

  return res;
}