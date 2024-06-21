import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_PG_CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
})
