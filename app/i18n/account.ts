import type { Lang } from './index';

const en = {
  title: 'Account',
  h1: 'Account',
  in: 'You are in.',
  logout: 'Log out',
  niches: "We do not take our clients' merchants. We do not dispute their accounts. Two niches, no conflict of interest.",

  progressTitle: 'Your application',
  steps: ['Account', 'Business', 'Owners', 'Documents'],
  statusLabel: 'Status',
  statuses: {
    commercial_fit: {
      title: 'In review',
      body: 'We are reviewing your application. Collection starts after approval.',
    },
  } as Record<string, { title: string; body: string }>,

  companyTitle: 'Business',
  ownersTitle: 'Owners',
  ownersSuffix: 'on file',
  documentsTitle: 'Documents',
  noDocuments: 'No documents received yet.',
  noOwners: 'No owners listed yet.',
  documentReceived: 'Received',
};

type Copy = typeof en;

const pt: Copy = {
  ...en,
  title: 'Conta',
  h1: 'Conta',
  in: 'Você entrou.',
  logout: 'Sair',
  niches: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Dois nichos, sem conflito de interesse.',
  progressTitle: 'Sua candidatura',
  steps: ['Conta', 'Empresa', 'Sócios', 'Documentos'],
  statusLabel: 'Status',
  statuses: {
    commercial_fit: {
      title: 'Em análise',
      body: 'Estamos analisando a sua candidatura. A cobrança começa depois da aprovação.',
    },
  },
  companyTitle: 'Empresa',
  ownersTitle: 'Sócios',
  ownersSuffix: 'com documento',
  documentsTitle: 'Documentos',
  noDocuments: 'Nenhum documento recebido ainda.',
  noOwners: 'Nenhum sócio listado ainda.',
  documentReceived: 'Recebido',
};

const es: Copy = {
  ...en,
  title: 'Cuenta',
  h1: 'Cuenta',
  in: 'Usted entró.',
  logout: 'Salir',
  niches: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. Dos nichos, sin conflicto de interés.',
  progressTitle: 'Tu solicitud',
  steps: ['Cuenta', 'Empresa', 'Socios', 'Documentos'],
  statusLabel: 'Estado',
  statuses: {
    commercial_fit: {
      title: 'En revisión',
      body: 'Estamos revisando tu solicitud. La cobranza empieza después de la aprobación.',
    },
  },
  companyTitle: 'Empresa',
  ownersTitle: 'Socios',
  ownersSuffix: 'con documento',
  documentsTitle: 'Documentos',
  noDocuments: 'Aún no se recibió ningún documento.',
  noOwners: 'Aún no hay socios listados.',
  documentReceived: 'Recibido',
};

const accountCatalog = { en, pt, es };

export function accountCopy(lang: Lang): Copy {
  return accountCatalog[lang];
}
