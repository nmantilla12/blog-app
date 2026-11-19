"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LikeButton({
  blogId,
  initialLikes,
  onLike,
}: {
  blogId: number
  initialLikes: number
  onLike: (id: number) => Promise<number>
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const updatedLikes = await onLike(blogId)
      setLikes(updatedLikes)
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
        Me gusta: {likes}
      </span>

      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        style={{
          padding: "6px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "wait" : "pointer",
          fontWeight: "bold",
          fontSize: "14px",
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? "Guardando..." : "Me gusta"}
      </button>
    </div>
  )
}