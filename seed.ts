import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Insertando usuarios de prueba...");
  await sql`
    INSERT INTO users (username, name)
    VALUES 
      ('mluukkai', 'Matti Luukkainen'),
      ('juhatau', 'Juha Tauriainen')
    ON CONFLICT (username) DO NOTHING;
  `;
  console.log("¡Usuarios de prueba insertados con éxito!");
}

seed().catch(console.error);
