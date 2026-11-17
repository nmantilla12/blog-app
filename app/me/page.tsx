import { auth } from "@/auth"
import { db } from "@/app/db"
import { users, readingList } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { generateToken } from "@/app/actions/users"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

async function ProfileContent() {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/login")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email!),
  })

  if (!dbUser) {
    redirect("/login")
  }

  const userReadingList = await db.query.readingList.findMany({
    where: eq(readingList.userId, dbUser.id),
    with: {
      blog: true,
    },
  })

  return (
    <div style={{ border: "1px solid #ddd", padding: "30px", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>My Profile</h1>

      <div style={{ marginBottom: "15px" }}>
        <p style={{ margin: "5px 0" }}><strong>Name:</strong> {dbUser?.name}</p>
        <p style={{ margin: "5px 0" }}><strong>Username:</strong> {dbUser?.username}</p>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ccc", margin: "20px 0" }} />

      <h2 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>Reading List</h2>
      
      {userReadingList.length === 0 ? (
        <p style={{ color: "#666", marginBottom: "20px" }}>Tu lista de lectura está vacía.</p>
      ) : (
        <ul style={{ marginBottom: "25px", paddingLeft: "20px" }}>
          {userReadingList.map((item) => (
            item.blog && (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <Link href={`/blogs/${item.blog.id}`} style={{ color: "#0070f3", textDecoration: "underline", fontSize: "1.1rem" }}>
                  {item.blog.title}
                </Link>
                <span style={{ color: "#666", marginLeft: "8px" }}>by {item.blog.author}</span>
              </li>
            )
          ))}
        </ul>
      )}

      <hr style={{ border: "0", borderTop: "1px solid #ccc", margin: "20px 0" }} />

      <h2 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>API Token</h2>

      <div style={{ marginBottom: "15px" }}>
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "5px" }}>Current token:</p>
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#f5f5f5", 
          border: "1px solid #ddd", 
          borderRadius: "4px", 
          fontFamily: "monospace",
          wordBreak: "break-all" 
        }}>
          {dbUser?.token ? dbUser.token : "No token generated yet."}
        </div>
      </div>

      <form action={generateToken}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Generate New Token
        </button>
      </form>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>Inicio</Link>
        <span>|</span>
        <Link href="/blogs" style={{ margin: "0 15px", color: "#0070f3" }}>Blogs</Link>
        <span>|</span>
        <Link href="/users" style={{ margin: "0 15px", color: "#0070f3" }}>Usuarios</Link>
        <span>|</span>
        <Link href="/me" style={{ marginLeft: "15px", color: "#0070f3", fontWeight: "bold" }}>me</Link>
      </div>

      <Suspense fallback={<p>Cargando perfil...</p>}>
        <ProfileContent />
      </Suspense>
    </div>
  )
}