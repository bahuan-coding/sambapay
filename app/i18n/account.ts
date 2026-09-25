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

export function accountCopy(lang: Lang) {
  return lang === 'pt' ? pt : en;
}
