import type { ShoreFrame } from './shore';

export type Mark =
  | 'prices'
  | 'methods'
  | 'terminal'
  | 'signup'
  | 'connection'
  | 'rails'
  | 'stock'
  | 'store'
  | 'included'
  | 'collect'
  | 'steps'
  | 'book';

export interface FeatureItem {
  mark: Mark;
  title: string;
  body: string;
}

export interface FeatureColumn {
  title: string;
  items: FeatureItem[];
}

const en = {
  seoTitle: 'Product',
  lede: 'Local prices, a local signup and a direct connection. Several acquirers sit side by side. The digitised store includes the terminal. Money collected locally comes back in as few steps as possible.',
  refusalTitle: 'What we do not do',
  refusal: "We do not take our clients' merchants. We do not dispute their accounts. We do not do fulfilment or shipping. Two niches, no conflict of interest.",
  close: 'Collected locally. Returned in few steps.',
  cta: 'Create account',
  ctaHref: '/signup',
  columns: [
    {
      title: 'Accept',
      items: [
        { mark: 'prices', title: 'Local prices', body: 'Your volume is priced at the MDR a local merchant gets.' },
        { mark: 'methods', title: 'Cards and local methods', body: 'Credit and debit, 3DS and 2D, plus the local methods of that market. In Brazil, PIX.' },
        { mark: 'terminal', title: 'Card capture', body: 'The digitised store includes card capture for online sales.' },
      ],
    },
    {
      title: 'Connect',
      items: [
        { mark: 'signup', title: 'Local signup', body: 'We file the client data with the local partners, including the licences the acquirer requires.' },
        { mark: 'connection', title: 'Direct connection', body: 'The client uses our local commercial policy. It does not clear each acquirer requirement on its own.' },
        { mark: 'rails', title: 'Acquirers side by side', body: 'Several acquirers sit in each market. No single acquirer caps the volume or holds the risk alone.' },
      ],
    },
    {
      title: 'Enable',
      items: [
        { mark: 'stock', title: 'The stock', body: 'The business brings its stock.' },
        { mark: 'store', title: 'The online store', body: 'We digitise the store where we have structure.' },
        { mark: 'included', title: 'Included', body: 'Card capture is included. We do not charge a marketplace fee.' },
      ],
    },
    {
      title: 'Settle',
      items: [
        { mark: 'collect', title: 'Captured locally', body: 'The payment is captured in the acquiring market.' },
        { mark: 'steps', title: 'Settlement', body: 'Cleared funds reach you in as few hops as possible.' },
        { mark: 'book', title: 'Reconciliation', body: 'Nothing is paid out before reconciliation ties.' },
      ],
    },
  ] as FeatureColumn[],
};

const pt = {
  seoTitle: 'Produto',
  lede: 'Preços locais, local signup e direct connection. Vários adquirentes lado a lado. A loja digitalizada inclui a maquininha. O dinheiro arrecadado localmente volta no menor número de passos.',
  refusalTitle: 'O que não fazemos',
  refusal: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Não fazemos fulfilment nem envio. Dois nichos, sem conflito de interesse.',
  close: 'Arrecadado aqui. Devolvido em poucos passos.',
  cta: 'Criar conta',
  ctaHref: '/pt/signup',
  columns: [
    {
      title: 'Receber',
      items: [
        { mark: 'prices', title: 'Preços locais', body: 'O volume é precificado no MDR que um merchant local recebe.' },
        { mark: 'methods', title: 'Cartão e meios locais', body: 'Crédito e débito, 3DS e 2D, mais os meios locais daquele mercado. No Brasil, PIX.' },
        { mark: 'terminal', title: 'Captura no cartão', body: 'A loja digitalizada inclui a captura no cartão para a venda online.' },
      ],
    },
    {
      title: 'Conectar',
      items: [
        { mark: 'signup', title: 'Local signup', body: 'Protocolamos os dados do cliente com os parceiros locais, inclusive as licenças que o adquirente exige.' },
        { mark: 'connection', title: 'Direct connection', body: 'O cliente usa a nossa política comercial local. Não cumpre cada exigência do adquirente sozinho.' },
        { mark: 'rails', title: 'Adquirentes lado a lado', body: 'Vários adquirentes ficam em cada mercado. Nenhum sozinho limita o volume nem carrega o risco.' },
      ],
    },
    {
      title: 'Habilitar',
      items: [
        { mark: 'stock', title: 'O estoque', body: 'O negócio traz o estoque.' },
        { mark: 'store', title: 'A loja online', body: 'Digitalizamos a loja onde temos estrutura.' },
        { mark: 'included', title: 'Incluso', body: 'A captura no cartão está inclusa. Não cobramos a taxa de um marketplace.' },
      ],
    },
    {
      title: 'Liquidar',
      items: [
        { mark: 'collect', title: 'Captura local', body: 'O pagamento é capturado no mercado de adquirência.' },
        { mark: 'steps', title: 'Liquidação', body: 'O valor liquidado chega até você no menor número de saltos.' },
        { mark: 'book', title: 'Conciliação', body: 'Nada é pago antes de a conciliação fechar.' },
      ],
    },
  ] as FeatureColumn[],
};

export function productCopy(lang: 'en' | 'pt') {
  return lang === 'pt' ? pt : en;
}

