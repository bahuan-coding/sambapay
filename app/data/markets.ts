import type { Lang } from '../i18n';
import type { MethodKey } from './payment-methods';

export interface Market {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  currencyName: string;
  methods: MethodKey[];
  note: string;
  image: string;
  focus: string;
  credit: string;
  creditHref: string;
}

interface Photo {
  file: string;
  focus: string;
  credit: string;
  href: string;
}

const photos: Record<string, Photo> = {
  AR: {
    file: '/places/market-ar.jpg',
    focus: 'center 55%',
    credit: 'Dpalma01, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Obelisco_de_Buenos_Aires_at_sunset.jpg',
  },
  BO: {
    file: '/places/market-bo.jpg',
    focus: 'center 45%',
    credit: 'Parallelepiped09, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:City_of_La_Paz,_Bolivia.jpg',
  },
  BR: {
    file: '/places/market-br.jpg',
    focus: 'center 42%',
    credit: 'Paul R. Burley, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Largo_do_Pelourinho_Salvador_2019-9754_(cropped).jpg',
  },
  CL: {
    file: '/places/market-cl.jpg',
    focus: 'center 45%',
    credit: 'Rjcastillo, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Mural_en_Santiago,_Chile_A74003520250517.jpg',
  },
  CO: {
    file: '/places/market-co.jpg',
    focus: 'center 48%',
    credit: 'Felipe Restrepo Acosta, CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Centro_internacional.JPG',
  },
  CR: {
    file: '/places/market-cr.jpg',
    focus: 'center 45%',
    credit: 'Wikimedia Commons, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Partial_view_of_Downtown_San_Jose,_Costa_Rica.jpg',
  },
  CU: {
    file: '/places/market-cu.jpg',
    focus: 'center 45%',
    credit: 'Detroit Publishing Company, public domain',
    href: 'https://commons.wikimedia.org/wiki/File:Havana_-_Malecon_and_El_Morro.jpg',
  },
  DO: {
    file: '/places/market-do.jpg',
    focus: 'center 50%',
    credit: 'He Yifeng, CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Av._George_Washington_457,_Santo_Domingo,_Dominican_Republic_-_panoramio.jpg',
  },
  EC: {
    file: '/places/market-ec.jpg',
    focus: 'center 45%',
    credit: 'Diego Delso, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Vista_de_Quito_desde_El_Panecillo,_Ecuador,_2015-07-22,_DD_25-29_PAN.JPG',
  },
  SV: {
    file: '/places/market-sv.jpg',
    focus: 'center 45%',
    credit: 'Mariordo, CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:El_Salvador_Wikivoyage_banner.JPG',
  },
  GT: {
    file: '/places/market-gt.jpg',
    focus: 'center 45%',
    credit: 'amslerPIX, CC BY 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:Parque_Central,_Antigua_Guatemala_7.jpg',
  },
  HT: {
    file: '/places/market-ht.jpg',
    focus: 'center 45%',
    credit: 'Elena Heredero, CC BY 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:View_of_Port-au-Prince_from_Hotel_Montana.jpg',
  },
  HN: {
    file: '/places/market-hn.jpg',
    focus: 'center 45%',
    credit: 'Nan Palmero, CC BY 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:Sunset_in_Tegucigalpa,_Honduras_at_Cafemania.jpg',
  },
  MX: {
    file: '/places/market-mx.jpg',
    focus: 'center 55%',
    credit: 'JavierDo, CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Skyline_Paseo_de_la_Reforma_-_panoramio.jpg',
  },
  NI: {
    file: '/places/market-ni.jpg',
    focus: 'center 45%',
    credit: 'Mark Larson, CC BY-SA 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:Granada,_Nicaragua_panorama.jpg',
  },
  PA: {
    file: '/places/market-pa.jpg',
    focus: 'center 45%',
    credit: 'Virpana, CC0',
    href: 'https://commons.wikimedia.org/wiki/File:V%C3%ADa_Brasil_(Ciudad_de_Panam%C3%A1).jpg',
  },
  PY: {
    file: '/places/market-py.jpg',
    focus: 'center 45%',
    credit: 'W. Bulach, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:00_3819_Asunci%C3%B3n_-_Paraguay_(S%C3%BCdamerika).jpg',
  },
  PE: {
    file: '/places/market-pe.jpg',
    focus: 'center 45%',
    credit: 'Wasiwatana, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Malec%C3%B3n_de_Miraflores_frente_al_Parque_Intihuatana.jpg',
  },
  UY: {
    file: '/places/market-uy.jpg',
    focus: 'center 45%',
    credit: 'Ezarate, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:AtardecerenMontevideo-feb2015.JPG',
  },
  VE: {
    file: '/places/market-ve.jpg',
    focus: 'center 45%',
    credit: 'Paolo Costa Baldi, CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Caribbean_Sea,_Avila_Mt,_Caracas_Panorama.jpg',
  },
};

