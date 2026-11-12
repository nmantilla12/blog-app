import { db } from '@/app/db'
import { users } from '@/app/db/schema'
import Link from 'next/link'
import { Suspense } from 'react'

// 1. Componente interno que realiza la consulta a la base de datos
async function UsersContent() {
  const allUsers = await db.select().from(users)

  if (allUsers.length === 0) {
    return <p className="text-gray-500">No hay usuarios registrados todavía.</p>
  }

  return (
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
  )
}

// 2. Componente principal de la página envuelto en Suspense
export default function UsersPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

      <Suspense fallback={<p className="text-gray-400">Cargando usuarios...</p>}>
        <UsersContent />
      </Suspense>

      <div className="mt-8">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Volver a la lista de blogs
        </Link>
      </div>
    </div>
  )
}