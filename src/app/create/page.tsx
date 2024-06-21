import { insertTodo } from "@/db/schema"
import { NewTodo } from "@/db/schema"
import { redirect } from "next/navigation"

export default async function page() {

  const createTodo = async (formData: FormData) => {
    'use server'

    const newTodo: NewTodo = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      done: false
    }

    const data = await insertTodo(newTodo)

    data ? redirect('/') : console.log('Error creating todo')
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-10 gap-10">
      <h2 className="text-5xl font-bold">Create new todo</h2>
      <form action={createTodo} className="form-control border-2 rounded-xl p-10 w-max gap-5">
        <label htmlFor="title" className="label">Title</label>
        <input type="text" name="title" id="title" className="input input-bordered bg-base-200" />
        <label htmlFor="description" className="label">Description</label>
        <input type="text" name="description" id="description" className="input input-bordered bg-base-200" />
        <button type="submit" className="btn btn-success">Create todo</button>
      </form>
    </main>
  )
}