interface Copy {
  eyebrow: string;
  title: string;
  lede: string;
  mapTitle: string;
  mapLede: string;
  accessTitle: string;
  accessLede: string;
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

// Every market is reached through the partners we know. The card brands and the
// local rails we carry, drawn from our own coverage and the two references.
const coverage: Record<string, MethodKey[]> = {
  BR: ['visa', 'mastercard', 'amex', 'elo', 'hipercard', 'pix', 'boleto'],
  MX: ['visa', 'mastercard', 'amex', 'spei', 'oxxo', 'tambo'],
  AR: ['visa', 'mastercard', 'amex', 'pagofacil', 'pago24', 'mercadopago', 'modo'],
  CL: ['visa', 'mastercard', 'amex', 'diners', 'redcompra', 'webpay', 'magna', 'bancoestado', 'bci', 'mach', 'mercadopago'],
  CO: ['visa', 'mastercard', 'amex', 'diners', 'pse'],
  PE: ['visa', 'mastercard', 'amex', 'diners', 'bcp', 'bbva', 'interbank', 'scotiabank', 'pagoefectivo', 'tambo', 'kasnet', 'pagaya', 'yape', 'plin'],
  EC: ['visa', 'mastercard', 'amex', 'guayaquil', 'westernunion'],
  UY: ['visa', 'mastercard', 'diners'],
  BO: ['visa', 'mastercard'],
  PY: ['visa', 'mastercard'],
  VE: ['visa', 'mastercard'],
  CR: ['visa', 'mastercard'],
  CU: ['visa', 'mastercard'],
  DO: ['visa', 'mastercard'],
  SV: ['visa', 'mastercard'],
  GT: ['visa', 'mastercard'],
  HT: ['visa', 'mastercard'],
  HN: ['visa', 'mastercard'],
  NI: ['visa', 'mastercard'],
  PA: ['visa', 'mastercard'],
};

function methodsFor(code: string): MethodKey[] {
  return coverage[code] ?? ['visa', 'mastercard'];
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
  const symbols: Record<string, string> = {
    ARS: '$', BOB: 'Bs', BRL: 'R$', CLP: '$', COP: '$', CRC: '₡', CUP: '$',
    DOP: 'RD$', USD: '$', GTQ: 'Q', HTG: 'G', HNL: 'L', MXN: '$', NIO: 'C$',
    PAB: 'B/.', PYG: '₲', PEN: 'S/', UYU: '$U', VES: 'Bs',
  };
  const currencyNames: Record<string, [string, string, string]> = {
    ARS: ['Argentine peso', 'peso argentino', 'peso argentino'],
    BOB: ['Boliviano', 'boliviano', 'boliviano'],
    BRL: ['Real', 'real', 'real'],
    CLP: ['Chilean peso', 'peso chileno', 'peso chileno'],
    COP: ['Colombian peso', 'peso colombiano', 'peso colombiano'],
    CRC: ['Colón', 'colón', 'colón'],
    CUP: ['Cuban peso', 'peso cubano', 'peso cubano'],
    DOP: ['Dominican peso', 'peso dominicano', 'peso dominicano'],
    USD: ['US dollar', 'dólar', 'dólar'],
    GTQ: ['Quetzal', 'quetzal', 'quetzal'],
    HTG: ['Gourde', 'gourde', 'gourde'],
    HNL: ['Lempira', 'lempira', 'lempira'],
    MXN: ['Mexican peso', 'peso mexicano', 'peso mexicano'],
    NIO: ['Córdoba', 'córdoba', 'córdoba'],
    PAB: ['Balboa', 'balboa', 'balboa'],
    PYG: ['Guaraní', 'guarani', 'guaraní'],
    PEN: ['Sol', 'sol', 'sol'],
    UYU: ['Uruguayan peso', 'peso uruguaio', 'peso uruguayo'],
    VES: ['Bolívar', 'bolívar', 'bolívar'],
  };
  const noteByTier: Record<string, [string, string, string]> = {
    deep: [
      'Cards, local instant payments and local settlement.',
      'Cartões, pagamentos instantâneos locais e liquidação local.',
      'Tarjetas, pagos instantáneos locales y liquidación local.',
    ],
    local: [
      'Cards and the local rails that market runs on.',
      'Cartões e os trilhos locais em que aquele mercado roda.',
      'Tarjetas y los rieles locales en los que corre ese mercado.',
    ],
    network: [
      'Cards and bank transfer through our local partners.',
      'Cartões e transferência bancária pelos nossos parceiros locais.',
      'Tarjetas y transferencia bancaria a través de nuestros socios locales.',
    ],
  };
  const noteByMarket: Record<string, [string, string, string]> = {
    BR: [
      'Pix, cards and boleto, with local settlement.',
      'Pix, cartões e boleto, com liquidação local.',
      'Pix, tarjetas y boleto, con liquidación local.',
    ],
    MX: [
      'Cards, SPEI and cash at OXXO.',
      'Cartões, SPEI e dinheiro no OXXO.',
      'Tarjetas, SPEI y efectivo en OXXO.',
    ],
    AR: [
      'Cards, QR and cash at Pago Fácil.',
      'Cartões, QR e dinheiro no Pago Fácil.',
      'Tarjetas, QR y efectivo en Pago Fácil.',
    ],
    CL: [
      'Cards and the local bank transfer.',
      'Cartões e a transferência bancária local.',
      'Tarjetas y la transferencia bancaria local.',
    ],
    CO: [
      'Cards and the local bank transfer.',
      'Cartões e a transferência bancária local.',
      'Tarjetas y la transferencia bancaria local.',
    ],
    PE: [
      'Cards and the local bank transfer.',
      'Cartões e a transferência bancária local.',
      'Tarjetas y la transferencia bancaria local.',
    ],
  };
  const noteByTierResolved = (code: string, i: number) =>
    (noteByMarket[code] ?? noteByTier[['CL', 'CO', 'PE'].includes(code) ? 'local' : 'network'])[i];

  return [...southCodes, ...centralCodes].map((code) => {
    const i = lang === 'pt' ? 1 : lang === 'es' ? 2 : 0;
    const photo = photos[code];
    const iso = currencies[code];
    return {
      code: code.toLowerCase(),
      name: names[code][i],
      currency: iso,
      currencySymbol: symbols[iso],
      currencyName: currencyNames[iso][i],
      methods: methodsFor(code),
      note: noteByTierResolved(code, i),
      image: photo.file,
      focus: photo.focus,
      credit: photo.credit,
      creditHref: photo.href,
    };
  });
}

/** Every method we carry across the whole map, in the order they appear. */
export function allMethods(): MethodKey[] {
  const seen: MethodKey[] = [];
  for (const code of [...southCodes, ...centralCodes]) {
    for (const key of methodsFor(code)) {
      if (!seen.includes(key)) seen.push(key);
    }
  }
  return seen;
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
    title: 'Access in every market of South and Central America.',
    lede: 'We open local rails through partners across South and Central America. Twenty markets, one local commercial policy: local prices, a local signup and a direct connection.',
    mapTitle: 'Where the money moves.',
    mapLede: 'Ten markets in South America. Ten in Mexico, Central America and the Caribbean. Each one pays the way it always has, and we meet it there.',
    accessTitle: 'Coverage is access, not a catalogue.',
    accessLede: 'We know a partner in every one of these markets. That is what lets your volume land on local rails, at local prices, wherever the customer pays.',
    southTitle: 'South America',
    centralTitle: 'Mexico, Central America and the Caribbean',
    corridorTitle: 'One corridor, many rails.',
    corridorLede: 'A single client reaches every market through the same path: the local rail collects, the money settles, and reconciliation closes before anything moves.',
    corridor: [
      { title: 'Partner access', body: 'A known partner brings each local rail live.' },
      { title: 'Local policy', body: 'Your volume is priced the way a local merchant is priced.' },
      { title: 'One connection', body: 'You do not clear each market requirement on your own.' },
      { title: 'One book', body: 'Every market reconciles against the same ledger.' },
    ],
    refuseTitle: 'What we do not do',
    refuse: "We do not take our clients' merchants. We do not dispute their accounts. We do not do fulfilment or shipping. Only the rails, the digitised store and the settlement that carries money out. Two niches, no conflict of interest.",
    ctaTitle: 'Tell us which market you need to reach.',
    ctaLede: 'The local path is designed around it, from the first rail to the settlement.',
    cta: 'Create account',
  },
  pt: {
    eyebrow: 'Mercados',
    title: 'Acesso em cada mercado da América do Sul e Central.',
    lede: 'Abrimos trilhos locais com parceiros na América do Sul e Central. Vinte mercados, uma só política comercial local: preços locais, cadastro local e conexão direta.',
    mapTitle: 'Onde o dinheiro se move.',
    mapLede: 'Dez mercados na América do Sul. Dez no México, na América Central e no Caribe. Cada um paga do jeito que sempre pagou, e nós encontramos esse jeito.',
    accessTitle: 'Cobertura é acesso, não catálogo.',
    accessLede: 'Conhecemos um parceiro em cada um destes mercados. É isso que faz o seu volume chegar a trilhos locais, a preços locais, onde o cliente pagar.',
    southTitle: 'América do Sul',
    centralTitle: 'México, América Central e Caribe',
    corridorTitle: 'Um corredor, muitos trilhos.',
    corridorLede: 'Todo mercado é alcançado pelo mesmo caminho: o trilho local captura, o dinheiro liquida, e a conciliação fecha antes de o dinheiro sair.',
    corridor: [
      { title: 'Acesso por parceiro', body: 'Um parceiro conhecido ativa o trilho local.' },
      { title: 'Política local', body: 'O seu volume é precificado como o de um merchant local.' },
      { title: 'Uma conexão', body: 'Você não cumpre cada exigência de cada mercado sozinho.' },
      { title: 'Um livro', body: 'Todos os mercados conciliam contra o mesmo livro.' },
    ],
    refuseTitle: 'O que não fazemos',
    refuse: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Não fazemos fulfilment nem envio. Só os trilhos, a loja digitalizada e a liquidação que leva o dinheiro embora. Dois nichos, sem conflito de interesse.',
    ctaTitle: 'Diga-nos qual mercado você precisa alcançar.',
    ctaLede: 'O caminho local é desenhado em torno dele, do primeiro trilho à liquidação.',
    cta: 'Criar conta',
  },
  es: {
    eyebrow: 'Mercados',
    title: 'Acceso en cada mercado de América del Sur y Central.',
    lede: 'Abrimos rieles locales con socios en América del Sur y Central. Veinte mercados, una única política comercial local: precios locales, registro local y conexión directa.',
    mapTitle: 'Donde se mueve el dinero.',
    mapLede: 'Diez mercados en América del Sur. Diez en México, América Central y el Caribe. Cada uno paga como siempre pagó, y lo encontramos ahí.',
    accessTitle: 'Cobertura es acceso, no catálogo.',
    accessLede: 'Conocemos un socio en cada uno de estos mercados. Eso es lo que hace que su volumen llegue a rieles locales, a precios locales, donde pague el comprador.',
    southTitle: 'América del Sur',
    centralTitle: 'México, América Central y el Caribe',
    corridorTitle: 'Un corredor, muchos rieles.',
    corridorLede: 'Todo mercado se alcanza por el mismo camino: el riel local cobra, el dinero liquida, y la conciliación cierra antes de que el dinero salga.',
    corridor: [
      { title: 'Acceso por socio', body: 'Un socio conocido activa cada riel local.' },
      { title: 'Política local', body: 'Su volumen se precifica como el de un merchant local.' },
      { title: 'Una conexión', body: 'Usted no cumple cada exigencia de cada mercado por su cuenta.' },
      { title: 'Un libro', body: 'Todos los mercados concilian contra el mismo libro.' },
    ],
    refuseTitle: 'Lo que no hacemos',
    refuse: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. No hacemos fulfilment ni envío. Solo los rieles, la tienda digitalizada y la liquidación que lleva el dinero afuera. Dos nichos, sin conflicto de interés.',
    ctaTitle: 'Díganos qué mercado necesita alcanzar.',
    ctaLede: 'El camino local se diseña alrededor de él, del primer riel a la liquidación.',
    cta: 'Crear cuenta',
  },
};

export function marketsCopy(lang: Lang): Copy {
  return copy[lang];
}
