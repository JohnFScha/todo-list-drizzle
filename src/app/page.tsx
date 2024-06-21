import db from '@/db/schema'
import { todos } from '@/db/schema';
import { Suspense } from 'react';
import type { Todo } from '@/db/schema';
import TodoList from './components/TodoList';
import Link from 'next/link';

export const revalidate = 300;

export default async function Home() {
  const data: Todo[] = await db.select().from(todos);

  return (
    <main className="min-h-screen flex flex-col items-center p-10 gap-10">
      <h1 className='text-5xl font-bold'>Todo List 💖</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <TodoList todos={data} />
      </Suspense>
      <Link href={'/create'} className='btn btn-info w-full text-2xl'>Create new todo</Link>
    </main>
  );
}
