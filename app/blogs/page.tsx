import { getBlogs } from "@/app/services/blogs"
import Link from "next/link"
import { Suspense } from "react"

async function BlogsContent({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const filter = resolvedSearchParams.filter || ""

  const blogs = await getBlogs()

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.content.toLowerCase().includes(filter.toLowerCase()) ||
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs

  return (
    <>
      <form method="GET" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="filter"
          data-testid="filter-input"
          defaultValue={filter}
          placeholder="Buscar en el contenido..."
          style={{ padding: "8px", marginRight: "8px", width: "250px" }}
        />
        <button
          type="submit"
          data-testid="search-button"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Buscar
        </button>
      </form>

      <ul data-testid="blogs-list" style={{ listStyle: "none", padding: 0 }}>
        {filteredBlogs.map((blog) => (
          <li
            key={blog.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <Link href={`/blogs/${blog.id}`} style={{ color: "inherit", textDecoration: "none" }}>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px", color: "#0070f3" }}>
                {blog.title}
              </p>
              <p style={{ marginBottom: "5px" }}><strong>Contenido:</strong> "{blog.content}"</p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                <strong>Autor:</strong> {blog.author} · {blog.likes ?? 0} likes
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>Inicio</Link>
        <span>|</span>
        <Link href="/blogs" style={{ margin: "0 15px", color: "#0070f3" }}>Blogs</Link>
        <span>|</span>
        <Link href="/blogs/new" style={{ marginLeft: "15px", color: "#0070f3", fontWeight: "bold" }}>+ Crear nuevo</Link>
      </div>

      <h1>Lista de Notas / Blogs</h1>

      <Suspense fallback={<p>Cargando notas y filtros...</p>}>
        <BlogsContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
