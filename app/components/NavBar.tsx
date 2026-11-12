"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#f0f0f0",
        color: "#000",
        marginBottom: "1rem",
      }}
    >
      <Link href="/">home</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      <Link href="/users">users</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button
            onClick={() => signOut()}
            style={{ marginLeft: "10px", padding: "2px 8px", cursor: "pointer" }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  )
}