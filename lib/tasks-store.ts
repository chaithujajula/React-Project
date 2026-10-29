import type { Task } from './types';

// Demo-only in-memory store. Data resets when the Next.js server restarts and is not shared across instances.
let tasks: Task[] = [
  { id: 1, title: 'Explore React props and state', completed: true },
  { id: 2, title: 'Build a reusable CRUD form', completed: false },
  { id: 3, title: 'Add loading and error states', completed: false }
];
let nextId = 4;

export function listTasks() { return tasks.map((task) => ({ ...task })); }
export function createTask(title: string) {
  const task: Task = { id: nextId++, title, completed: false, createdAt: new Date().toISOString() };
  tasks = [task, ...tasks];
  return { ...task };
}
export function updateTask(id: number, patch: Partial<Pick<Task, 'title' | 'completed'>>) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index < 0) return null;
  tasks[index] = { ...tasks[index], ...patch };
  return { ...tasks[index] };
}
export function deleteTask(id: number) {
  const before = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length !== before;
}
