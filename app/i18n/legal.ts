import type { Lang } from './index';

/**
 * Privacy and terms in plain language, one idea per sentence. The text states
 * what the product actually does: magic-link sign-in, documents held to open a
 * merchant account, data used for onboarding and compliance. It is a baseline
 * a lawyer must review before launch; it invents no certification.
 */
const en = {
  privacy: {
    title: 'Privacy',
    updated: 'Last updated: September 2026',
    intro: 'SambaPay opens business accounts for payments across South and Central America. This policy says what we collect, why, and what you can ask us to do.',
    sections: [
      { h: 'What we collect', p: 'Account data: your name, work email, phone and company. Business data: the tax identifier, the owners, the addresses and the documents you send. Usage data: the pages you open and the device you use.' },
      { h: 'Why we collect it', p: 'To open and keep your account, to run the checks the law requires before a company collects money, to contact you about the account, and to keep the service safe. We do not sell your data.' },
      { h: 'The documents you send', p: 'Company and owner documents are stored to prove the checks were done. They are kept private, seen only by the people who must review them, and kept only as long as the law requires.' },
      { h: 'Who sees it', p: 'Our team, and the local partners and regulators when the checks or the law demand it. Every partner is bound to keep it confidential.' },
      { h: 'Your rights', p: 'You can ask to see, correct, export or delete your data, and you can withdraw consent where consent is the basis. Write to privacy@sambapay.tech and we answer.' },
      { h: 'Cookies', p: 'We use one cookie to keep you signed in. It is not an advertising cookie.' },
    ],
  },
  terms: {
    title: 'Terms',
    updated: 'Last updated: September 2026',
    intro: 'These terms govern the SambaPay website and the application you send to open a business account. By creating an account, you accept them.',
    sections: [
      { h: 'Eligibility', p: 'You must be at least 18 and authorised to act for the company you register. You must give true, complete and current information.' },
      { h: 'Your account', p: 'We open an account after our checks. The account may start in review and collecting starts only after approval. We may decline an application, and we say why when we can.' },
      { h: 'What you may not do', p: 'Do not use the service for anything unlawful, to move money that is not yours, or to misrepresent a company or an owner. Do not upload documents that are false or belong to someone else.' },
      { h: 'Documents and accuracy', p: 'You keep the truth of everything you send. A false document or a false statement ends the account and may be reported, as the law requires.' },
      { h: 'Fees and settlement', p: 'Fees, settlement times and currencies are shown before you collect. They are stated per market, in the local policy. Nothing is charged before a book ties.' },
      { h: 'Liability', p: 'The service is offered as it is. We are not liable for losses that come from facts you did not tell us or from misuse of your sign-in link.' },
      { h: 'Changes', p: 'We may update these terms. A material change is told to you before it takes effect.' },
      { h: 'Contact', p: 'Questions go to legal@sambapay.tech.' },
    ],
  },
};

type Copy = typeof en;

const pt: Copy = {
  privacy: {
    title: 'Privacidade',
    updated: 'Última atualização: setembro de 2026',
    intro: 'A SambaPay abre contas empresariais para pagamentos na América do Sul e Central. Esta política diz o que coletamos, por quê, e o que você pode pedir.',
    sections: [
      { h: 'O que coletamos', p: 'Dados da conta: seu nome, e-mail corporativo, telefone e empresa. Dados da empresa: o documento fiscal, os sócios, os endereços e os documentos que você envia. Dados de uso: as páginas que você abre e o aparelho que usa.' },
      { h: 'Por que coletamos', p: 'Para abrir e manter a sua conta, para fazer as verificações que a lei exige antes de uma empresa cobrar, para falar com você sobre a conta e para manter o serviço seguro. Não vendemos os seus dados.' },
      { h: 'Os documentos que você envia', p: 'Os documentos da empresa e dos sócios são guardados para provar que as verificações foram feitas. Ficam privados, vistos só por quem precisa revisá-los, e ficam apenas pelo tempo que a lei exige.' },
      { h: 'Quem vê', p: 'A nossa equipe, e os parceiros e reguladores locais quando as verificações ou a lei exigem. Todo parceiro é obrigado a manter sigilo.' },
      { h: 'Seus direitos', p: 'Você pode pedir para ver, corrigir, exportar ou apagar os seus dados, e pode retirar o consentimento onde o consentimento é a base. Escreva para privacy@sambapay.tech e nós respondemos.' },
      { h: 'Cookies', p: 'Usamos um cookie para manter você conectado. Não é um cookie de publicidade.' },
    ],
  },
  terms: {
    title: 'Termos',
    updated: 'Última atualização: setembro de 2026',
    intro: 'Estes termos regem o site da SambaPay e a candidatura que você envia para abrir uma conta empresarial. Ao criar uma conta, você os aceita.',
    sections: [
      { h: 'Elegibilidade', p: 'Você precisa ter ao menos 18 anos e ter autoridade para agir pela empresa que registra. Você deve dar informações verdadeiras, completas e atuais.' },
      { h: 'A sua conta', p: 'Abrimos a conta depois das nossas verificações. A conta pode começar em análise e a cobrança só começa após a aprovação. Podemos recusar uma candidatura, e dizemos o motivo quando podemos.' },
      { h: 'O que você não pode fazer', p: 'Não use o serviço para nada ilegal, para movimentar dinheiro que não é seu, nem para deturpar uma empresa ou um sócio. Não envie documentos falsos nem de outra pessoa.' },
      { h: 'Documentos e veracidade', p: 'Você responde pela verdade de tudo o que envia. Um documento falso ou uma declaração falsa encerra a conta e pode ser reportado, como a lei exige.' },
      { h: 'Taxas e liquidação', p: 'As taxas, os prazos de liquidação e as moedas são mostrados antes de você cobrar. São declarados por mercado, na política local. Nada é cobrado antes de o livro fechar.' },
      { h: 'Responsabilidade', p: 'O serviço é oferecido como está. Não respondemos por perdas que venham de fatos que você não nos contou ou do uso indevido do seu link de acesso.' },
      { h: 'Mudanças', p: 'Podemos atualizar estes termos. Uma mudança relevante é avisada antes de valer.' },
      { h: 'Contato', p: 'Dúvidas vão para legal@sambapay.tech.' },
    ],
  },
};

