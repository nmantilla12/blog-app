"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/app/db"
import { blogs, users } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export const createBlog = async (
  prevState: { 
    error?: string; 
    values?: { title: string; author: string; url: string; content: string } 
  },
  formData: FormData
) => {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  // 1. Extraemos los valores del formulario
  const title = String(formData.get("title") || "").trim()
  const author = String(formData.get("author") || "").trim()
  const url = String(formData.get("url") || "").trim()
  const content = String(formData.get("content") || "").trim()

  const values = { title, author, url, content }

  // 2. Validaciones independientes
  if (title.length < 5) {
    return { error: "Title must be at least 5 characters long", values }
  }
  if (author.length < 5) {
    return { error: "Author must be at least 5 characters long", values }
  }
  if (url.length < 5) {
    return { error: "URL must be at least 5 characters long", values }
  }
  if (content.length < 5) {
    return { error: "Content must be at least 5 characters long", values }
  }

  // 3. Buscamos el usuario en la base de datos
  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!dbUser) {
    redirect("/login")
  }

  // 4. Insertamos el blog en la base de datos
  await db.insert(blogs).values({
    title,
    author,
    url,
    content,
    userId: dbUser.id,
  })

  revalidatePath("/blogs")
  redirect("/blogs")
}