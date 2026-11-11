import Link from "next/link"
import { getUsers } from "../services/users"
import { Suspense } from "react"

const UserList = async () => {
  const users = await getUsers()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  )
}

const UsersPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>
      <Suspense fallback={<div>Cargando usuarios...</div>}>
        <UserList />
      </Suspense>
    </div>
  )
}

export default UsersPage