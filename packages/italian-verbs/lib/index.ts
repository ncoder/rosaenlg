import fs = require('fs');

const auxAvere: VerbInfo = {
  cond: { pres: { S3: 'avrebbe', P3: 'avrebbero', S1: 'avrei', P1: 'avremmo', P2: 'avreste', S2: 'avresti' } },
  ger: { pres: { '': 'avendo' } },
  impr: { pres: { S2: 'abbi', P1: 'abbiamo', P2: 'abbiate' } },
  ind: {
    pres: { P1: 'abbiamo', P2: 'avete', S3: 'ha', S2: 'hai', P3: 'hanno', S1: 'ho' },
    past: { P1: 'avemmo', P2: 'aveste', S2: 'avesti', S3: 'ebbe', P3: 'ebbero', S1: 'ebbi' },
    impf: { S3: 'aveva', P1: 'avevamo', P3: 'avevano', P2: 'avevate', S2: 'avevi', S1: 'avevo' },
    fut: { S2: 'avrai', P3: 'avranno', P1: 'avremo', P2: 'avrete', S3: 'avrà', S1: 'avrò' },
  },
  inf: { pres: { '': 'avere' } },
  part: {
    pres: { SF: 'avente', S: 'avente', PF: 'aventi', P: 'aventi' },
    past: { SF: 'avuta', PF: 'avute', P: 'avuti', S: 'avuto' },
  },
  sub: {
    pres: { S1: 'abbia', S2: 'abbia', S3: 'abbia', P1: 'abbiamo', P3: 'abbiano', P2: 'abbiate' },
    impf: { S3: 'avesse', P3: 'avessero', S1: 'avessi', S2: 'avessi', P1: 'avessimo', P2: 'aveste' },
  },
};

const auxEssere: VerbInfo = {
  cond: { pres: { S3: 'sarebbe', P3: 'sarebbero', S1: 'sarei', P1: 'saremmo', P2: 'sareste', S2: 'saresti' } },
  ger: { pres: { '': 'essendo' } },
  impr: { pres: { P1: 'siamo', P2: 'siate', S2: 'sii' } },
  ind: {
    /*
    è essere VER,ind+pres+3+s
    é essere VER,ind+pres+3+s
    but è is the good one
    */
    pres: { S2: 'sei', P1: 'siamo', P2: 'siete', P3: 'sono', S1: 'sono', S3: 'è' },
    past: { P2: 'foste', S2: 'fosti', S3: 'fu', S1: 'fui', P1: 'fummo', P3: 'furono' },
    impf: { S3: 'era', P3: 'erano', P1: 'eravamo', P2: 'eravate', S2: 'eri', S1: 'ero' },
    fut: { S2: 'sarai', P3: 'saranno', P1: 'saremo', P2: 'sarete', S3: 'sarà', S1: 'sarò' },
  },
  inf: { pres: { '': 'essere' } },
  part: {
    pres: { SF: 'essente', S: 'essente', PF: 'essenti', P: 'essenti' },
    past: { SF: 'stata', PF: 'state', P: 'stati', S: 'stato' },
  },
  sub: {
    pres: { S1: 'sia', S2: 'sia', S3: 'sia', P1: 'siamo', P3: 'siano', P2: 'siate' },
    impf: { S3: 'fosse', P3: 'fossero', S1: 'fossi', S2: 'fossi', P1: 'fossimo', P2: 'foste' },
  },
};

export type Mode = 'cond' | 'ger' | 'impr' | 'ind' | 'inf' | 'part' | 'sub';
export type Tense = 'pres' | 'past' | 'impf' | 'fut';
export type Gender = 'M' | 'F';
export type Numbers = 'S' | 'P';
export type Person = 1 | 2 | 3;
export type GendersMF = 'M' | 'F';

export interface VerbsInfo {
  [key: string]: VerbInfo;
}
// mode -> tense -> properties
export type VerbInfo = Record<Mode, VerbInfoMode>;

