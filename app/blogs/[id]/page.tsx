import { getBlogById, toggleBlogImportance } from "@/app/services/blogs"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#fff" }}>
        <h2>Blog no encontrado</h2>
        <Link href="/blogs">← Volver a la lista</Link>
      </div>
    )
  }

  const blogId = blog.id

  async function handleToggle() {
    'use server'
    await toggleBlogImportance(blogId)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#fff" }}>
      <Link href="/blogs" style={{ color: "#61dafb", textDecoration: "none" }}>
        ← Volver a la lista de blogs
      </Link>
      
      <p style={{ marginTop: "20px", whiteSpace: "pre-wrap", fontSize: "1.2rem" }}>
        {blog.content}
      </p>
      
      <div style={{ margin: "20px 0", padding: "15px", background: "#1e1e1e", border: "1px solid #444", borderRadius: "5px" }}>
        <p><strong>Estado:</strong> {blog.important ? '⭐ Importante' : 'Normal'}</p>
        
        <form action={handleToggle}>
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Cambiar importancia
          </button>
        </form>
      </div>
    </div>
  )
}