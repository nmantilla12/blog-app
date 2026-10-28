import { getBlogs } from "@/app/services/blogs"
import Link from "next/link"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const filter = resolvedSearchParams.filter || ""

  const blogs = await getBlogs()

  // 1. Filtrar por título si se escribe algo en el buscador (Ejercicio 6: Search)
  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs

  // 2. Ordenar de mayor a menor número de likes (Ejercicio 5: Rendered in order)
  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>Inicio</Link>
        <span>|</span>
        <Link href="/blogs" style={{ marginLeft: "15px", color: "#0070f3" }}>Blogs</Link>
      </div>

      <h1>Blogs</h1>

      {/* Formulario de búsqueda en la URL */}
      <form method="GET" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Buscar por título..."
          style={{ padding: "8px", marginRight: "8px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Buscar
        </button>
      </form>

      {/* Lista de blogs ordenados y filtrados */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedBlogs.map((blog) => (
          <li
            key={blog.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <h2>
              <Link href={`/blogs/${blog.id}`} style={{ color: "#0070f3" }}>
                {blog.title}
              </Link>
            </h2>
            <p><strong>Autor:</strong> {blog.author}</p>
            <p><strong>Me gusta:</strong> {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}