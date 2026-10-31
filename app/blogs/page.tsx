import { getBlogs } from "@/app/services/blogs"
import Link from "next/link"
import { Suspense } from "react"

// Componente interno que maneja los datos y los searchParams
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
        blog.content.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs

  return (
    <>
      {/* Formulario de búsqueda en la URL */}
      <form method="GET" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Buscar en el contenido..."
          style={{ padding: "8px", marginRight: "8px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Buscar
        </button>
      </form>

      {/* Lista de notas desde la base de datos */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredBlogs.map((blog) => (
          <li
            key={blog.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <Link href={`/blogs/${blog.id}`} style={{ color: "inherit", textDecoration: "none" }}>
              <p><strong>Contenido:</strong> {blog.content}</p>
              <p><strong>Importante:</strong> {blog.important ? "Sí" : "No"}</p>
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
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>Inicio</Link>
        <span>|</span>
        <Link href="/blogs" style={{ margin: "0 15px", color: "#0070f3" }}>Blogs</Link>
        <span>|</span>
        <Link href="/blogs/new" style={{ marginLeft: "15px", color: "#0070f3", fontWeight: "bold" }}>+ Crear nuevo</Link>
      </div>

      <h1>Lista de Notas / Blogs</h1>

      {/* Envolvemos el componente con Suspense para satisfacer el requisito de Next.js */}
      <Suspense fallback={<p>Cargando notas y filtros...</p>}>
        <BlogsContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}