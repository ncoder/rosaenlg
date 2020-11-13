import { LanguageCommon } from './LanguageCommon';

export class LanguageCommonGerman extends LanguageCommon {
  iso2 = 'de';
  validPropsWord = ['G', 'DAT', 'GEN', 'AKK', 'NOM']; // TODO check 1 level deeper SIN PLU
  validPropsAdj = ['AKK', 'DAT', 'GEN', 'NOM']; // TODO check 1 level deeper
}
