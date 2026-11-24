"use client"

import { useActionState } from "react"
import { registerUser } from "@/app/actions/users"
import Link from "next/link"

const initialState = {
  error: "",
  values: { username: "", name: "" },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  const errorTestId = state?.error
    ? state.error.toLowerCase().includes("username")
      ? "username-error"
      : "passwordConfirm-error"
    : undefined

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Registro de Usuario</h1>

      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
      >
        {state?.error && (
          <p
            data-testid={errorTestId}
            style={{ color: "red", fontWeight: "bold" }}
          >
            {state.error}
          </p>
        )}

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={state?.values?.username}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={state?.values?.name}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          data-testid="register-button"
          style={{ padding: "0.75rem", cursor: "pointer" }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
      </p>
    </main>
  )
}