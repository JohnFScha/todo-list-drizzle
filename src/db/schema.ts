import { pgTable, serial, text, varchar, boolean, date } from 'drizzle-orm/pg-core';
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
const credentials = process.env.NEXT_PUBLIC_PG_CONNECTION_STRING;

const client = new Client({
  connectionString: credentials,
});

client.connect()
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(`Error connecting to DB: ${error.message}`));

const db = drizzle(client);

export const todos = pgTable('todo', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: varchar('description', { length: 256 }),
  done: boolean('done').default(false),
  createdAt: date('createdAt').default(new Date().toISOString()),
  updatedAt: date('updatedAt').default(new Date().toISOString())
});

export type Todo = typeof todos.$inferSelect; // return type when queried
export type NewTodo = typeof todos.$inferInsert; // insert type

export async function insertTodo(todo: NewTodo): Promise<Todo[]> {
  return db.insert(todos).values(todo).returning();
}

export default db;
