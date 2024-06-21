import db from '@/db/schema'
import { todos } from '@/db/schema';

export default async function Home() {
  
  return (
    <main className="min-h-screen flex justify-center">
      <p className="text-5xl font-bold">Hello world!</p>
    </main>
  );
}
