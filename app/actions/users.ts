"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export const registerUser = async (
  prevState: { error?: string; values?: { username: string; name: string } },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = (formData.get("password") as string) || ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

  const values = { username, name }

  // 1. Validar que el username tenga al menos 4 caracteres
  if (username.length < 4) {
    return { error: "Username must be at least 4 characters long", values }
  }

  // 2. Validar que el password tenga al menos 4 caracteres
  if (password.length < 4) {
    return { error: "Password must be at least 4 characters long", values }
  }

  // 3. Validar que password y passwordConfirm coincidan
  if (password !== passwordConfirm) {
    return { error: "Passwords do not match", values }
  }

  // 4. Verificar si el usuario ya existe en la base de datos
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    return { error: "Username already taken", values }
  }

  // Ciframos la contraseña con bcrypt
  const passwordHash = await bcrypt.hash(password, 10)

  // Insertamos el usuario en la base de datos
  await db.insert(users).values({ 
    username, 
    name, 
    passwordHash 
  })

  // Redirigimos al login al terminar
  redirect("/login")
}