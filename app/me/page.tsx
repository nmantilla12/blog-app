import { auth } from "@/auth"
import { db } from "@/app/db"
import { users, readingList } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { generateToken } from "@/app/actions/users"
import { markAsRead } from "@/app/actions/blogs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

async function ProfileContent() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
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

  const unreadItems = userReadingList.filter((item) => !item.read && item.blog)
  const readItems = userReadingList.filter((item) => item.read && item.blog)

  return (
    <div
      data-testid="user-profile"
      style={{
        border: "1px solid #ddd",
        padding: "30px",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>My Profile</h1>

      <div style={{ marginBottom: "15px" }}>
        <p data-testid="user-name" style={{ margin: "5px 0" }}>
          <strong>Name:</strong> {dbUser.name}
        </p>
        <p data-testid="user-username" style={{ margin: "5px 0" }}>
          <strong>Username:</strong> {dbUser.username}
        </p>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ccc", margin: "20px 0" }} />

      <div data-testid="reading-list-section">
        <h2 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>Reading List</h2>

        {userReadingList.length === 0 && (
          <p data-testid="empty-reading-list" style={{ color: "#666", marginBottom: "15px" }}>
            Your reading list is empty.
          </p>
        )}

        <div data-testid="unread-section">
          <h3 style={{ fontSize: "1.2rem", color: "#333", marginTop: "15px" }}>
            Unread ({unreadItems.length})
          </h3>
          {unreadItems.length === 0 ? (
            <p data-testid="no-unread-blogs" style={{ color: "#666", marginBottom: "15px" }}>
              No hay blogs pendientes en tu lista de lectura.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {unreadItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#fef9c3",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border: "1px solid #fde047",
                  }}
                >
                  <Link
                    href={`/blogs/${item.blog!.id}`}
                    style={{
                      color: "#0070f3",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.blog!.title}
                  </Link>
                  <form action={markAsRead.bind(null, item.id)}>
                    <button
                      type="submit"
                      data-testid={`mark-read-${item.id}`}
                      style={{
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      mark as read
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        <h3 style={{ fontSize: "1.2rem", color: "#333", marginTop: "25px" }}>
          Read ({readItems.length})
        </h3>
        {readItems.length === 0 ? (
          <p style={{ color: "#666", marginBottom: "20px" }}>
            No hay blogs marcados como leídos todavía.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            {readItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#dcfce7",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  border: "1px solid #bbf7d0",
                }}
              >
                <Link
                  href={`/blogs/${item.blog!.id}`}
                  style={{
                    color: "#166534",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                  }}
                >
                  {item.blog!.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ccc", margin: "20px 0" }} />

      <div data-testid="api-token-section">
        <h2 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>API Token</h2>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "5px" }}>
            Current token:
          </p>
          {dbUser.token ? (
            <div
              data-testid="token-display"
              style={{
                padding: "10px",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              <code data-testid="api-token">{dbUser.token}</code>
            </div>
          ) : (
            <p
              data-testid="no-token-message"
              style={{
                padding: "10px",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "4px",
                color: "#666",
              }}
            >
              No token generated yet.
            </p>
          )}
        </div>

        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
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
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ marginRight: "15px", color: "#0070f3" }}>
          Inicio
        </Link>
        <span>|</span>
        <Link href="/blogs" style={{ margin: "0 15px", color: "#0070f3" }}>
          Blogs
        </Link>
        <span>|</span>
        <Link href="/users" style={{ margin: "0 15px", color: "#0070f3" }}>
          Usuarios
        </Link>
        <span>|</span>
        <Link
          href="/me"
          style={{ marginLeft: "15px", color: "#0070f3", fontWeight: "bold" }}
        >
          me
        </Link>
      </div>

      <Suspense fallback={<p>Cargando perfil...</p>}>
        <ProfileContent />
      </Suspense>
    </div>
  )
}