export interface VerbInfoMode {
  pres?: VerbInfoTense;
  past?: VerbInfoTense;
  impf?: VerbInfoTense;
  fut?: VerbInfoTense;
}

export interface VerbInfoTense {
  [key: string]: string;
}

let verbsInfo: VerbsInfo;

export function getVerbInfo(verb: string, verbsSpecificList: VerbsInfo): VerbInfo {
  if (verb == null) {
    let err = new Error();
    err.name = 'TypeError';
    err.message = 'verb must not be null';
    throw err;
  }

  if (verbsSpecificList != null && verbsSpecificList[verb] != null) {
    return verbsSpecificList[verb];
  } else {
    if (verb == 'avere') return auxAvere;
    if (verb == 'essere') return auxEssere;

    // lazy loading
    if (verbsInfo != null) {
      // debug('did not reload');
    } else {
      try {
        // debug('load');
        verbsInfo = JSON.parse(fs.readFileSync(__dirname + '/../resources_pub/verbs.json', 'utf8'));
      } catch (err) {
        // istanbul ignore next
        console.log(`could not read Italian verb on disk: ${verb}`);
        // istanbul ignore next
      }
    }

    const verbInfo: VerbInfo = verbsInfo[verb];
    if (verbInfo == null) {
      let err = new Error();
      err.name = 'NotFoundInDict';
      err.message = `${verb} not in Italian dict`;
      throw err;
    }
    return verbInfo;
  }
}

export type ItalianTense =
  | 'PRESENTE'
  | 'IMPERFETTO'
  | 'PASSATO_REMOTO'
  | 'FUTURO_SEMPLICE'
  | 'PASSATO_PROSSIMO'
  | 'TRAPASSATO_PROSSIMO'
  | 'TRAPASSATO_REMOTO'
  | 'FUTURO_ANTERIORE'
  | 'CONG_PRESENTE'
  | 'CONG_PASSATO'
  | 'CONG_IMPERFETTO'
  | 'CONG_TRAPASSATO'
  | 'COND_PRESENTE'
  | 'COND_PASSATO'
  | 'IMPERATIVO';

/*
const alwaysSein: string[] = [
  'aufwachen',
  'aufwachsen',
  'einziehen',
  'starten',
  'wandern',
  'zurückkehren',
  'verbrennen',
];

export function alwaysUsesSein(verb: string): boolean {
  return alwaysSein.indexOf(verb) > -1;
}
*/

export type ItalianAux = 'ESSERE' | 'AVERE';

