import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import Link from "next/link"

export default async function UsersPage() {
  const allUsers = await db.select().from(users)

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

      {allUsers.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados todavía.</p>
      ) : (
        <ul className="space-y-4">
          {allUsers.map((user) => (
            <li key={user.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
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

      <div className="mt-8">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Volver a la lista de blogs
        </Link>
      </div>
    </div>
  )
}