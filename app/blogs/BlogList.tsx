"use client" // 1. Directiva obligatoria para usar estados de React en Next.js

import { useState } from "react"
import Link from "next/link"
import { Blog } from "@/app/services/blogs"

// Definimos que este componente recibe la lista de blogs desde la página del servidor
export default function BlogList({ blogs }: { blogs: Blog[] }) {
  // 2. Estado local: guardamos si filtramos por "populares" (más de 20 likes) o no
  const [showPopular, setShowPopular] = useState(false)

  // 3. Filtrado dinámico según el estado
  const blogsToShow = showPopular
    ? blogs.filter((blog) => blog.likes > 20)
    : blogs

  return (
    <div>
      {/* Botón interactivo que cambia el estado al hacer clic */}
      <button
        onClick={() => setShowPopular(!showPopular)}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      >
        {showPopular ? "Mostrar todos" : "Mostrar populares (>20 likes)"}
      </button>

      {/* Renderizado de la lista filtrada */}
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