import type { Lang } from './index';

const en = {
  title: 'Log in',
  h1: 'Log in',
  sub: 'We email a link. It expires in 15 minutes.',
  niches: "We do not take our clients' merchants. We do not dispute their accounts. Two niches, no conflict of interest.",
  email: 'Email',
  submit: 'Email me a link',
  successTitle: 'Check your email',
  successBody: 'If this email has an account, the link is on its way. It expires in 15 minutes.',
  create: 'Create account',
  invalidLink: 'This link has expired. Ask for another.',
  mailFailed: 'The email did not go out. Try again.',
  errors: {
    generic: 'Something went wrong. Try again.',
    required: 'Enter the email.',
    invalid: 'Enter a valid email.',
  },
};

const pt = {
  title: 'Entrar',
  h1: 'Entrar',
  sub: 'Enviamos um link por e-mail. Ele expira em 15 minutos.',
  niches: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Dois nichos, sem conflito de interesse.',
  email: 'E-mail',
  submit: 'Receber o link',
  successTitle: 'Confira o e-mail',
  successBody: 'Se este e-mail tem conta, o link está a caminho. Ele expira em 15 minutos.',
  create: 'Criar conta',
  invalidLink: 'Este link expirou. Peça outro.',
  mailFailed: 'O e-mail não saiu. Tente de novo.',
  errors: {
    generic: 'Algo falhou. Tente de novo.',
    required: 'Informe o e-mail.',
    invalid: 'Informe um e-mail válido.',
  },
};

const es = {
  title: 'Entrar',
  h1: 'Entrar',
  sub: 'Enviamos un enlace por correo. Expira en 15 minutos.',
  niches: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. Dos nichos, sin conflicto de interés.',
  email: 'Correo',
  submit: 'Recibir el enlace',
  successTitle: 'Revise su correo',
  successBody: 'Si este correo tiene cuenta, el enlace está en camino. Expira en 15 minutos.',
  create: 'Crear cuenta',
  invalidLink: 'Este enlace expiró. Pida otro.',
  mailFailed: 'El correo no salió. Intente de nuevo.',
  errors: {
    generic: 'Algo falló. Intente de nuevo.',
    required: 'Indique el correo.',
    invalid: 'Indique un correo válido.',
  },
};

const loginCatalog = { en, pt, es };

export function loginCopy(lang: Lang) {
  return loginCatalog[lang];
}
