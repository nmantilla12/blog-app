import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import Link from "next/link"
import { Suspense } from "react"

// Componente interno que carga los datos de los usuarios
async function UsersList() {
  const allUsers = await db.select().from(users)

  return (
    <>
      {allUsers.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados todavía.</p>
      ) : (
        <ul className="space-y-4">
          {allUsers.map((user) => (
            <li key={user.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white">
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-gray-500 text-sm">@{user.username}</p>
              </div>
              <Link
                href={`/users/${user.username}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Ver perfil →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default function UsersPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <div className="mb-6 flex gap-4 text-blue-600">
        <Link href="/">Inicio</Link>
        <span>|</span>
        <Link href="/blogs">Blogs</Link>
        <span>|</span>
        <Link href="/users" className="font-bold">Usuarios</Link>
        <span>|</span>
        <Link href="/me">me</Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

      {/* Envolvemos la lista de usuarios con Suspense para cumplir con Next.js */}
      <Suspense fallback={<p className="text-gray-500">Cargando lista de usuarios...</p>}>
        <UsersList />
      </Suspense>

      <div className="mt-8">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Volver a la lista de blogs
        </Link>
      </div>
    </div>
  )
}