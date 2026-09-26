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

const es = {
  subject: 'Su enlace de SambaPay',
  heading: 'Entrar en SambaPay',
  body: 'El enlace expira en 15 minutos.',
  cta: 'Entrar',
  footer: 'Si usted no pidió este correo, ignórelo.',
};

const mailCatalog = { en, pt, es };

export function magicLinkEmailCopy(lang: Lang) {
  return mailCatalog[lang];
}
