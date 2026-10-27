import { notFound } from "next/navigation"
import { getBlogById, handleLikeBlog } from "@/app/services/blogs"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params
  const blog = await getBlogById(id)

  if (!blog) {
    notFound()
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>{blog.title}</h2>
      <p>
        <strong>Autor:</strong> {blog.author}
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        <strong>Me gusta:</strong> {blog.likes}
      </p>

      <form action={handleLikeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          👍 Dar Me gusta
        </button>
      </form>
    </div>
  )
}