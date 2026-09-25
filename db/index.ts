import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Db = NeonHttpDatabase<typeof schema>;

function databaseUrl(): string {
  const url = process.env.DATABASE_URL ?? import.meta.env.DATABASE_URL;
  if (!url) throw new Error('Missing environment variable: DATABASE_URL');
  return url;
}

let dbInstance: Db | undefined;

function getDb(): Db {
  if (!dbInstance) {
    const sql = neon(databaseUrl());
    dbInstance = drizzle({ client: sql, schema });
  }
  return dbInstance;
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, instance);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});
