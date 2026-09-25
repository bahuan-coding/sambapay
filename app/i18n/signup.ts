import type { Lang } from './index';
import { countries } from './countries';

const niches = {
  en: "We do not take our clients' merchants. We do not dispute their accounts. Two niches, no conflict of interest.",
  pt: 'Não pegamos os merchants dos nossos clientes. Não disputamos as contas deles. Dois nichos, sem conflito de interesse.',
};

const en = {
  title: 'Create account',
  h1: 'Create account',
  sub: 'A local merchant, in a geography where we have structure.',
  niches: niches.en,
  step1: 'You',
  step2: 'Company',
  next: 'Continue',
  back: 'Back',
  submit: 'Create account',
  name: 'Full name',
  email: 'Email',
  phone: 'Phone',
  termsBefore: 'I agree to the ',
  termsLink: 'Terms',
  termsMid: ' and the ',
  privacyLink: 'Privacy',
  termsAfter: '.',
  company: 'Company name',
  country: 'Country',
  countryPlaceholder: 'Country',
  website: 'Website',
  websiteOptional: 'Optional',
  successTitle: 'Check your email',
  successBody: 'The link expires in 15 minutes.',
  mailFailed: 'The account is open. The email did not go out. Use Log in in a moment.',
  errors: {
    generic: 'Something went wrong. Try again.',
    emailTaken: 'This email already has an account. Use Log in.',
    required: 'Fill in the required fields.',
    validation: 'Check the fields. The website needs a full address, such as https://example.com.',
  },
  countries: countries.map((c) => ({ code: c.code, label: c.en })),
};

const pt = {
  title: 'Criar conta',
  h1: 'Criar conta',
  sub: 'Merchant local, numa geografia onde temos estrutura.',
  niches: niches.pt,
  step1: 'Você',
  step2: 'Empresa',
  next: 'Continuar',
  back: 'Voltar',
  submit: 'Criar conta',
  name: 'Nome completo',
  email: 'E-mail',
  phone: 'Telefone',
  termsBefore: 'Concordo com os ',
  termsLink: 'Termos',
  termsMid: ' e a ',
  privacyLink: 'Privacidade',
  termsAfter: '.',
  company: 'Nome da empresa',
  country: 'País',
  countryPlaceholder: 'País',
  website: 'Site',
  websiteOptional: 'Opcional',
  successTitle: 'Confira o e-mail',
  successBody: 'O link expira em 15 minutos.',
  mailFailed: 'A conta está aberta. O e-mail não saiu. Use Entrar daqui a pouco.',
  errors: {
    generic: 'Algo falhou. Tente de novo.',
    emailTaken: 'Este e-mail já tem conta. Use Entrar.',
    required: 'Preencha os campos obrigatórios.',
    validation: 'Confira os campos. O site precisa de um endereço completo, como https://exemplo.com.',
  },
  countries: countries.map((c) => ({ code: c.code, label: c.pt })),
};

export function signupCopy(lang: Lang) {
  return lang === 'pt' ? pt : en;
}
