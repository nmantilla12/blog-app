import { getUserById } from "../../services/users"
import { getBlogsByUserId } from "../../services/blogs"
import { Suspense } from "react"

interface Props {
  params: Promise<{ id: string }>
}

const UserContent = async ({ params }: Props) => {
  const { id } = await params
  const userId = Number(id)

  // Consultamos el usuario y sus blogs en paralelo desde la base de datos
  const [user, userBlogs] = await Promise.all([
    getUserById(userId),
    getBlogsByUserId(userId),
  ])

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h3>Blogs creados</h3>
      {userBlogs.length === 0 ? (
        <p>Este usuario no tiene blogs creados aún.</p>
      ) : (
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id} style={{ marginBottom: "8px" }}>
              {blog.content}{" "}
              {blog.important && (
                <strong style={{ color: "red" }}>(Importante)</strong>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const UserPage = (props: Props) => {
  return (
    <div style={{ padding: "20px" }}>
      <Suspense fallback={<div>Cargando perfil...</div>}>
        <UserContent {...props} />
      </Suspense>
    </div>
  )
}

export default UserPage