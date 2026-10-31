import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"

// 1. Nueva tabla de usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
})

// 2. Tabla de blogs/notas actualizada con la relación (userId)
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  important: boolean("important").default(false).notNull(),
  userId: integer("user_id").references(() => users.id), // Vincula cada nota/blog con un usuario
})