'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/app/db'
import { notes } from '@/app/db/schema'

// 1. Tipado que refleja la tabla de la base de datos
export interface Note {
  id: number
  content: string
  important: boolean
}

// 2. Obtener todas las notas de la base de datos
export const getBlogs = async (): Promise<Note[]> => {
  const allNotes = await db.select().from(notes)
  return allNotes
}

// 3. Crear una nueva nota en la base de datos
export async function createBlog(formData: FormData) {
  const content = formData.get('content') as string
  const important = formData.get('important') === 'true'

  if (!content) {
    return
  }

  // Insertamos en la tabla de Postgres a través de Drizzle
  await db.insert(notes).values({
    content,
    important,
  })

  // Revalidamos la ruta para que Next.js actualice la lista y redirigimos
  revalidatePath('/blogs')
  redirect('/blogs')
}