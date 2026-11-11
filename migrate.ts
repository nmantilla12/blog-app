import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log('Verificando conexión con Neon...');
  
  // Creamos las tablas ejecutando SQL directamente de forma segura
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      important BOOLEAN NOT NULL DEFAULT FALSE,
      user_id INTEGER REFERENCES users(id)
    );
  `;

  console.log('¡Tablas "users" y "blogs" creadas con éxito en Neon!');
}

main().catch((err) => {
  console.error('Error al migrar:', err);
  process.exit(1);
});