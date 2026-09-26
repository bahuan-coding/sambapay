import type { Lang } from '../i18n';
import type { ShoreFrame } from './shore';
import { esChapters, esCopy } from './features-es';

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
  pay?: string[];
}

export type MethodIcon =
  | 'credit'
  | 'debit'
  | 'threeds'
  | 'visa_secure'
  | 'mastercard_id_check'
  | 'amex_safekey'
  | 'pix'
  | 'boleto'
  | 'oxxo'
  | 'spei'
  | 'qra'
  | 'pagofacil'
  | 'transfer'
  | 'local'
  | 'brought'
  | 'prices'
  | 'capture';

export interface FeatureLine {
  title: string;
  body: string;
  icon?: MethodIcon | MethodIcon[];
  section?: string;
}

export interface FeatureGroup {
  title: string;
  lede: string;
  plate?: 'rails' | 'enable' | 'settle';
  items: FeatureLine[];
}

const en = {
  seoTitle: 'Product',
  lede: 'Local prices, a local signup and a direct connection. Several acquirers sit side by side. The digitised store includes the terminal. Money collected locally comes back in as few steps as possible.',
  refusalTitle: 'What we do not do',
  refusal: "We do not take our clients' merchants. We do not dispute their accounts. We do not do fulfilment or shipping. Two niches, no conflict of interest.",
  close: 'One path, end to end. The payment is authorised and captured in the market where the shopper pays, settles on the acquirer\u2019s window, and reaches the payout once fees, reserve, refunds and chargebacks settle against the book.',
  cta: 'Create account',
  ctaHref: '/signup',
  columns: [
    {
      title: 'Accept',
      pay: ['credit', 'debit', 'threeds', 'pix', 'boleto', 'spei', 'oxxo', 'qra', 'pagofacil', 'transfer'],
      items: [
        { mark: 'prices', title: 'Local prices', body: 'Your volume is charged the MDR a local merchant is charged. Our technology makes that rate possible.' },
        { mark: 'methods', title: 'Cards and local methods', body: 'Credit and debit, 3DS and 2D, plus the local methods of that market.' },
        { mark: 'terminal', title: 'Card capture', body: 'The digitised store includes card capture for online sales.' },
      ],
    },
    {
      title: 'Connect',
      pay: ['visa_secure', 'mastercard_id_check', 'amex_safekey'],
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
  groups: [
    {
      title: 'PayIn',
      lede: 'The shopper pays with the methods of that market.',
      items: [
        { icon: 'credit', title: 'Credit', body: 'Credit card charges, authorised and captured.' },
        { icon: 'debit', title: 'Debit', body: 'Debit card charges.' },
        {
          icon: ['visa_secure', 'mastercard_id_check', 'amex_safekey'],
          title: '3DS',
          body: "Reduce your chargebacks. The shopper's bank confirms it is the shopper. Without that challenge, the charge is 2D.",
        },
        { icon: 'pix', title: 'Pix', body: 'In Brazil, the instant payment.' },
        { icon: 'boleto', title: 'Boleto', body: 'In Brazil, the bank slip.' },
        { icon: 'spei', title: 'SPEI', body: 'In Mexico, the instant bank transfer.' },
        { icon: 'oxxo', title: 'OXXO Pay', body: 'In Mexico, the cash payment.' },
        { icon: 'qra', title: 'QR Argentina', body: 'In Argentina, one code at the till.' },
        { icon: 'pagofacil', title: 'Pago Fácil', body: 'In Argentina, the cash payment.' },
        { icon: 'transfer', title: 'Bank transfer', body: 'In Chile, the bank transfer.' },
        { icon: 'brought', title: 'Brought methods', body: 'A client can bring its own payment methods to connect locally.' },
      ],
    },
    {
      title: 'Account',
      lede: 'The volume meets local acquiring in this order.',
      plate: 'rails',
      items: [
        { title: 'Local signup', body: 'We gather your data and deliver it to the local partners.' },
        { title: 'The licences', body: 'We help with the licences, the regulations and the requirements of regulated institutions, so the approval has a better chance.' },
        { title: 'Direct connection', body: 'You do not meet each requirement on your own. You use the volume of our local commercial policy.' },
        { title: 'Side by side', body: 'Several local acquirers sit in each market. No single one limits the volume or concentrates the risk.' },
        { title: 'One system', body: 'A client with more than one nationality gets one system, with local entities and teams already in those markets.' },
        { title: 'Screening', body: 'The company and its owners are screened before it goes live.' },
      ],
    },
    {
      title: 'Checkout',
      lede: 'Where we have structure, the store is stood up in this order.',
      plate: 'enable',
      items: [
        { title: 'The stock', body: 'The business brings its stock. A niche marketplace, or stock shared by physical shops.' },
        { title: 'The online store', body: 'We digitise the store where we have structure.' },
        { title: 'The terminal', body: 'The digitised store includes the card terminal for online sales.' },
        { title: 'Included', body: 'The local client in each market has the service included. We do not charge a marketplace fee.' },
        { title: 'Our checkout', body: 'A shopper pays at the checkout of a store we digitised.' },
        { title: 'Their site', body: "Or at the merchant's own site, using our checkout." },
        { title: 'The company', body: 'Digitisation runs from the CNPJ through the local entities, until payout.' },
      ],
    },
    {
      title: 'Settlement',
      lede: 'Money collected locally comes back in this order.',
      plate: 'settle',
      items: [
        { title: 'Captured locally', body: 'The payment is captured in the acquiring market.' },
        { title: 'Authorised', body: 'The rail authorises the attempt. Approval is counted here.' },
        { title: 'The window', body: "Funds settle on the acquirer's window. Every operator has a cut-off." },
        { title: 'The book', body: "The acquirer's file is tied to the ledger, line by line. Nothing is paid out before the book ties." },
        { title: 'What nets out', body: 'Fees, reserve, refunds and chargebacks net out before money moves.' },
        { title: 'Few steps', body: 'Cleared funds reach you in as few hops as possible.' },
        { title: 'Payout', body: 'Payout follows once the book ties.' },
      ],
    },
  ] as FeatureGroup[],
};

const pt = {
  seoTitle: 'Produto',
  lede: 'Preços locais, local signup e direct connection. Vários adquirentes lado a lado. A loja digitalizada inclui a maquininha. O dinheiro arrecadado localmente volta no menor número de passos.',
  refusalTitle: 'O que não fazemos',
  refusal: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Não fazemos fulfilment nem envio. Dois nichos, sem conflito de interesse.',
  close: 'Um caminho, ponta a ponta. O pagamento é autorizado e capturado no mercado onde o cliente paga, liquida na janela do adquirente e chega ao payout quando taxas, reserva, estornos e chargebacks fecham contra o livro.',
  cta: 'Criar conta',
  ctaHref: '/pt/signup',
  columns: [
    {
      title: 'Receber',
      pay: ['credit', 'debit', 'threeds', 'pix', 'boleto', 'spei', 'oxxo', 'qra', 'pagofacil', 'transfer'],
      items: [
        { mark: 'prices', title: 'Preços locais', body: 'O seu volume paga o MDR que um merchant local paga. Nossa tecnologia viabiliza essa taxa.' },
        { mark: 'methods', title: 'Cartão e meios locais', body: 'Crédito e débito, 3DS e 2D, mais os meios locais daquele mercado.' },
        { mark: 'terminal', title: 'Captura no cartão', body: 'A loja digitalizada inclui a captura no cartão para a venda online.' },
      ],
    },
    {
      title: 'Conectar',
      pay: ['visa_secure', 'mastercard_id_check', 'amex_safekey'],
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
  groups: [
    {
      title: 'PayIn',
      lede: 'Quem compra paga com os meios daquele mercado.',
      items: [
        { icon: 'credit', title: 'Crédito', body: 'Cobranças no cartão de crédito, autorizadas e capturadas.' },
        { icon: 'debit', title: 'Débito', body: 'Cobranças no cartão de débito.' },
        {
          icon: ['visa_secure', 'mastercard_id_check', 'amex_safekey'],
          title: '3DS',
          body: 'Reduza o chargeback. O banco do comprador confirma que é ele. Sem esse desafio, a cobrança é 2D.',
        },
        { icon: 'pix', title: 'Pix', body: 'No Brasil, o pagamento instantâneo.' },
        { icon: 'boleto', title: 'Boleto', body: 'No Brasil, o boleto bancário.' },
        { icon: 'spei', title: 'SPEI', body: 'No México, a transferência bancária instantânea.' },
        { icon: 'oxxo', title: 'OXXO Pay', body: 'No México, o pagamento em dinheiro.' },
        { icon: 'qra', title: 'QR Argentina', body: 'Na Argentina, um código no caixa.' },
        { icon: 'pagofacil', title: 'Pago Fácil', body: 'Na Argentina, o pagamento em dinheiro.' },
        { icon: 'transfer', title: 'Transferência bancária', body: 'No Chile, a transferência bancária.' },
        { icon: 'brought', title: 'Meios trazidos', body: 'O cliente pode trazer os próprios meios de pagamento para conectar localmente.' },
      ],
    },
    {
      title: 'Conta',
      lede: 'O volume encontra o adquirente local nesta ordem.',
      plate: 'rails',
      items: [
        { title: 'Local signup', body: 'Reunimos os seus dados e os entregamos aos parceiros locais.' },
        { title: 'As licenças', body: 'Ajudamos com as licenças, as regulações e as exigências de instituições reguladas, para a aprovação ter mais chance.' },
        { title: 'Direct connection', body: 'Você não atende a cada exigência sozinho. Você usa o volume da nossa política comercial local.' },
        { title: 'Lado a lado', body: 'Vários adquirentes locais ficam em cada mercado. Nenhum sozinho limita o volume nem concentra o risco.' },
        { title: 'Um sistema', body: 'Um cliente com mais de uma nacionalidade tem um sistema, com entidades e times locais já naqueles mercados.' },
        { title: 'Triagem', body: 'A empresa e os sócios são verificados antes de ir ao ar.' },
      ],
    },
    {
      title: 'Checkout',
      lede: 'Onde temos estrutura, a loja fica de pé nesta ordem.',
      plate: 'enable',
      items: [
        { title: 'O estoque', body: 'O negócio traz o estoque. Um marketplace de nicho, ou estoque compartilhado entre lojistas físicos.' },
        { title: 'A loja online', body: 'Digitalizamos a loja onde temos estrutura.' },
        { title: 'A maquininha', body: 'A loja digitalizada inclui a maquininha para a venda online.' },
        { title: 'Incluso', body: 'O cliente local de cada mercado tem o serviço incluso. Não cobramos a taxa de um marketplace.' },
        { title: 'O nosso checkout', body: 'Quem compra paga no checkout de uma loja que digitalizamos.' },
        { title: 'O site dele', body: 'Ou no próprio site do merchant, usando o nosso checkout.' },
        { title: 'A empresa', body: 'A digitalização vai do CNPJ às entidades locais, até o payout.' },
      ],
    },
    {
      title: 'Liquidação',
      lede: 'O dinheiro arrecadado localmente volta nesta ordem.',
      plate: 'settle',
      items: [
        { title: 'Captura local', body: 'O pagamento é capturado no mercado de adquirência.' },
        { title: 'Autorização', body: 'O trilho autoriza a tentativa. A aprovação é contada aqui.' },
        { title: 'A janela', body: 'Os fundos liquidam na janela do adquirente. Todo operador tem um horário de corte.' },
        { title: 'O livro', body: 'O arquivo do adquirente é amarrado ao livro, linha a linha. Nada é pago antes de o livro fechar.' },
        { title: 'O que sai', body: 'Taxas, reserva, estornos e chargebacks saem antes de o dinheiro se mover.' },
        { title: 'Poucos passos', body: 'O valor liquidado chega até você no menor número de saltos.' },
        { title: 'Payout', body: 'O payout segue quando o livro fecha.' },
      ],
    },
  ] as FeatureGroup[],
};

const productCatalog = { en, pt, es: esCopy };

export function productCopy(lang: Lang) {
  return productCatalog[lang];
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
  es: esChapters,
};

function chapterFrames(lang: Lang): Record<string, ShoreFrame> {
  const country = (en: string, pt: string, es: string) => (lang === 'pt' ? pt : lang === 'es' ? es : en);
  return {
    '/places/ouro-preto-2009.jpg': {
      image: '/places/ouro-preto-2009.jpg',
      place: 'Ouro Preto',
      country: country('Brazil', 'Brasil', 'Brasil'),
      flag: 'br',
      credit: 'Alvesgaspar, CC BY-SA 3.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Ouro_Preto_November_2009-13.jpg',
      focus: 'center 58%',
    },
    '/places/guatape-town.jpg': {
      image: '/places/guatape-town.jpg',
      place: 'Guatapé',
      country: country('Colombia', 'Colômbia', 'Colombia'),
      flag: 'co',
      credit: 'Adriana García, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Plazoleta_de_los_Z%C3%B3calos_de_colores_en_Guatap%C3%A9_-_Pueblo_de_los_z%C3%B3calos.jpg',
      focus: 'center 42%',
    },
    '/places/guanajuato.jpg': {
      image: '/places/guanajuato.jpg',
      place: 'Guanajuato',
      country: country('Mexico', 'México', 'México'),
      flag: 'mx',
      credit: 'Cesarloar, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Guanajuato_panor%C3%A1mica.jpg',
      focus: 'center 40%',
    },
  };
}

export function productFrames(lang: Lang): ShoreFrame[] {
  const frames = chapterFrames(lang);
  return [
    frames['/places/guanajuato.jpg'],
    frames['/places/guatape-town.jpg'],
    frames['/places/ouro-preto-2009.jpg'],
  ];
}

export function productChapters(lang: Lang) {
  return chapterMeta[lang];
}
