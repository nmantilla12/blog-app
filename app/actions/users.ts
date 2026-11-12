"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../db"
import { users } from "../db/schema"

export const registerUser = async (formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string

  // Ciframos la contraseña con bcrypt
  const passwordHash = await bcrypt.hash(password, 10)

  // Insertamos el usuario en la base de datos
  await db.insert(users).values({ username, name, passwordHash })

  // Redirigimos al login al terminar
  redirect("/login")
}