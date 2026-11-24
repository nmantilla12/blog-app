"use client"

import { useEffect, useState } from "react"

export default function LoginNotification() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const flag = window.sessionStorage.getItem("justLoggedIn")
    if (flag === "1") {
      window.sessionStorage.removeItem("justLoggedIn")
      setVisible(true)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div
      data-testid="notification"
      role="status"
      style={{
        padding: "10px 16px",
        marginBottom: "16px",
        backgroundColor: "#dcfce7",
        color: "#166534",
        border: "1px solid #86efac",
        borderRadius: "4px",
        fontWeight: "bold",
      }}
    >
      Successfully logged in
    </div>
  )
}