const chapterMeta = {
  en: [
    {
      plate: 'rails' as const,
      title: 'How the rails work',
      lede: 'The volume meets local acquiring in this order.',
      steps: [
        { title: 'Local signup', body: 'We gather your data and deliver it to the local partners.' },
        { title: 'The licences', body: 'We help with the licences, the regulations and the requirements of regulated institutions, so the approval has a better chance.' },
        { title: 'Side by side', body: 'Several local acquirers sit in each market. No single one limits the volume or concentrates the risk.' },
        { title: 'Direct connection', body: 'You do not meet each requirement on your own. You use the volume of our local commercial policy and enter the competitive market.' },
      ],
    },
    {
      plate: 'enable' as const,
      title: 'How the store is stood up',
      lede: 'Where we have structure, the store is stood up in this order.',
      steps: [
        { title: 'The stock', body: 'The business brings its stock. A niche marketplace, or stock shared by physical shops.' },
        { title: 'The online store', body: 'We digitise the store where we have structure.' },
        { title: 'The terminal', body: 'The digitised store includes the card terminal for online sales.' },
        { title: 'Included', body: 'The local client in each market has the service included. We do not charge a marketplace fee.' },
      ],
    },
    {
      plate: 'settle' as const,
      title: 'How the money comes back',
      lede: 'Money collected locally comes back in this order.',
      steps: [
        { title: 'Collected locally', body: 'The money is collected in the market.' },
        { title: 'Few steps', body: 'It reaches you in as few steps as possible.' },
        { title: 'The book', body: 'Nothing moves before the book ties.' },
      ],
    },
  ],
  pt: [
    {
      plate: 'rails' as const,
      title: 'Como os trilhos funcionam',
      lede: 'O volume encontra o adquirente local nesta ordem.',
      steps: [
        { title: 'Local signup', body: 'Reunimos os seus dados e os entregamos aos parceiros locais.' },
        { title: 'As licenças', body: 'Ajudamos com as licenças, as regulações e as exigências de instituições reguladas, para a aprovação ter mais chance.' },
        { title: 'Lado a lado', body: 'Vários adquirentes locais ficam em cada mercado. Nenhum sozinho limita o volume nem concentra o risco.' },
        { title: 'Direct connection', body: 'Você não atende a cada exigência sozinho. Você usa o volume da nossa política comercial local e entra no mercado competitivo.' },
      ],
    },
    {
      plate: 'enable' as const,
      title: 'Como a loja fica de pé',
      lede: 'Onde temos estrutura, a loja fica de pé nesta ordem.',
      steps: [
        { title: 'O estoque', body: 'O negócio traz o estoque. Um marketplace de nicho, ou estoque compartilhado entre lojistas físicos.' },
        { title: 'A loja online', body: 'Digitalizamos a loja onde temos estrutura.' },
        { title: 'A maquininha', body: 'A loja digitalizada inclui a maquininha para a venda online.' },
        { title: 'Incluso', body: 'O cliente local de cada mercado tem o serviço incluso. Não cobramos a taxa de um marketplace.' },
      ],
    },
    {
      plate: 'settle' as const,
      title: 'Como o dinheiro volta',
      lede: 'O dinheiro arrecadado localmente volta nesta ordem.',
      steps: [
        { title: 'Arrecadado aqui', body: 'O dinheiro é arrecadado no mercado.' },
        { title: 'Poucos passos', body: 'Ele chega até você no menor número de passos.' },
        { title: 'O livro', body: 'Nada se move antes de o livro fechar.' },
      ],
    },
  ],
};

function chapterFrames(lang: 'en' | 'pt'): Record<string, ShoreFrame> {
  const country = (en: string, pt: string) => (lang === 'pt' ? pt : en);
  return {
    '/places/ouro-preto-2009.jpg': {
      image: '/places/ouro-preto-2009.jpg',
      place: 'Ouro Preto',
      country: country('Brazil', 'Brasil'),
      flag: 'br',
      credit: 'Alvesgaspar, CC BY-SA 3.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Ouro_Preto_November_2009-13.jpg',
      focus: 'center 58%',
    },
    '/places/guatape-town.jpg': {
      image: '/places/guatape-town.jpg',
      place: 'Guatapé',
      country: country('Colombia', 'Colômbia'),
      flag: 'co',
      credit: 'Adriana García, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Plazoleta_de_los_Z%C3%B3calos_de_colores_en_Guatap%C3%A9_-_Pueblo_de_los_z%C3%B3calos.jpg',
      focus: 'center 42%',
    },
    '/places/guanajuato.jpg': {
      image: '/places/guanajuato.jpg',
      place: 'Guanajuato',
      country: country('Mexico', 'México'),
      flag: 'mx',
      credit: 'Cesarloar, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Guanajuato_panor%C3%A1mica.jpg',
      focus: 'center 40%',
    },
  };
}

export function productFrames(lang: 'en' | 'pt'): ShoreFrame[] {
  const frames = chapterFrames(lang);
  return [
    frames['/places/guanajuato.jpg'],
    frames['/places/guatape-town.jpg'],
    frames['/places/ouro-preto-2009.jpg'],
  ];
}

export function productChapters(lang: 'en' | 'pt') {
  return chapterMeta[lang];
}
