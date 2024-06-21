import type { Todo } from '@/db/schema';
import sleep from '@/utils/sleep';

async function TodoList({ todos }: { todos: Todo[] }) {
  // ! Función para simular una petición asincrónica para testear loading UI
  // await sleep(5000)

  return (
    <section className="overflow-x-auto border-2 rounded-lg h-fit w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Desciption</th>
            <th>Done?</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) =>
            <tr key={todo.id}>
              <th>{todo.id}</th>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.done ? 'Done' : 'Pending'}</td>
              <td>{todo.createdAt}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default TodoList