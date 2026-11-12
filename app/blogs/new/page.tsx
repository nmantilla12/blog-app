"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"
import Link from "next/link"

const initialState = {
  error: "",
  values: {
    title: "",
    author: "",
    url: "",
    content: "",
  },
}

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", fontFamily: "sans-serif", color: "#333" }}>
      <p style={{ marginBottom: "1rem" }}>
        <Link href="/blogs" style={{ color: "#0070f3", textDecoration: "none" }}>
          ← Volver a la lista
        </Link>
      </p>

      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.8rem" }}>Create a new blog</h2>

      {state.error && (
        <div style={{ padding: "0.75rem", marginBottom: "1rem", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "4px", border: "1px solid #ef9a9a" }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={state.values?.title}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
            Author
          </label>
          <input
            type="text"
            name="author"
            defaultValue={state.values?.author}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
            URL
          </label>
          <input
            type="text"
            name="url"
            defaultValue={state.values?.url}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
            Content
          </label>
          <textarea
            name="content"
            defaultValue={state.values?.content}
            rows={4}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer", fontWeight: "600", marginTop: "0.5rem" }}
        >
          Crear blog
        </button>
      </form>
    </div>
  )
}