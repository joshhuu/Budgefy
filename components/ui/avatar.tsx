"use client"
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  // Simple initials generator
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Fallback
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#e0e7ef",
          color: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: size / 2,
          userSelect: "none",
        }}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
