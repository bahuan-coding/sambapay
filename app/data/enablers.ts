import type { Lang } from '../i18n';

export type EnablerKind = 'stock' | 'store' | 'acquiring' | 'included';

export interface EnablerStep {
  kind: EnablerKind;
  title: string;
  body: string;
  href?: string;
}

const steps: Record<Lang, EnablerStep[]> = {
  en: [
    {
      kind: 'stock',
      title: 'The stock',
      body: 'The business brings its stock. A niche marketplace, or stock shared by physical shops.',
    },
    {
      kind: 'store',
      title: 'The online store',
      body: 'We digitise the store where we have structure.',
    },
    {
      kind: 'acquiring',
      title: 'The terminal',
      body: 'The digitised store includes the card terminal for online sales.',
      href: '/acquirers',
    },
    {
      kind: 'included',
      title: 'Included',
      body: 'The local client in each market has the service included. We do not charge a marketplace fee.',
    },
  ],
  pt: [
    {
      kind: 'stock',
      title: 'O estoque',
      body: 'O negócio traz o estoque. Um marketplace de nicho, ou estoque compartilhado entre lojistas físicos.',
    },
    {
      kind: 'store',
      title: 'A loja online',
      body: 'Digitalizamos a loja onde temos estrutura.',
    },
    {
      kind: 'acquiring',
      title: 'A maquininha',
      body: 'A loja digitalizada já inclui a maquininha para a venda online.',
      href: '/pt/adquirentes',
    },
    {
      kind: 'included',
      title: 'Incluso',
      body: 'O cliente local de cada mercado tem o serviço incluso. Não cobramos a taxa de um marketplace.',
    },
  ],
  es: [
    {
      kind: 'stock',
      title: 'El stock',
      body: 'El negocio trae el stock. Un marketplace de nicho, o stock compartido entre tiendas físicas.',
    },
    {
      kind: 'store',
      title: 'La tienda en línea',
      body: 'Digitalizamos la tienda donde tenemos estructura.',
    },
    {
      kind: 'acquiring',
      title: 'La terminal',
      body: 'La tienda digitalizada ya incluye la terminal para la venta en línea.',
      href: '/es/adquirentes',
    },
    {
      kind: 'included',
      title: 'Incluido',
      body: 'El cliente local de cada mercado tiene el servicio incluido. No cobramos la tasa de un marketplace.',
    },
  ],
};

export function enablerSteps(lang: Lang): EnablerStep[] {
  return steps[lang];
}
