import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return await db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  })
}