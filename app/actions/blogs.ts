"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/app/db"
import { blogs, users, readingList } from "@/app/db/schema"
import { eq, and } from "drizzle-orm"

export const createBlog = async (
  prevState: {
    error?: string
    success?: boolean
    values?: { title: string; author: string; url: string; content: string }
  },
  formData: FormData
) => {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const title = String(formData.get("title") || "").trim()
  const author = String(formData.get("author") || "").trim()
  const url = String(formData.get("url") || "").trim()
  const content = String(formData.get("content") || "").trim()

  const values = { title, author, url, content }

  if (title.length < 5) {
    return { error: "Title must be at least 5 characters long", success: false, values }
  }
  if (author.length < 5) {
    return { error: "Author must be at least 5 characters long", success: false, values }
  }
  if (url.length < 5) {
    return { error: "URL must be at least 5 characters long", success: false, values }
  }
  if (content.length < 5) {
    return { error: "Content must be at least 5 characters long", success: false, values }
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!dbUser) {
    redirect("/login")
  }

  const [newBlog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      content,
      userId: dbUser.id,
    })
    .returning()

  if (newBlog) {
    await db.insert(readingList).values({
      userId: dbUser.id,
      blogId: newBlog.id,
    })
  }

  revalidatePath("/blogs")
  revalidatePath("/me")

  return { error: "", success: true, values }
}

export const addToReadingList = async (blogId: number) => {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!dbUser) {
    redirect("/login")
  }

  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, dbUser.id), eq(readingList.blogId, blogId)),
  })

  if (!existing) {
    await db.insert(readingList).values({
      userId: dbUser.id,
      blogId,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markAsRead = async (readingListItemId: number) => {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!dbUser) {
    redirect("/login")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, readingListItemId),
        eq(readingList.userId, dbUser.id)
      )
    )

  revalidatePath("/me")
}