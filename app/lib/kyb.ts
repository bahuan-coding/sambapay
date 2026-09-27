import { getOptionalEnv } from './env';

/**
 * Automatic company lookup from the tax identifier, to spare the user from
 * typing what the registry already knows. Brazil runs on public endpoints with
 * no key. The other markets run when a provider key is present; without one the
 * lookup returns null and the form stays manual, never broken.
 */
export interface CompanyProfile {
  legalName?: string;
  tradeName?: string;
  registrationNumber?: string;
  registrationDate?: string;
  addressStreet?: string;
  addressNumber?: string;
  addressComplement?: string;
  addressNeighborhood?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
  addressCountry?: string;
  industry?: string;
  legalStructure?: string;
  status?: string;
  source: string;
}

const TIMEOUT = 8000;

async function fetchJson(url: string, init?: RequestInit): Promise<any | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal, headers: { 'Accept': 'application/json', ...(init?.headers ?? {}) } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function digits(value: string): string {
  return value.replace(/\D/g, '');
}

/** Brazil — BrasilAPI first, then ReceitaWS. No key needed. */
async function lookupBR(document: string): Promise<CompanyProfile | null> {
  const cnpj = digits(document);
  if (cnpj.length !== 14) return null;

  const brasil = await fetchJson(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
  if (brasil && !brasil.message) {
    return {
      legalName: brasil.razao_social,
      tradeName: brasil.nome_fantasia || undefined,
      registrationNumber: cnpj,
      registrationDate: brasil.data_inicio_atividade,
      addressStreet: brasil.logradouro,
      addressNumber: brasil.numero,
      addressComplement: brasil.complemento || undefined,
      addressNeighborhood: brasil.bairro,
      addressCity: brasil.municipio,
      addressState: brasil.uf,
      addressZip: brasil.cep ? digits(brasil.cep) : undefined,
      addressCountry: 'BR',
      industry: brasil.cnae_fiscal_descricao,
      legalStructure: brasil.descricao_situacao_cadastral || brasil.natureza_juridica,
      status: brasil.descricao_situacao_cadastral,
      source: 'brasilapi',
    };
  }

  const receita = await fetchJson(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
  if (receita && receita.status !== 'ERROR' && receita.nome) {
    return {
      legalName: receita.nome,
      tradeName: receita.fantasia || undefined,
      registrationNumber: cnpj,
      registrationDate: receita.abertura,
      addressStreet: receita.logradouro,
      addressNumber: receita.numero,
      addressComplement: receita.complemento || undefined,
      addressNeighborhood: receita.bairro,
      addressCity: receita.municipio,
      addressState: receita.uf,
      addressZip: receita.cep ? digits(receita.cep) : undefined,
      addressCountry: 'BR',
      industry: receita.atividade_principal?.[0]?.text,
      legalStructure: receita.natureza_juridica,
      status: receita.situacao,
      source: 'receitaws',
    };
  }

  return null;
}

/** Peru — SUNAT RUC lookup via a configured provider key. */
async function lookupPE(document: string): Promise<CompanyProfile | null> {
  const token = getOptionalEnv('SUNAT_API_KEY');
  const ruc = digits(document);
  if (!token || ruc.length !== 11) return null;
  const data = await fetchJson(`https://api.apis.net.pe/v2/sunat/ruc?numero=${ruc}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!data?.razonSocial) return null;
  return {
    legalName: data.razonSocial,
    tradeName: data.nombreComercial || undefined,
    registrationNumber: ruc,
    addressStreet: data.direccion,
    addressCity: data.distrito,
    addressState: data.provincia,
    addressCountry: 'PE',
    industry: data.actividadEconomica,
    status: data.estado,
    source: 'sunat',
  };
}

/** Chile — SII lookup via a configured provider key. */
async function lookupCL(document: string): Promise<CompanyProfile | null> {
  const token = getOptionalEnv('SII_API_KEY');
  const rut = digits(document);
  if (!token || rut.length < 8) return null;
  const data = await fetchJson(`https://api.apis.net.pe/v2/chile/ruc?numero=${rut}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!data?.razonSocial) return null;
  return {
    legalName: data.razonSocial,
    registrationNumber: rut,
    addressCity: data.comuna,
    addressCountry: 'CL',
    industry: data.giro,
    source: 'sii',
  };
}

const providers: Record<string, (doc: string) => Promise<CompanyProfile | null>> = {
  BR: lookupBR,
  PE: lookupPE,
  CL: lookupCL,
};

export async function lookupCompany(country: string, document: string): Promise<CompanyProfile | null> {
  const fn = providers[country.toUpperCase()];
  if (!fn) return null;
  return fn(document);
}
