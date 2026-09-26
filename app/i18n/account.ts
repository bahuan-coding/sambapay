import type { Lang } from './index';

const en = {
  title: 'Account',
  h1: 'Account',
  in: 'You are in.',
  logout: 'Log out',
  niches: "We do not take our clients' merchants. We do not dispute their accounts. Two niches, no conflict of interest.",
};

const pt = {
  title: 'Conta',
  h1: 'Conta',
  in: 'Você entrou.',
  logout: 'Sair',
  niches: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Dois nichos, sem conflito de interesse.',
};

const es = {
  title: 'Cuenta',
  h1: 'Cuenta',
  in: 'Usted entró.',
  logout: 'Salir',
  niches: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. Dos nichos, sin conflicto de interés.',
};

const accountCatalog = { en, pt, es };

export function accountCopy(lang: Lang) {
  return accountCatalog[lang];
}
