import type { Lang } from '../i18n';
import type { MethodIcon } from './features';

export interface Market {
  code: string;
  name: string;
  currency: string;
  methods: MethodIcon[];
  note: string;
}

interface Copy {
  eyebrow: string;
  title: string;
  lede: string;
  mapTitle: string;
  mapLede: string;
  accessTitle: string;
  accessLede: string;
  methodLabel: string;
  currencyLabel: string;
  southTitle: string;
  centralTitle: string;
  corridorTitle: string;
  corridorLede: string;
  corridor: { title: string; body: string }[];
  refuseTitle: string;
  refuse: string;
  ctaTitle: string;
  ctaLede: string;
  cta: string;
}

const southCodes = ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'PY', 'PE', 'UY', 'VE'];
const centralCodes = ['CR', 'CU', 'DO', 'SV', 'GT', 'HT', 'HN', 'NI', 'PA', 'MX'];
const base = new Set(['CL', 'CO', 'PE']);

function methodsFor(code: string): MethodIcon[] {
  const base: MethodIcon[] = ['credit', 'debit', 'threeds'];
  switch (code) {
    case 'BR':
      return [...base, 'pix', 'boleto', 'transfer'];
    case 'MX':
      return [...base, 'spei', 'oxxo'];
    case 'AR':
      return [...base, 'qra', 'pagofacil'];
    case 'CL':
    case 'CO':
    case 'PE':
      return [...base, 'transfer'];
    case 'CR':
    case 'DO':
    case 'GT':
    case 'HN':
    case 'NI':
    case 'PA':
    case 'SV':
      return [...base, 'transfer'];
    default:
      return base;
  }
}

export function markets(lang: Lang): Market[] {
  const names: Record<string, [string, string, string]> = {
    AR: ['Argentina', 'Argentina', 'Argentina'],
    BO: ['Bolivia', 'Bolívia', 'Bolivia'],
    BR: ['Brazil', 'Brasil', 'Brasil'],
    CL: ['Chile', 'Chile', 'Chile'],
    CO: ['Colombia', 'Colômbia', 'Colombia'],
    CR: ['Costa Rica', 'Costa Rica', 'Costa Rica'],
    CU: ['Cuba', 'Cuba', 'Cuba'],
    DO: ['Dominican Republic', 'República Dominicana', 'República Dominicana'],
    EC: ['Ecuador', 'Equador', 'Ecuador'],
    SV: ['El Salvador', 'El Salvador', 'El Salvador'],
    GT: ['Guatemala', 'Guatemala', 'Guatemala'],
    HT: ['Haiti', 'Haiti', 'Haití'],
    HN: ['Honduras', 'Honduras', 'Honduras'],
    MX: ['Mexico', 'México', 'México'],
    NI: ['Nicaragua', 'Nicarágua', 'Nicaragua'],
    PA: ['Panama', 'Panamá', 'Panamá'],
    PY: ['Paraguay', 'Paraguai', 'Paraguay'],
    PE: ['Peru', 'Peru', 'Perú'],
    UY: ['Uruguay', 'Uruguai', 'Uruguay'],
    VE: ['Venezuela', 'Venezuela', 'Venezuela'],
  };
  const currencies: Record<string, string> = {
    AR: 'ARS', BO: 'BOB', BR: 'BRL', CL: 'CLP', CO: 'COP', CR: 'CRC', CU: 'CUP',
    DO: 'DOP', EC: 'USD', SV: 'USD', GT: 'GTQ', HT: 'HTG', HN: 'HNL', MX: 'MXN',
    NI: 'NIO', PA: 'PAB', PY: 'PYG', PE: 'PEN', UY: 'UYU', VE: 'VES',
  };
  const noteByTier: Record<string, [string, string, string]> = {
    deep: [
      'Cards, local methods and local settlement.',
      'Cartões, meios locais e liquidação local.',
      'Tarjetas, medios locales y liquidación local.',
    ],
    local: [
      'Cards and the local rails the market uses.',
      'Cartões e os trilhos locais que o mercado usa.',
      'Tarjetas y los rieles locales que usa el mercado.',
    ],
    network: [
      'Cards and bank transfer through our local partners.',
      'Cartões e transferência bancária pelos nossos parceiros locais.',
      'Tarjetas y transferencia bancaria a través de nuestros socios locales.',
    ],
  };

  return [...southCodes, ...centralCodes].map((code) => {
    const i = lang === 'pt' ? 1 : lang === 'es' ? 2 : 0;
    const tier = code === 'BR' || code === 'MX' || code === 'AR' ? 'deep' : base.has(code) ? 'local' : 'network';
    return {
      code: code.toLowerCase(),
      name: names[code][i],
      currency: currencies[code],
      methods: methodsFor(code),
      note: noteByTier[tier][i],
    };
  });
}

export function marketGroups(lang: Lang) {
  const all = markets(lang);
  return {
    south: all.filter((m) => southCodes.includes(m.code.toUpperCase())),
    central: all.filter((m) => centralCodes.includes(m.code.toUpperCase())),
  };
}