const es: Copy = {
  privacy: {
    title: 'Privacidad',
    updated: 'Última actualización: septiembre de 2026',
    intro: 'SambaPay abre cuentas empresariales para pagos en América del Sur y Central. Esta política dice qué recogemos, por qué, y qué puedes pedirnos.',
    sections: [
      { h: 'Qué recogemos', p: 'Datos de la cuenta: tu nombre, correo corporativo, teléfono y empresa. Datos de la empresa: el documento fiscal, los socios, las direcciones y los documentos que envías. Datos de uso: las páginas que abres y el dispositivo que usas.' },
      { h: 'Por qué lo recogemos', p: 'Para abrir y mantener tu cuenta, para hacer las verificaciones que la ley exige antes de que una empresa cobre, para hablar contigo sobre la cuenta y para mantener el servicio seguro. No vendemos tus datos.' },
      { h: 'Los documentos que envías', p: 'Los documentos de la empresa y de los socios se guardan para probar que las verificaciones se hicieron. Son privados, los ve solo quien debe revisarlos, y se guardan solo el tiempo que la ley exige.' },
      { h: 'Quién los ve', p: 'Nuestro equipo, y los socios y reguladores locales cuando las verificaciones o la ley lo exigen. Todo socio está obligado a guardar confidencialidad.' },
      { h: 'Tus derechos', p: 'Puedes pedir ver, corregir, exportar o borrar tus datos, y puedes retirar el consentimiento donde el consentimiento es la base. Escribe a privacy@sambapay.tech y respondemos.' },
      { h: 'Cookies', p: 'Usamos una cookie para mantenerte conectado. No es una cookie de publicidad.' },
    ],
  },
  terms: {
    title: 'Términos',
    updated: 'Última actualización: septiembre de 2026',
    intro: 'Estos términos rigen el sitio de SambaPay y la solicitud que envías para abrir una cuenta empresarial. Al crear una cuenta, los aceptas.',
    sections: [
      { h: 'Elegibilidad', p: 'Debes tener al menos 18 años y autoridad para actuar por la empresa que registras. Debes dar información veraz, completa y actual.' },
      { h: 'Tu cuenta', p: 'Abrimos la cuenta tras nuestras verificaciones. La cuenta puede empezar en revisión y la cobranza empieza solo tras la aprobación. Podemos rechazar una solicitud, y decimos por qué cuando podemos.' },
      { h: 'Lo que no puedes hacer', p: 'No uses el servicio para nada ilegal, para mover dinero que no es tuyo, ni para falsear una empresa o un socio. No subas documentos falsos ni de otra persona.' },
      { h: 'Documentos y veracidad', p: 'Respondes por la verdad de todo lo que envías. Un documento falso o una declaración falsa termina la cuenta y puede reportarse, como exige la ley.' },
      { h: 'Tarifas y liquidación', p: 'Las tarifas, los plazos de liquidación y las monedas se muestran antes de que cobres. Se declaran por mercado, en la política local. Nada se cobra antes de que el libro cuadre.' },
      { h: 'Responsabilidad', p: 'El servicio se ofrece tal como está. No respondemos por pérdidas que vengan de hechos que no nos contaste o del uso indebido de tu enlace de acceso.' },
      { h: 'Cambios', p: 'Podemos actualizar estos términos. Un cambio relevante se avisa antes de entrar en vigor.' },
      { h: 'Contacto', p: 'Las dudas van a legal@sambapay.tech.' },
    ],
  },
};

const catalog = { en, pt, es };

export function legalCopy(lang: Lang): Copy {
  return catalog[lang];
}
