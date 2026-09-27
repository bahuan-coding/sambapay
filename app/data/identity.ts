import type { Lang } from '../i18n';

/**
 * The identity engine. One configuration per market: the tax identifier the
 * country uses, its mask, its check-digit algorithm, the extra fields that
 * only that country asks for, and what it requires of the owners.
 *
 * CPF and the owners list are Brazil's rule. Every country carries its own,
 * never a generic form. Markets outside the six fall back to GENERAL.
 */
export type IdentityKind =
  | 'BR' | 'MX' | 'CO' | 'CL' | 'PE' | 'AR' | 'GENERAL';

export interface ExtraField {
  name: string;
  kind: 'text' | 'select';
  label: [string, string, string];
  hint?: [string, string, string];
  required?: boolean;
  options?: { value: string; label: [string, string, string] }[];
}

export interface OwnerDoc {
  /** Document name in the local term. */
  name: string;
  mask: string;
  validate?: (value: string) => boolean;
}

/** A label written in EN, PT and ES, in that order. */
export type LabelTriple = [string, string, string];

/**
 * The documents a market actually asks for, in the local term. A marketplace
 * that says "Contrato Social" in Brazil and "Company registration document"
 * in Brazil is wrong; this is where the local name lives.
 */
export interface DocLabels {
  company: LabelTriple;
  companyHint: LabelTriple;
  owner: LabelTriple;
  address: LabelTriple;
  contract: LabelTriple;
}

export interface IdentityConfig {
  kind: IdentityKind;
  /** The company tax identifier. */
  taxId: {
    /** Local term, same in every language (CNPJ, RFC, NIT, RUT, RUC, CUIT). */
    name: string;
    mask: string;
    example: string;
    placeholder: string;
    maxLength: number;
    pattern?: RegExp;
    validate?: (value: string) => boolean;
  };
  extras: ExtraField[];
  /** The document an owner or legal representative signs with. */
  owner: OwnerDoc;
  /** Brazil alone lists owners by participation. */
  ownersByShare: boolean;
  /** The company documents in the local term, per market. */
  docs?: DocLabels;
}

