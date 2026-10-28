'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface Blog {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Componentes de Servidor en React',
    author: 'Dan Abramov',
    url: 'https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023',
    likes: 12
  },
  {
    id: '2',
    title: 'Primeros pasos con Next.js App Router',
    author: 'Vercel Team',
    url: 'https://nextjs.org/blog/next-13-4',
    likes: 25
  }
]

export const getBlogs = async (): Promise<Blog[]> => {
  return initialBlogs
}

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  return initialBlogs.find((blog) => blog.id === id)
}

export const likeBlog = async (id: string) => {
  const blog = initialBlogs.find((b) => b.id === id)
  if (blog) {
    blog.likes += 1
  }
  return blog
}

export async function createBlog(formData: FormData) {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  if (!title || !author || !url) {
    return
  }

  const newBlog: Blog = {
    id: String(Date.now()),
    title,
    author,
    url,
    likes: 0
  }

  initialBlogs.push(newBlog)

  revalidatePath('/blogs')
  redirect('/blogs')
}

export async function handleLikeBlog(formData: FormData) {
  const id = formData.get('id') as string
  await likeBlog(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}