import type { Lang } from './index';

const en = {
  subject: 'Your SambaPay link',
  heading: 'Log in to SambaPay',
  body: 'The link expires in 15 minutes.',
  cta: 'Log in',
  footer: 'If you did not ask for this email, ignore it.',
};

const pt = {
  subject: 'Seu link da SambaPay',
  heading: 'Entrar na SambaPay',
  body: 'O link expira em 15 minutos.',
  cta: 'Entrar',
  footer: 'Se você não pediu este e-mail, ignore.',
};

export function magicLinkEmailCopy(lang: Lang) {
  return lang === 'pt' ? pt : en;
}
