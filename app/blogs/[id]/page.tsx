import { getBlogById, handleLikeBlog } from "@/app/services/blogs"
import Link from "next/link"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(id)

  if (!blog) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>Blog no encontrado</h2>
        <Link href="/blogs">← Volver a la lista</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Link href="/blogs" style={{ color: "#0070f3", textDecoration: "none" }}>
        ← Volver a la lista de blogs
      </Link>
      
      <h1 style={{ marginTop: "20px" }}>{blog.title}</h1>
      <p><strong>Autor:</strong> {blog.author}</p>
      <p>
        <strong>URL Original:</strong>{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      
      <div style={{ margin: "20px 0", padding: "15px", background: "#f5f5f5", borderRadius: "5px", color: "#333" }}>
        <p><strong>Me gusta actuales:</strong> {blog.likes}</p>
        
        <form action={handleLikeBlog}>
          <input type="hidden" name="id" value={blog.id} />
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
            👍 Dar Me gusta
          </button>
        </form>
      </div>
    </div>
  )
}