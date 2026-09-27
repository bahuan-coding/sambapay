import type { Lang } from './index';

/** Every market we can onboard, plus the United States and Canada as origins. */
export type AmericasCode =
  | 'US' | 'CA'
  | 'MX' | 'GT' | 'BZ' | 'SV' | 'HN' | 'NI' | 'CR' | 'PA' | 'CU' | 'DO' | 'HT' | 'JM' | 'TT'
  | 'BR' | 'AR' | 'BO' | 'CL' | 'CO' | 'EC' | 'GY' | 'PY' | 'PE' | 'SR' | 'UY' | 'VE'
  | 'OTHER';

interface Entry {
  code: AmericasCode;
  en: string;
  pt: string;
  es: string;
  short: [string, string, string];
}

export const americas: Entry[] = [
  { code: 'US', en: 'United States', pt: 'Estados Unidos', es: 'Estados Unidos', short: ['U.S.', 'EUA', 'EE. UU.'] },
  { code: 'CA', en: 'Canada', pt: 'Canadá', es: 'Canadá', short: ['Canada', 'Canadá', 'Canadá'] },
  { code: 'MX', en: 'Mexico', pt: 'México', es: 'México', short: ['Mexico', 'México', 'México'] },
  { code: 'GT', en: 'Guatemala', pt: 'Guatemala', es: 'Guatemala', short: ['Guatemala', 'Guatemala', 'Guatemala'] },
  { code: 'BZ', en: 'Belize', pt: 'Belize', es: 'Belice', short: ['Belize', 'Belize', 'Belice'] },
  { code: 'SV', en: 'El Salvador', pt: 'El Salvador', es: 'El Salvador', short: ['El Salv.', 'El Salv.', 'El Salv.'] },
  { code: 'HN', en: 'Honduras', pt: 'Honduras', es: 'Honduras', short: ['Honduras', 'Honduras', 'Honduras'] },
  { code: 'NI', en: 'Nicaragua', pt: 'Nicarágua', es: 'Nicaragua', short: ['Nicaragua', 'Nicarágua', 'Nicaragua'] },
  { code: 'CR', en: 'Costa Rica', pt: 'Costa Rica', es: 'Costa Rica', short: ['Costa Rica', 'Costa Rica', 'Costa Rica'] },
  { code: 'PA', en: 'Panama', pt: 'Panamá', es: 'Panamá', short: ['Panama', 'Panamá', 'Panamá'] },
  { code: 'CU', en: 'Cuba', pt: 'Cuba', es: 'Cuba', short: ['Cuba', 'Cuba', 'Cuba'] },
  { code: 'DO', en: 'Dominican Republic', pt: 'República Dominicana', es: 'República Dominicana', short: ['Dom. Rep.', 'Rep. Dom.', 'Rep. Dom.'] },
  { code: 'HT', en: 'Haiti', pt: 'Haiti', es: 'Haití', short: ['Haiti', 'Haiti', 'Haití'] },
  { code: 'JM', en: 'Jamaica', pt: 'Jamaica', es: 'Jamaica', short: ['Jamaica', 'Jamaica', 'Jamaica'] },
  { code: 'TT', en: 'Trinidad and Tobago', pt: 'Trinidad e Tobago', es: 'Trinidad y Tobago', short: ['Trin. & Tob.', 'Trin. e Tob.', 'Trin. y Tob.'] },
  { code: 'BR', en: 'Brazil', pt: 'Brasil', es: 'Brasil', short: ['Brazil', 'Brasil', 'Brasil'] },
  { code: 'AR', en: 'Argentina', pt: 'Argentina', es: 'Argentina', short: ['Argentina', 'Argentina', 'Argentina'] },
  { code: 'BO', en: 'Bolivia', pt: 'Bolívia', es: 'Bolivia', short: ['Bolivia', 'Bolívia', 'Bolivia'] },
  { code: 'CL', en: 'Chile', pt: 'Chile', es: 'Chile', short: ['Chile', 'Chile', 'Chile'] },
  { code: 'CO', en: 'Colombia', pt: 'Colômbia', es: 'Colombia', short: ['Colombia', 'Colômbia', 'Colombia'] },
  { code: 'EC', en: 'Ecuador', pt: 'Equador', es: 'Ecuador', short: ['Ecuador', 'Equador', 'Ecuador'] },
  { code: 'GY', en: 'Guyana', pt: 'Guiana', es: 'Guyana', short: ['Guyana', 'Guiana', 'Guyana'] },
  { code: 'PY', en: 'Paraguay', pt: 'Paraguai', es: 'Paraguay', short: ['Paraguay', 'Paraguai', 'Paraguay'] },
  { code: 'PE', en: 'Peru', pt: 'Peru', es: 'Perú', short: ['Peru', 'Peru', 'Perú'] },
  { code: 'SR', en: 'Suriname', pt: 'Suriname', es: 'Surinam', short: ['Suriname', 'Suriname', 'Surinam'] },
  { code: 'UY', en: 'Uruguay', pt: 'Uruguai', es: 'Uruguay', short: ['Uruguay', 'Uruguai', 'Uruguay'] },
  { code: 'VE', en: 'Venezuela', pt: 'Venezuela', es: 'Venezuela', short: ['Venezuela', 'Venezuela', 'Venezuela'] },
  { code: 'OTHER', en: 'Other', pt: 'Outro', es: 'Otro', short: ['Other', 'Outro', 'Otro'] },
];

export interface CountryChip {
  value: string;
  label: string;
  short: string;
  code: string;
}

export function americasOptions(lang: Lang): CountryChip[] {
  const i = lang === 'pt' ? 1 : lang === 'es' ? 2 : 0;
  return americas.map((c) => ({
    value: c.code,
    label: c.code === 'OTHER' ? c.short[i] : [c.en, c.pt, c.es][i],
    short: c.short[i],
    code: c.code === 'OTHER' ? 'INT' : c.code,
  }));
}
