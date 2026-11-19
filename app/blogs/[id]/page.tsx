import { db } from "@/app/db"
import { blogs, users, readingList } from "@/app/db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@/auth"
import { addToReadingList } from "@/app/actions/blogs"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import LikeButton from "./LikeButton"

export const instant = false

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blogId = Number(id)

  if (!Number.isInteger(blogId) || blogId <= 0) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#333" }}>
        <h2>Blog no encontrado</h2>
        <Link href="/blogs">← Volver a la lista</Link>
      </div>
    )
  }

  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId),
  })

  if (!blog) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#333" }}>
        <h2>Blog no encontrado</h2>
        <Link href="/blogs">← Volver a la lista</Link>
      </div>
    )
  }

  const currentBlogId = blog.id
  const currentLikes = blog.likes ?? 0
  const session = await auth()
  let isInReadingList = false

  if (session?.user?.email) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.username, session.user.email),
    })

    if (dbUser) {
      const existing = await db.query.readingList.findFirst({
        where: and(
          eq(readingList.userId, dbUser.id),
          eq(readingList.blogId, currentBlogId)
        ),
      })
      isInReadingList = !!existing
    }
  }

  async function incrementBlogLike(targetBlogId: number) {
    "use server"
    const latest = await db.query.blogs.findFirst({
      where: eq(blogs.id, targetBlogId),
    })
    const nextLikes = (latest?.likes ?? 0) + 1

    await db
      .update(blogs)
      .set({ likes: nextLikes })
      .where(eq(blogs.id, targetBlogId))

    revalidatePath(`/blogs/${targetBlogId}`)
    revalidatePath("/blogs")
    return nextLikes
  }

  async function handleAddToReadingList() {
    "use server"
    await addToReadingList(currentBlogId)
    revalidatePath(`/blogs/${currentBlogId}`)
    revalidatePath("/me")
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/blogs" style={{ color: "#0070f3", textDecoration: "none" }}>
        ← Volver a la lista de blogs
      </Link>

      <h1 style={{ marginTop: "20px", fontSize: "2rem" }}>{blog.title}</h1>
      <p style={{ color: "#666", fontSize: "1rem" }}>por {blog.author}</p>

      {blog.url && (
        <p style={{ marginTop: "10px" }}>
          <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3" }}>
            {blog.url}
          </a>
        </p>
      )}

      {/* Sección de Likes y Botón de Lista de Lectura */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "20px 0", padding: "10px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <LikeButton
          blogId={currentBlogId}
          initialLikes={currentLikes}
          onLike={incrementBlogLike}
        />

        {session && (
          isInReadingList ? (
            <span style={{ color: "#16a34a", fontStyle: "italic", fontWeight: "bold" }}>
              ✓ En lista de lectura
            </span>
          ) : (
            <form action={handleAddToReadingList}>
              <button
                type="submit"
                style={{
                  padding: "6px 16px",
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                add to reading list
              </button>
            </form>
          )
        )}
      </div>

      <p style={{ marginTop: "20px", whiteSpace: "pre-wrap", fontSize: "1.1rem", lineHeight: "1.6" }}>
        {blog.content}
      </p>
    </div>
  )
}