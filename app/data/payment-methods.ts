import type { Lang } from '../i18n';

/**
 * The official payment methods we carry, each with the logo served from
 * /public/methods and the category it belongs to. Cards first, then the
 * local rails. Labels carry EN / PT / ES.
 */
export type MethodCategory = 'card' | 'instant' | 'transfer' | 'cash' | 'wallet' | 'qr';

export interface PaymentMethod {
  /** Stable key. */
  key: string;
  /** File inside /public/methods, without the extension. */
  logo: string;
  /** True when the asset is an SVG. */
  svg?: boolean;
  category: MethodCategory;
  label: [string, string, string];
}

export const categoryLabels: Record<MethodCategory, [string, string, string]> = {
  card: ['Cards', 'Cartões', 'Tarjetas'],
  instant: ['Instant payment', 'Pagamento instantâneo', 'Pago instantáneo'],
  transfer: ['Bank transfer', 'Transferência bancária', 'Transferencia bancaria'],
  cash: ['Cash', 'Dinheiro', 'Efectivo'],
  wallet: ['Wallet', 'Carteira', 'Billetera'],
  qr: ['QR', 'QR', 'QR'],
};

/** Every method, keyed by its stable key. */
export const methods = {
  // Card brands
  visa: { logo: 'card-visa', category: 'card', label: ['Visa', 'Visa', 'Visa'] },
  mastercard: { logo: 'card-mastercard', category: 'card', label: ['Mastercard', 'Mastercard', 'Mastercard'] },
  amex: { logo: 'card-amex', category: 'card', label: ['American Express', 'American Express', 'American Express'] },
  diners: { logo: 'card-diners', category: 'card', label: ['Diners Club', 'Diners Club', 'Diners Club'] },
  elo: { logo: 'card-elo', svg: true, category: 'card', label: ['Elo', 'Elo', 'Elo'] },
  hipercard: { logo: 'card-hipercard', category: 'card', label: ['Hipercard', 'Hipercard', 'Hipercard'] },
  redcompra: { logo: 'card-redcompra', category: 'card', label: ['Redcompra', 'Redcompra', 'Redcompra'] },
  webpay: { logo: 'card-webpay', category: 'card', label: ['Webpay', 'Webpay', 'Webpay'] },
  magna: { logo: 'card-magna', category: 'card', label: ['Magna', 'Magna', 'Magna'] },
  // Instant payments
  pix: { logo: 'pix', category: 'instant', label: ['Pix', 'Pix', 'Pix'] },
  spei: { logo: 'spei', category: 'instant', label: ['SPEI', 'SPEI', 'SPEI'] },
  pse: { logo: 'bank-pse', svg: true, category: 'instant', label: ['PSE', 'PSE', 'PSE'] },
  // Cash vouchers and networks
  boleto: { logo: 'boleto', svg: true, category: 'cash', label: ['Boleto', 'Boleto', 'Boleto'] },
  oxxo: { logo: 'oxxo', category: 'cash', label: ['OXXO', 'OXXO', 'OXXO'] },
  pagofacil: { logo: 'pago-facil', category: 'cash', label: ['Pago Fácil', 'Pago Fácil', 'Pago Fácil'] },
  pago24: { logo: 'cash-pago24', category: 'cash', label: ['Pago24', 'Pago24', 'Pago24'] },
  pagoefectivo: { logo: 'cash-pagoefectivo', category: 'cash', label: ['PagoEfectivo', 'PagoEfectivo', 'PagoEfectivo'] },
  tambo: { logo: 'cash-tambo', category: 'cash', label: ['Tambo', 'Tambo', 'Tambo'] },
  kasnet: { logo: 'cash-kasnet', category: 'cash', label: ['KasNet', 'KasNet', 'KasNet'] },
  pagaya: { logo: 'cash-pagaya', category: 'cash', label: ['PagoYa', 'PagoYa', 'PagoYa'] },
  westernunion: { logo: 'cash-westernunion', category: 'cash', label: ['Western Union', 'Western Union', 'Western Union'] },
  // Wallets
  yape: { logo: 'wallet-yape', category: 'wallet', label: ['Yape', 'Yape', 'Yape'] },
  plin: { logo: 'wallet-plin', category: 'wallet', label: ['Plin', 'Plin', 'Plin'] },
  mercadopago: { logo: 'wallet-mercadopago', category: 'wallet', label: ['Mercado Pago', 'Mercado Pago', 'Mercado Pago'] },
  mach: { logo: 'wallet-mach', category: 'wallet', label: ['MACH', 'MACH', 'MACH'] },
  modo: { logo: 'wallet-modo', category: 'wallet', label: ['MODO', 'MODO', 'MODO'] },
  dale: { logo: 'wallet-dale', category: 'wallet', label: ['Dale', 'Dale', 'Dale'] },
  // Bank transfer partners
  bcp: { logo: 'bank-bcp', category: 'transfer', label: ['BCP', 'BCP', 'BCP'] },
  bbva: { logo: 'bank-bbva', category: 'transfer', label: ['BBVA', 'BBVA', 'BBVA'] },
  interbank: { logo: 'bank-interbank', category: 'transfer', label: ['Interbank', 'Interbank', 'Interbank'] },
  scotiabank: { logo: 'bank-scotiabank', category: 'transfer', label: ['Scotiabank', 'Scotiabank', 'Scotiabank'] },
  bancoestado: { logo: 'bank-bancoestado', category: 'transfer', label: ['BancoEstado', 'BancoEstado', 'BancoEstado'] },
  bci: { logo: 'bank-bci', category: 'transfer', label: ['BCI', 'BCI', 'BCI'] },
  guayaquil: { logo: 'bank-guayaquil', category: 'transfer', label: ['Banco Guayaquil', 'Banco Guayaquil', 'Banco Guayaquil'] },
} satisfies Record<string, PaymentMethod>;

export type MethodKey = keyof typeof methods;

/** Group a list of keys by category, preserving order. */
export function groupMethods(keys: MethodKey[]) {
  const order: MethodCategory[] = ['card', 'instant', 'transfer', 'cash', 'wallet', 'qr'];
  const buckets = new Map<MethodCategory, MethodKey[]>();
  for (const key of keys) {
    const cat = methods[key].category;
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat)!.push(key);
  }
  return order
    .filter((cat) => buckets.has(cat))
    .map((cat) => ({ category: cat, keys: buckets.get(cat)! }));
}

export function methodLabel(key: MethodKey, lang: Lang): string {
  return methods[key].label[lang === 'pt' ? 1 : lang === 'es' ? 2 : 0];
}

export function categoryLabel(category: MethodCategory, lang: Lang): string {
  return categoryLabels[category][lang === 'pt' ? 1 : lang === 'es' ? 2 : 0];
}