const copy: Record<Lang, Copy> = {
  en: {
    eyebrow: 'Markets',
    title: 'Access across the Americas.',
    lede: 'We open local rails through partners across Latin America and Central America. Twenty markets, one local commercial policy: local prices, a local signup and a direct connection.',
    mapTitle: 'Where the money moves.',
    mapLede: 'Ten markets in South America, ten in Mexico, Central America and the Caribbean. Each one pays the way it always has, and we meet it there.',
    accessTitle: 'Coverage is access, not a catalogue.',
    accessLede: 'We know a partner in every one of these markets. That is what lets your volume land on local rails at local prices, wherever the customer pays.',
    methodLabel: 'Local methods',
    currencyLabel: 'Currency',
    southTitle: 'South America',
    centralTitle: 'Mexico, Central America and the Caribbean',
    corridorTitle: 'One corridor, many rails.',
    corridorLede: 'A single client reaches every market through the same path: the local rail collects, the money settles, and reconciliation closes before anything moves.',
    corridor: [
      { title: 'Partner access', body: 'A known partner in each market stands the local rail up.' },
      { title: 'Local policy', body: 'Your volume is priced the way a local merchant is priced.' },
      { title: 'One connection', body: 'You do not clear each market requirement on your own.' },
      { title: 'One book', body: 'Every market reconciles against the same ledger.' },
    ],
    refuseTitle: 'What we do not do',
    refuse: "We do not take our clients' merchants. We do not dispute their accounts. Two niches, no conflict of interest.",
    ctaTitle: 'Tell us which market you need to reach.',
    ctaLede: 'The local path is designed around it, from the first rail to the settlement.',
    cta: 'Create account',
  },
  pt: {
    eyebrow: 'Mercados',
    title: 'Acesso por todas as Américas.',
    lede: 'Abrimos trilhos locais com parceiros por toda a América Latina e a América Central. Vinte mercados, uma política comercial local: preços locais, local signup e direct connection.',
    mapTitle: 'Onde o dinheiro circula.',
    mapLede: 'Dez mercados na América do Sul, dez no México, na América Central e no Caribe. Cada um paga do jeito que sempre pagou, e nós encontramos esse jeito.',
    accessTitle: 'Cobertura é acesso, não um catálogo.',
    accessLede: 'Conhecemos um parceiro em cada um desses mercados. É isso que faz o seu volume pousar em trilhos locais a preços locais, onde o cliente pagar.',
    methodLabel: 'Meios locais',
    currencyLabel: 'Moeda',
    southTitle: 'América do Sul',
    centralTitle: 'México, América Central e Caribe',
    corridorTitle: 'Um corredor, muitos trilhos.',
    corridorLede: 'Um cliente alcança todos os mercados pelo mesmo caminho: o trilho local captura, o dinheiro liquida, e a conciliação fecha antes de qualquer coisa se mover.',
    corridor: [
      { title: 'Acesso por parceiro', body: 'Um parceiro conhecido em cada mercado põe o trilho local de pé.' },
      { title: 'Política local', body: 'O seu volume é precificado como o de um merchant local.' },
      { title: 'Uma conexão', body: 'Você não cumpre cada exigência de cada mercado sozinho.' },
      { title: 'Um livro', body: 'Todos os mercados conciliam contra o mesmo livro.' },
    ],
    refuseTitle: 'O que não fazemos',
    refuse: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Dois nichos, sem conflito de interesse.',
    ctaTitle: 'Diga-nos qual mercado você precisa alcançar.',
    ctaLede: 'O caminho local é desenhado em torno dele, do primeiro trilho à liquidação.',
    cta: 'Criar conta',
  },
  es: {
    eyebrow: 'Mercados',
    title: 'Acceso por todas las Américas.',
    lede: 'Abrimos rieles locales con socios en toda América Latina y América Central. Veinte mercados, una política comercial local: precios locales, local signup y direct connection.',
    mapTitle: 'Donde circula el dinero.',
    mapLede: 'Diez mercados en América del Sur, diez en México, América Central y el Caribe. Cada uno paga como siempre pagó, y lo encontramos ahí.',
    accessTitle: 'Cobertura es acceso, no un catálogo.',
    accessLede: 'Conocemos un socio en cada uno de estos mercados. Eso es lo que hace que su volumen llegue a rieles locales a precios locales, donde pague el comprador.',
    methodLabel: 'Medios locales',
    currencyLabel: 'Moneda',
    southTitle: 'América del Sur',
    centralTitle: 'México, América Central y el Caribe',
    corridorTitle: 'Un corredor, muchos rieles.',
    corridorLede: 'Un cliente alcanza todos los mercados por el mismo camino: el riel local captura, el dinero liquida, y la conciliación cierra antes de que algo se mueva.',
    corridor: [
      { title: 'Acceso por socio', body: 'Un socio conocido en cada mercado levanta el riel local.' },
      { title: 'Política local', body: 'Su volumen se precifica como el de un merchant local.' },
      { title: 'Una conexión', body: 'Usted no cumple cada exigencia de cada mercado por su cuenta.' },
      { title: 'Un libro', body: 'Todos los mercados concilian contra el mismo libro.' },
    ],
    refuseTitle: 'Lo que no hacemos',
    refuse: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. Dos nichos, sin conflicto de interés.',
    ctaTitle: 'Díganos qué mercado necesita alcanzar.',
    ctaLede: 'El camino local se diseña alrededor de él, del primer riel a la liquidación.',
    cta: 'Crear cuenta',
  },
};

export function marketsCopy(lang: Lang): Copy {
  return copy[lang];
}