/** Robust URL normalisation, in the shape the house accepts. */
export function normalizeWebsite(url: string | undefined | null): string | null {
  if (!url || !url.trim()) return null;
  let clean = url.trim().toLowerCase();
  if (/^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/.test(clean.replace(/^https?:\/\//, ''))) return null;
  if (/\.(local|internal|test|example|invalid|localhost)$/.test(clean)) return null;
  clean = clean.replace(/^https?:\/\//, '');
  const domain = clean.split('/')[0]?.split('?')[0] || '';
  if (!domain || !domain.includes('.')) return null;
  const bare = domain.replace(/^www\./, '');
  if (bare.length < 3) return null;
  return `https://${bare}`;
}

/* ---- Check-digit algorithms, one per market ---- */

export function digits(value: string): string {
  return value.replace(/\D/g, '');
}

export function validCNPJ(value: string): boolean {
  const v = digits(value);
  if (v.length !== 14 || /^(\d)\1{13}$/.test(v)) return false;
  const calc = (len: number) => {
    let sum = 0;
    let pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += Number(v[len - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(v[12]) && calc(13) === Number(v[13]);
}

export function validCPF(value: string): boolean {
  const v = digits(value);
  if (v.length !== 11 || /^(\d)\1{10}$/.test(v)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(v[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(v[9]) && calc(10) === Number(v[10]);
}

/** Chile RUT / RUN (mod 11). */
export function validRUT(value: string): boolean {
  const v = digits(value).padStart(8, '0');
  if (v.length < 8) return false;
  const body = v.slice(0, -1);
  const dv = v.slice(-1);
  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const r = 11 - (sum % 11);
  const expected = r === 11 ? '0' : r === 10 ? 'K' : String(r);
  return expected === dv.toUpperCase();
}

/** Colombia NIT (mod 11 with a weighted table). */
export function validNIT(value: string): boolean {
  const v = digits(value);
  if (v.length < 9 || v.length > 10) return false;
  const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  const body = v.slice(0, -1).split('').reverse();
  let sum = 0;
  for (let i = 0; i < body.length; i++) sum += Number(body[i]) * weights[i];
  const r = sum % 11;
  const dv = r < 2 ? r : 11 - r;
  return dv === Number(v.slice(-1));
}

/** Peru RUC (mod 11). */
export function validRUC(value: string): boolean {
  const v = digits(value);
  if (v.length !== 11) return false;
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(v[i]) * weights[i];
  const r = 11 - (sum % 11);
  const dv = r === 10 ? 0 : r === 11 ? 1 : r;
  return dv === Number(v[10]);
}

/** Argentina CUIT (mod 11). */
export function validCUIT(value: string): boolean {
  const v = digits(value);
  if (v.length !== 11) return false;
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(v[i]) * weights[i];
  const r = 11 - (sum % 11);
  const dv = r === 11 ? 0 : r === 10 ? 9 : r;
  return dv === Number(v[10]);
}

/** Mexico RFC (12 chars for companies; structure + check digit). */
export function validRFC(value: string): boolean {
  const v = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(v)) return false;
  const map: Record<string, string> = { '&': '10', Ñ: '10' };
  const expanded = v.slice(0, v.length - 3).replace(/[&Ñ]/g, (c) => map[c] ?? '10');
  const weights = [3, 2, 7, 6, 5, 4, 3, 2, 11, 10, 9, 8];
  let sum = 0;
  for (let i = 0; i < expanded.length; i++) sum += Number(expanded[i]) * weights[i];
  const r = 11 - (sum % 11);
  const expected = r === 11 ? '0' : r === 10 ? 'A' : String(r);
  return v.slice(-1) === expected;
}

/** Mexico CURP (18 chars, mod-10 check digit at the end). */
export function validCURP(value: string): boolean {
  const v = value.replace(/[^A-Z0-9Ñ]/gi, '').toUpperCase();
  if (!/^[A-ZÑ]{4}\d{6}[HM][A-ZÑ]{5}[A-Z0-9]\d$/.test(v)) return false;
  const dict = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += dict.indexOf(v[i]) * (18 - i);
  const dv = 10 - (sum % 10);
  return String(dv === 10 ? 0 : dv) === v[17];
}

/** Guatemala NIT (mod-11; the check digit may be the letter K). */
export function validGTNIT(value: string): boolean {
  const v = digits(value);
  if (v.length < 8) return false;
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  let sum = 0;
  const body = v.slice(0, -1).split('').reverse();
  for (let i = 0; i < body.length; i++) sum += Number(body[i]) * weights[i];
  const r = 11 - (sum % 11);
  const expected = r === 11 ? 0 : r === 10 ? 'K' : r;
  return String(expected) === v.slice(-1).toUpperCase();
}

/** El Salvador NIT (14 digits, mod-11). */
export function validSVNIT(value: string): boolean {
  const v = digits(value);
  if (v.length !== 14) return false;
  const weights = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(v[i]) * weights[i];
  const dv = (11 - (sum % 11)) % 11;
  return (dv === 10 ? 0 : dv) === Number(v[13]);
}

/** Dominican Republic RNC (9 digits, mod-11). */
export function validDORNC(value: string): boolean {
  const v = digits(value);
  if (v.length !== 9) return false;
  const weights = [7, 9, 8, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += Number(v[i]) * weights[i];
  const r = 11 - (sum % 11);
  const dv = r === 11 ? 2 : r === 10 ? 1 : r;
  return dv === Number(v[8]);
}

/** Paraguay RUC (mod-11; the check digit may be the letter K). */
export function validPYRUC(value: string): boolean {
  const v = digits(value);
  if (v.length < 6) return false;
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let sum = 0;
  const body = v.slice(0, -1).split('').reverse();
  for (let i = 0; i < body.length; i++) sum += Number(body[i]) * weights[i];
  const r = 11 - (sum % 11);
  const expected = r === 11 ? 0 : r === 10 ? 'K' : r;
  return String(expected) === v.slice(-1).toUpperCase();
}

/** Venezuela RIF (J/V/E/G + 9 digits, mod-11). */
export function validVERIF(value: string): boolean {
  const v = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  if (!/^[JVEG]\d{9}$/.test(v)) return false;
  const first: Record<string, number> = { V: 1, E: 2, J: 3, P: 4, G: 5 };
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  const body = v.slice(1, 9);
  let sum = (first[v[0]] ?? 0) * 4;
  for (let i = 0; i < 8; i++) sum += Number(body[i]) * weights[i];
  const r = sum % 11;
  const dv = r === 0 ? 0 : r === 1 ? 0 : 11 - r;
  return dv === Number(v[9]);
}

/** Nicaragua RUC (14 digits, mod-11 over the first 13, check digit last). */
export function validNIRUC(value: string): boolean {
  const v = digits(value);
  if (v.length !== 14) return false;
  const weights = [3, 2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3];
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(v[i]) * weights[i];
  const dv = (11 - (sum % 11)) % 11;
  return dv === Number(v[13]);
}

/** Honduras RTN (14 digits, mod-11). */
export function validHNRTN(value: string): boolean {
  const v = digits(value);
  if (v.length !== 14) return false;
  const weights = [3, 2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3];
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(v[i]) * weights[i];
  const dv = (11 - (sum % 11)) % 11;
  return dv === Number(v[13]);
}

/** Uruguay RUT (12 digits, mod-11). */
export function validUYRUT(value: string): boolean {
  const v = digits(value);
  if (v.length !== 12) return false;
  const weights = [4, 3, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8];
  let sum = 0;
  const body = v.slice(0, 11);
  for (let i = 0; i < 11; i++) sum += Number(body[i]) * weights[i];
  const r = 11 - (sum % 11);
  const dv = r === 11 ? 0 : r === 10 ? 0 : r;
  return dv === Number(v[11]);
}

/** Ecuador RUC (13 digits, mod-11; the rule depends on the third digit). */
export function validECRUC(value: string): boolean {
  const v = digits(value);
  if (v.length !== 13 || v.slice(10) === '000') return false;
  const third = Number(v[2]);
  const weights = third <= 5 ? [2, 1, 2, 1, 2, 1, 2, 1, 2] : [3, 2, 7, 6, 5, 4, 3, 2, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let p = Number(v[i]) * weights[i];
    if (third <= 5 && p > 9) p -= 9;
    sum += p;
  }
  const r = 11 - (sum % 11);
  const dv = r === 11 ? 0 : r === 10 ? 0 : r;
  return dv === Number(v[9]);
}

/* ---- Masks ---- */

export function applyMask(value: string, mask: string): string {
  const raw = value.replace(/[^A-Za-z0-9]/g, '');
  let out = '';
  let i = 0;
  for (const token of mask) {
    if (i >= raw.length) break;
    if (token === 'X' || token === '0' || token === 'A') {
      out += raw[i];
      i++;
    } else {
      out += token;
    }
  }
  return out;
}

/* ---- The configuration per market ---- */

export const identity: Record<IdentityKind, IdentityConfig> = {
  BR: {
    kind: 'BR',
    taxId: {
      name: 'CNPJ', mask: '00.000.000/0000-00', example: '12.345.678/0001-90',
      placeholder: '12.345.678/0001-90', maxLength: 18,
      pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, validate: validCNPJ,
    },
    extras: [],
    owner: { name: 'CPF', mask: '000.000.000-00', validate: validCPF },
    ownersByShare: true,
    docs: {
      company: ['Contrato Social', 'Contrato Social', 'Contrato Social'],
      companyHint: ['The articles of incorporation filed at the registry.', 'O contrato social registrado na junta comercial.', 'El contrato social registrado en la junta comercial.'],
      owner: ['CPF holder, identification', 'Identificação do titular do CPF', 'Identificación del titular del CPF'],
      address: ['Comprovante de residência', 'Comprovante de residência', 'Comprobante de domicilio'],
      contract: ['Procuração', 'Procuração', 'Poder notarial'],
    },
  },
  MX: {
    kind: 'MX',
    taxId: {
      name: 'RFC', mask: 'XXX000000XXX', example: 'ABC010101XXX',
      placeholder: 'ABC010101XXX', maxLength: 13,
      pattern: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, validate: validRFC,
    },
    extras: [
      {
        name: 'regimenFiscal',
        kind: 'select',
        required: true,
        label: ['Tax regime', 'Regime fiscal', 'Régimen fiscal'],
        options: [
          { value: '601', label: ['601 · General', '601 · Geral', '601 · General'] },
          { value: '603', label: ['603 · Non-profit', '603 · Sem fins lucrativos', '603 · Sin fines de lucro'] },
          { value: '605', label: ['605 · Fixed assets', '605 · Ativos fixos', '605 · Activos fijos'] },
          { value: '612', label: ['612 · Individuals with activity', '612 · Pessoas com atividade', '612 · Personas con actividad'] },
          { value: '626', label: ['626 · Simplified trust', '626 · Fideicomisso simplificado', '626 · Fideicomiso simplificado'] },
        ],
      },
    ],
    owner: { name: 'CURP', mask: 'AAAA000000AAAAAA', validate: validCURP },
    ownersByShare: false,
    docs: {
      company: ['Acta Constitutiva', 'Acta Constitucional', 'Acta Constitutiva'],
      companyHint: ['Filed with the Registro Público de Comercio.', 'Registrada no Registro Público de Comercio.', 'Registrada ante el Registro Público de Comercio.'],
      owner: ['CURP holder, identification', 'Identificação do titular da CURP', 'Identificación del titular de la CURP'],
      address: ['Comprobante de domicilio', 'Comprovante de endereço', 'Comprobante de domicilio'],
      contract: ['Poder notarial', 'Procuração', 'Poder notarial'],
    },
  },
  CO: {
    kind: 'CO',
    taxId: {
      name: 'NIT', mask: '000.000.000-0', example: '901.123.456-7',
      placeholder: '900.123.456-7', maxLength: 13,
      pattern: /^\d{3}\.\d{3}\.\d{3}-\d$/, validate: validNIT,
    },
    extras: [
      {
        name: 'tipoSociedad',
        kind: 'select',
        required: true,
        label: ['Company type', 'Tipo de sociedade', 'Tipo de sociedad'],
        options: [
          { value: 'SAS', label: ['S.A.S.', 'S.A.S.', 'S.A.S.'] },
          { value: 'LTDA', label: ['Ltda.', 'Ltda.', 'Ltda.'] },
          { value: 'SA', label: ['S.A.', 'S.A.', 'S.A.'] },
          { value: 'EU', label: ['Single-owner', 'Empresa unipessoal', 'Empresa unipersonal'] },
        ],
      },
      {
        name: 'camaraComercio',
        kind: 'text',
        label: ['Chamber of Commerce', 'Registro na Câmara de Comércio', 'Cámara de Comercio'],
      },
    ],
    owner: { name: 'Cédula', mask: '00000000' },
    ownersByShare: false,
    docs: {
      company: ['Certificate of incorporation', 'Certificado de existência e representação legal', 'Certificado de existencia y representación legal'],
      companyHint: ['Issued by the Cámara de Comercio, no older than 30 days.', 'Emitido pela Câmara de Comércio, com no máximo 30 dias.', 'Emitido por la Cámara de Comercio, con máximo 30 días.'],
      owner: ['Cédula holder, identification', 'Identificação do titular da cédula', 'Identificación del titular de la cédula'],
      address: ['Comprobante de domicilio', 'Comprovante de endereço', 'Comprobante de domicilio'],
      contract: ['Poder notarial', 'Procuração', 'Poder notarial'],
    },
  },
  CL: {
    kind: 'CL',
    taxId: {
      name: 'RUT', mask: '00.000.000-K', example: '76.123.456-7',
      placeholder: '76.123.456-K', maxLength: 12,
      pattern: /^\d{2}\.\d{3}\.\d{3}-[\dkK]$/, validate: validRUT,
    },
    extras: [
      {
        name: 'giro',
        kind: 'text',
        required: true,
        label: ['Business activity', 'Atividade comercial', 'Giro comercial'],
      },
      {
        name: 'comuna',
        kind: 'text',
        label: ['Commune', 'Comuna', 'Comuna'],
      },
    ],
    owner: { name: 'RUT', mask: '00.000.000-0', validate: validRUT },
    ownersByShare: false,
    docs: {
      company: ['Escritura de constitución', 'Escritura de constituição', 'Escritura de constitución'],
      companyHint: ['The deed filed at the Conservador de Bienes Raíces.', 'A escritura registrada no Conservador de Bienes Raíces.', 'La escritura inscrita en el Conservador de Bienes Raíces.'],
      owner: ['RUT holder, identification', 'Identificação do titular do RUT', 'Identificación del titular del RUT'],
      address: ['Comprobante de domicilio', 'Comprovante de endereço', 'Comprobante de domicilio'],
      contract: ['Poder notarial', 'Procuração', 'Poder notarial'],
    },
  },
  PE: {
    kind: 'PE',
    taxId: {
      name: 'RUC', mask: '00000000000', example: '20123456789',
      placeholder: '20123456789', maxLength: 11,
      pattern: /^\d{11}$/, validate: validRUC,
    },
    extras: [
      {
        name: 'actividadCIIU',
        kind: 'text',
        required: true,
        label: ['Economic activity (CIIU)', 'Atividade econômica (CIIU)', 'Actividad económica (CIIU)'],
      },
    ],
    owner: { name: 'DNI', mask: '00000000' },
    ownersByShare: false,
    docs: {
      company: ['Ficha RUC', 'Ficha RUC', 'Ficha RUC'],
      companyHint: ['The SUNAT registration sheet, from the RUC.', 'A ficha de registro da SUNAT, a partir do RUC.', 'La ficha de registro de la SUNAT, desde el RUC.'],
      owner: ['DNI holder, identification', 'Identificação do titular do DNI', 'Identificación del titular del DNI'],
      address: ['Comprobante de domicilio', 'Comprovante de endereço', 'Comprobante de domicilio'],
      contract: ['Poder notarial', 'Procuração', 'Poder notarial'],
    },
  },
  AR: {
    kind: 'AR',
    taxId: {
      name: 'CUIT', mask: '00-00000000-0', example: '30-12345678-9',
      placeholder: '30-12345678-9', maxLength: 13,
      pattern: /^\d{2}-\d{8}-\d$/, validate: validCUIT,
    },
    extras: [
      {
        name: 'condicionIVA',
        kind: 'select',
        required: true,
        label: ['VAT condition', 'Condição de IVA', 'Condición de IVA'],
        options: [
          { value: 'responsable_inscripto', label: ['Registered', 'Inscrito', 'Responsable inscripto'] },
          { value: 'monotributo', label: ['Monotributo', 'Monotributo', 'Monotributo'] },
          { value: 'exento', label: ['Exempt', 'Isento', 'Exento'] },
        ],
      },
      {
        name: 'fechaInscripcion',
        kind: 'text',
        label: ['Registration date', 'Data de inscrição', 'Fecha de inscripción'],
      },
    ],
    owner: { name: 'CUIT', mask: '00-00000000-0', validate: validCUIT },
    ownersByShare: false,
  },
  GENERAL: {
    kind: 'GENERAL',
    taxId: { name: 'Tax ID', mask: 'XXXXXXXXXXXXXXXX', example: '', placeholder: '', maxLength: 40 },
    extras: [],
    owner: { name: 'Document', mask: 'XXXXXXXXXXXXXXXX' },
    ownersByShare: false,
  },
};

/**
 * Tax identifiers for markets without a deep config. The local term, its mask,
 * its format, and — where a public check-digit algorithm exists — its
 * validator. maxLength follows the mask, as in the six deep markets.
 */
const taxIdOnly: Record<string, IdentityConfig['taxId']> = {
  GT: { name: 'NIT', mask: '0000000-0', example: '1234567-8', placeholder: '1234567-8', maxLength: 9, validate: validGTNIT },
  CR: { name: 'Cédula Jurídica', mask: '0-000-000000', example: '3-101-123456', placeholder: '3-101-123456', maxLength: 12 },
  PA: { name: 'RUC', mask: '000000000-0-0000', example: '155612345-2-2015', placeholder: '155612345-2-2015', maxLength: 16 },
  DO: { name: 'RNC', mask: '0-00-00000-0', example: '1-23-45678-9', placeholder: '1-23-45678-9', maxLength: 11, validate: validDORNC },
  UY: { name: 'RUT', mask: '00 000000 0000', example: '21 123456 0012', placeholder: '21 123456 0012', maxLength: 14, validate: validUYRUT },
  PY: { name: 'RUC', mask: '00000000-0', example: '80012345-6', placeholder: '80012345-6', maxLength: 10, validate: validPYRUC },
  EC: { name: 'RUC', mask: '0000000000000', example: '1790012345001', placeholder: '1790012345001', maxLength: 13, validate: validECRUC },
  BO: { name: 'NIT', mask: '0000000000', example: '1234567012', placeholder: '1234567012', maxLength: 10 },
  VE: { name: 'RIF', mask: 'A-00000000-0', example: 'J-12345678-9', placeholder: 'J-12345678-9', maxLength: 12, validate: validVERIF },
  NI: { name: 'RUC', mask: 'A0000000000000', example: 'J0310000123456', placeholder: 'J0310000123456', maxLength: 14, validate: validNIRUC },
  HN: { name: 'RTN', mask: '0000-0000-00000', example: '0801-1990-12345', placeholder: '0801-1990-12345', maxLength: 15, validate: validHNRTN },
  SV: { name: 'NIT', mask: '0000-000000-000-0', example: '0614-010195-001-2', placeholder: '0614-010195-001-2', maxLength: 17, validate: validSVNIT },
  JM: { name: 'TRN', mask: '000000000', example: '123456789', placeholder: '123456789', maxLength: 9 },
  TT: { name: 'BIR', mask: '000000', example: '123456', placeholder: '123456', maxLength: 6 },
  SR: { name: 'RIN', mask: 'XXXXXXXX', example: '', placeholder: '', maxLength: 8 },
  GY: { name: 'TIN', mask: 'XXXXXXXX', example: '', placeholder: '', maxLength: 8 },
  US: { name: 'EIN', mask: '00-0000000', example: '12-3456789', placeholder: '12-3456789', maxLength: 10 },
  CA: { name: 'BN', mask: '000000000AA0000', example: '123456789RC0001', placeholder: '123456789RC0001', maxLength: 15 },
  BZ: { name: 'TIN', mask: '000000', example: '123456', placeholder: '123456', maxLength: 6 },
  HT: { name: 'NIF', mask: '000-000-000-0', example: '000-123-456-7', placeholder: '000-123-456-7', maxLength: 13 },
  CU: { name: 'NIT', mask: '00000000000', example: '12345678901', placeholder: '12345678901', maxLength: 11 },
};

/**
 * The owner document for markets without a deep config: the local term and its
 * mask. Person documents rarely carry a public check digit, so none claims one.
 */
const ownerDocOnly: Record<string, OwnerDoc> = {
  GT: { name: 'DPI', mask: '0000 00000 0000' },
  CR: { name: 'Cédula', mask: '0-0000-0000' },
  PA: { name: 'Cédula', mask: '0-000-0000' },
  DO: { name: 'Cédula', mask: '000-0000000-0' },
  UY: { name: 'CI', mask: '0.000.000-0' },
  PY: { name: 'Cédula', mask: '0.000.000' },
  EC: { name: 'Cédula', mask: '0000000000' },
  BO: { name: 'CI', mask: '0000000' },
  VE: { name: 'Cédula', mask: 'A-00000000' },
  NI: { name: 'Cédula', mask: '000-000000-0000A' },
  HN: { name: 'DNI', mask: '0000-0000-00000' },
  SV: { name: 'DUI', mask: '00000000-0' },
  BZ: { name: 'National ID', mask: 'XXXXXXXX' },
  HT: { name: 'CIN', mask: '000-000-0000' },
  JM: { name: 'National ID', mask: 'XXXXXXXX' },
  TT: { name: 'National ID', mask: 'XXXXXXXX' },
  SR: { name: 'National ID', mask: 'XXXXXXXX' },
  GY: { name: 'National ID', mask: 'XXXXXXXX' },
  CU: { name: 'Carné de identidad', mask: '00000000000' },
  US: { name: 'National ID', mask: 'XXXXXXXX' },
  CA: { name: 'National ID', mask: 'XXXXXXXX' },
};

export function identityFor(country: string): IdentityConfig {
  const key = country.toUpperCase();
  const deep = identity[key as IdentityKind];
  if (deep) return deep;
  const taxId = taxIdOnly[key];
  const owner = ownerDocOnly[key];
  if (!taxId && !owner) return identity.GENERAL;
  return { ...identity.GENERAL, ...(taxId ? { taxId } : {}), ...(owner ? { owner } : {}) };
}

/** The generic company documents, for markets with no local term on file. */
const GENERIC_DOCS: DocLabels = {
  company: ['Company registration document', 'Documento de registro da empresa', 'Documento de registro de la empresa'],
  companyHint: ['Articles of incorporation or equivalent.', 'Contrato social ou equivalente.', 'Estatutos o equivalente.'],
  owner: ['Owner identification', 'Identificação do sócio', 'Identificación del socio'],
  address: ['Proof of address', 'Comprovante de endereço', 'Comprobante de domicilio'],
  contract: ['Power of attorney', 'Procuração', 'Poder notarial'],
};

/** The company documents in the local term: specific where written, generic otherwise. */
export function docLabelsFor(country: string): DocLabels {
  return identityFor(country).docs ?? GENERIC_DOCS;
}

/** The six markets with a deep experience. */
export const deepMarkets = ['BR', 'MX', 'CO', 'CL', 'PE', 'AR'] as const;

export function isDeepMarket(country: string): boolean {
  return (deepMarkets as readonly string[]).includes(country.toUpperCase());
}
