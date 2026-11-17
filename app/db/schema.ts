import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Tabla de usuarios (apunta a 'usuarios' en Neon)
export const users = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  token: text("token"),
})

// Tabla de blogs/notas (apunta a 'blogs' en Neon)
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id),
})

// Tabla para la lista de lectura (apunta a 'lista_de_lectura' en Neon)
export const readingList = pgTable("lista_de_lectura", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  blogId: integer("blog_id").references(() => blogs.id).notNull(),
  read: boolean("read").default(false).notNull(),
})

// Relaciones para Drizzle
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}))

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}))