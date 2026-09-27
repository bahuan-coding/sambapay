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
    docs_received: {
      title: 'Documents received',
      body: 'We have your documents. A review follows, then you can collect.',
    },
    in_review: {
      title: 'Under review',
      body: 'Our team is checking the details. Collection starts after approval.',
    },
    needs_info: {
      title: 'More information needed',
      body: 'We need one more thing from you. Check your email and reply.',
    },
    approved: {
      title: 'Approved',
      body: 'Your account is live. You can start collecting.',
    },
    rejected: {
      title: 'Not approved',
      body: 'We could not open this account. Check your email for the reason.',
    },
  } as Record<string, { title: string; body: string }>,

  companyTitle: 'Business',
  ownersTitle: 'Owners',
  ownersSuffix: 'on file',
  documentsTitle: 'Documents',
  noDocuments: 'No documents received yet.',
  noOwners: 'No owners listed yet.',
  documentReceived: 'Received',

  roles: {
    director: 'Director / legal representative',
    ubo: 'Beneficial owner (25% or more)',
  } as Record<string, string>,
  docTypes: {
    companyDoc: 'Company registration',
    ownerDoc: 'Owner identification',
    addressDoc: 'Proof of address',
    contractDoc: 'Power of attorney',
    ownerDocN: 'Owner identification',
  } as Record<string, string>,
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
    docs_received: {
      title: 'Documentos recebidos',
      body: 'Recebemos os seus documentos. Segue a análise e depois você pode cobrar.',
    },
    in_review: {
      title: 'Em revisão',
      body: 'Nossa equipe está conferindo os detalhes. A cobrança começa depois da aprovação.',
    },
    needs_info: {
      title: 'Falta informação',
      body: 'Precisamos de mais um dado. Confira o seu e-mail e responda.',
    },
    approved: {
      title: 'Aprovado',
      body: 'A sua conta está ativa. Você pode começar a cobrar.',
    },
    rejected: {
      title: 'Não aprovado',
      body: 'Não conseguimos abrir esta conta. Veja o motivo no seu e-mail.',
    },
  },
  companyTitle: 'Empresa',
  ownersTitle: 'Sócios',
  ownersSuffix: 'com documento',
  documentsTitle: 'Documentos',
  noDocuments: 'Nenhum documento recebido ainda.',
  noOwners: 'Nenhum sócio listado ainda.',
  documentReceived: 'Recebido',
  roles: {
    director: 'Diretor / representante legal',
    ubo: 'Beneficiário final (25% ou mais)',
  },
  docTypes: {
    companyDoc: 'Registro da empresa',
    ownerDoc: 'Identificação do sócio',
    addressDoc: 'Comprovante de endereço',
    contractDoc: 'Procuração',
    ownerDocN: 'Identificação do sócio',
  },
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
    docs_received: {
      title: 'Documentos recibidos',
      body: 'Ya tenemos tus documentos. Sigue la revisión y luego podrás cobrar.',
    },
    in_review: {
      title: 'En revisión',
      body: 'Nuestro equipo está revisando los detalles. La cobranza empieza después de la aprobación.',
    },
    needs_info: {
      title: 'Falta información',
      body: 'Necesitamos un dato más. Revisa tu correo y responde.',
    },
    approved: {
      title: 'Aprobado',
      body: 'Tu cuenta está activa. Puedes empezar a cobrar.',
    },
    rejected: {
      title: 'No aprobado',
      body: 'No pudimos abrir esta cuenta. Revisa el motivo en tu correo.',
    },
  },
  companyTitle: 'Empresa',
  ownersTitle: 'Socios',
  ownersSuffix: 'con documento',
  documentsTitle: 'Documentos',
  noDocuments: 'Aún no se recibió ningún documento.',
  noOwners: 'Aún no hay socios listados.',
  documentReceived: 'Recibido',
  roles: {
    director: 'Director / representante legal',
    ubo: 'Beneficiario final (25% o más)',
  },
  docTypes: {
    companyDoc: 'Registro de la empresa',
    ownerDoc: 'Identificación del socio',
    addressDoc: 'Comprobante de domicilio',
    contractDoc: 'Poder notarial',
    ownerDocN: 'Identificación del socio',
  },
};

const accountCatalog = { en, pt, es };

export function accountCopy(lang: Lang): Copy {
  return accountCatalog[lang];
}
