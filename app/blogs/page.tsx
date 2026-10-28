import { getBlogs } from "@/app/services/blogs"
import Link from "next/link"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ popular?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const isPopular = resolvedSearchParams.popular === "true"

  const blogs = await getBlogs()

  const blogsToShow = isPopular
    ? blogs.filter((blog) => blog.likes > 20)
    : blogs

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>Inicio</Link>
        <span>|</span>
        <Link href="/blogs" style={{ marginLeft: "15px", color: "#0070f3" }}>Blogs</Link>
      </div>

      <h1>Blogs</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link
          href={isPopular ? "/blogs" : "/blogs?popular=true"}
          style={{
            padding: "8px 12px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          {isPopular ? "Mostrar todos" : "Mostrar populares (>20 likes)"}
        </Link>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogsToShow.map((blog) => (
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
