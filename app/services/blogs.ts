'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from "@/app/db"
import { blogs } from "@/app/db/schema"
import { eq } from 'drizzle-orm'

// 1. Tipado que refleja la tabla de blogs en la base de datos
export interface Blog {
  id: number
  title: string
  author: string
  url: string
  content: string
  likes: number
  userId?: number | null
}

// 2. Obtener todos los blogs de la base de datos
export const getBlogs = async (): Promise<Blog[]> => {
  const allBlogs = await db.select().from(blogs)
  return allBlogs
}

// 3. Obtener los blogs escritos por un usuario específico
export const getBlogsByUserId = async (userId: number) => {
  return await db.select().from(blogs).where(eq(blogs.userId, userId))
}

// 4. Crear un nuevo blog en la base de datos
export async function createBlog(formData: FormData) {
  const title = (formData.get('title') as string) || 'Untitled'
  const author = (formData.get('author') as string) || 'Anonymous'
  const url = (formData.get('url') as string) || ''
  const content = (formData.get('content') as string) || ''

  if (!title.trim() && !content.trim()) {
    return
  }

  // Insertamos en la tabla de Postgres a través de Drizzle
  await db.insert(blogs).values({
    title,
    author,
    url,
    content,
    likes: 0,
    userId: 1,
  })

  revalidatePath('/blogs')
  redirect('/blogs')
}