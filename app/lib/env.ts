export function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name] ?? import.meta.env[name];
  return value && String(value).length > 0 ? String(value) : undefined;
}

export function getAppUrl(): string {
  const value = getOptionalEnv('APP_URL') ?? 'https://sambapay.tech';
  return value.replace(/\/$/, '');
}
