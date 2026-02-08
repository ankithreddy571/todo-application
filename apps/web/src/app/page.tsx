import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 text-stone-900 p-8">
      <div className="mx-auto max-w-2xl rounded-md border border-amber-900/20 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-serif">Todo App</h1>
        <p className="mt-2 text-stone-600">Manage your daily tasks.</p>

        <div className="mt-6 flex gap-3">
          <Link className="inline-block rounded border border-stone-700 px-3 py-2 hover:bg-stone-100" href="/login">
            Login
          </Link>
          <Link className="inline-block rounded border border-stone-700 px-3 py-2 hover:bg-stone-100" href="/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
