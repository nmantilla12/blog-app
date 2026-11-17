import { NextRequest, NextResponse } from "next/server"
import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest) {
  // 1. Obtenemos la cabecera 'Authorization' de la petición
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - Missing or invalid token" }, { status: 401 })
  }

  // 2. Extraemos el token quitando la palabra "Bearer "
  const token = authHeader.replace("Bearer ", "").trim()

  // 3. Buscamos en la base de datos si algún usuario tiene ese token
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: true, // Incluimos también los blogs creados por el usuario, tal como muestra el curso
    },
  })

  // 4. Si el token no coincide con ningún usuario, devolvemos error 401 (Unauthorized)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 })
  }

  // 5. Si todo es correcto, devolvemos los datos del usuario en formato JSON
  return NextResponse.json(user)
}