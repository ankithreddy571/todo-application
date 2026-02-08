"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodosPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function loadTodos() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(`${API}/api/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (!res.ok) {
      setError("Failed to load todos");
      return;
    }

    setTodos(await res.json());
  }

  async function addTodo() {
    const token = localStorage.getItem("token");
    if (!token || !title.trim()) return;

    const res = await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      setError("Failed to add todo");
      return;
    }

    setTitle("");
    loadTodos();
  }

  async function toggleTodo(id: string) {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API}/api/todos/${id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadTodos();
  }

  async function deleteTodo(id: string) {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API}/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadTodos();
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 text-stone-900 p-6">
      <div className="mx-auto max-w-2xl rounded-md border border-amber-900/20 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif">My Todos</h1>
          <button
            onClick={logout}
            className="rounded border border-stone-700 px-3 py-1.5 text-sm hover:bg-stone-100"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New todo..."
          />
          <button
            onClick={addTodo}
            className="rounded border border-stone-700 bg-stone-800 px-4 py-2 text-white hover:bg-stone-700"
          >
            Add
          </button>
        </div>

        {error && <p className="mb-3 text-sm text-red-700">{error}</p>}

        <ul className="space-y-2">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded border border-stone-200 px-3 py-2"
            >
              <span className={t.completed ? "text-stone-500 line-through" : ""}>
                {t.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTodo(t.id)}
                  className="rounded border border-stone-600 px-2 py-1 text-sm hover:bg-stone-100"
                >
                  Toggle
                </button>
                <button
                  onClick={() => deleteTodo(t.id)}
                  className="rounded border border-red-700 px-2 py-1 text-sm text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