export function getConjugation(
  verb: string,
  tense: ItalianTense,
  person: Person,
  number: Numbers,
  aux: ItalianAux,
  agreeGender: GendersMF,
  agreeNumber: Numbers,
  verbsSpecificList: VerbsInfo,
): string {
  // check params

  if (number != 'S' && number != 'P') {
    let err = new Error();
    err.name = 'TypeError';
    err.message = 'number must S or P';
    throw err;
  }

  if (person != 1 && person != 2 && person != 3) {
    let err = new Error();
    err.name = 'TypeError';
    err.message = 'person must 1 2 or 3';
    throw err;
  }

  const validTenses: string[] = [
    'PRESENTE',
    'IMPERFETTO',
    'PASSATO_REMOTO',
    'FUTURO_SEMPLICE',
    'PASSATO_PROSSIMO',
    'TRAPASSATO_PROSSIMO',
    'TRAPASSATO_REMOTO',
    'FUTURO_ANTERIORE',
    'CONG_PRESENTE',
    'CONG_PASSATO',
    'CONG_IMPERFETTO',
    'CONG_TRAPASSATO',
    'COND_PRESENTE',
    'COND_PASSATO',
    'IMPERATIVO',
  ];
  if (tense == null || validTenses.indexOf(tense) == -1) {
    let err = new Error();
    err.name = 'TypeError';
    err.message = `tense ${tense} err, must be ${validTenses.join()}`;
    throw err;
  }

  const tensesWithAux: string[] = [
    'PASSATO_PROSSIMO',
    'TRAPASSATO_PROSSIMO',
    'TRAPASSATO_REMOTO',
    'FUTURO_ANTERIORE',
    'CONG_PASSATO',
    'CONG_TRAPASSATO',
    'COND_PASSATO',
  ];
  if (tensesWithAux.indexOf(tense) > -1) {
    /*
    if (!aux && this.alwaysUsesSein(verb)) {
      aux = 'SEIN';
    }
    */

    if (aux != 'ESSERE' && aux != 'AVERE') {
      let err = new Error();
      err.name = 'InvalidArgumentError';
      err.message = `this tense ${tense} requires aux param with ESSERE or AVERE`;
      throw err;
    }
  }

  if (tense == 'IMPERATIVO') {
    if (['S2', 'P1', 'P2'].indexOf(number + person) == -1) {
      let err = new Error();
      err.name = 'InvalidArgumentError';
      err.message = `IMPERATIVO only works with S2 P1 or P2`;
      throw err;
    }
  }

  if (agreeGender == null) {
    agreeGender = 'M';
  }
  if (agreeGender != 'M' && agreeGender != 'F') {
    let err = new Error();
    err.name = 'InvalidArgumentError';
    err.message = `agreeGender must be M or F`;
    throw err;
  }

  if (agreeNumber == null) {
    agreeNumber = 'S';
  }
  if (agreeNumber != 'S' && agreeNumber != 'P') {
    let err = new Error();
    err.name = 'InvalidArgumentError';
    err.message = `agreeNumber must be S or P`;
    throw err;
  }

  const verbInfo: VerbInfo = getVerbInfo(verb, verbsSpecificList);

  let self = this;
  function getPastParticiple(): string {
    // {"SF":"mangiata","PF":"mangiate","P":"mangiati","S":"mangiato"}
    let key = agreeNumber + (agreeGender == 'F' ? 'F' : '');
    let pp = verbInfo['part']['past'][key];
    if (!pp) {
      let err = new Error();
      err.name = 'NotFoundInDict';
      err.message = `could not find ${key} past participle for ${verb}`;
      throw err;
    }
    return pp;
  }
  function getConjugatedAux(): string {
    const auxTenses = {
      PASSATO_PROSSIMO: 'PRESENTE',
      TRAPASSATO_PROSSIMO: 'IMPERFETTO',
      TRAPASSATO_REMOTO: 'PASSATO_REMOTO',
      FUTURO_ANTERIORE: 'FUTURO_SEMPLICE',
      CONG_PASSATO: 'CONG_PRESENTE',
      CONG_TRAPASSATO: 'CONG_IMPERFETTO',
      COND_PASSATO: 'COND_PRESENTE',
    };
    return self.getConjugation(aux.toLowerCase(), auxTenses[tense], person, number, null, null, null, null);
  }

  if (tensesWithAux.indexOf(tense) > -1) {
    return `${getConjugatedAux()} ${getPastParticiple()}`;
  } else {
    const keys = {
      PRESENTE: ['ind', 'pres'],
      IMPERFETTO: ['ind', 'impf'],
      PASSATO_REMOTO: ['ind', 'past'],
      FUTURO_SEMPLICE: ['ind', 'fut'],
      CONG_PRESENTE: ['sub', 'pres'],
      CONG_IMPERFETTO: ['sub', 'impf'],
      COND_PRESENTE: ['cond', 'pres'],
      IMPERATIVO: ['impr', 'pres'],
    };

    let modeKey: string = keys[tense][0];
    let tenseKey: string = keys[tense][1];
    let numberPersonKey = number + person;

    if (
      verbInfo[modeKey] == null ||
      verbInfo[modeKey][tenseKey] == null ||
      verbInfo[modeKey][tenseKey][numberPersonKey] == null
    ) {
      let err = new Error();
      err.name = 'NotFoundInDict';
      err.message = `${verb} in Italian dict but not for ${tense} and ${number} and ${person}`;
      throw err;
    }

    return verbInfo[modeKey][tenseKey][numberPersonKey];
  }
}