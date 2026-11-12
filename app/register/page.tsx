import Link from "next/link"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h2>Register</h2>
      <form action={registerUser}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username
            <input 
              type="text" 
              name="username" 
              required 
              style={{ display: "block", marginTop: "0.3rem", padding: "0.5rem", width: "300px" }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Name
            <input 
              type="text" 
              name="name" 
              required 
              style={{ display: "block", marginTop: "0.3rem", padding: "0.5rem", width: "300px" }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password
            <input 
              type="password" 
              name="password" 
              required 
              style={{ display: "block", marginTop: "0.3rem", padding: "0.5rem", width: "300px" }} 
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes cuenta? <Link href="/login" style={{ color: "#4da6ff" }}>Inicia sesión aquí</Link>
      </p>
    </div>
  )
}