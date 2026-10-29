'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Task } from '@/lib/types';

async function readError(response: Response) {
  const payload = await response.json().catch(() => ({}));
  return payload.error ?? `Request failed (${response.status})`;
}
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error(await readError(response));
      const result = await response.json();
      setTasks(result.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not load tasks.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = async (title: string) => {
    const response = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    if (!response.ok) throw new Error(await readError(response));
    const result = await response.json(); setTasks((current) => [result.data, ...current]);
  };
  const update = async (id: number, patch: Partial<Pick<Task, 'title' | 'completed'>>) => {
    const response = await fetch(`/api/tasks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) });
    if (!response.ok) throw new Error(await readError(response));
    const result = await response.json(); setTasks((current) => current.map((task) => task.id === id ? result.data : task));
  };
  const remove = async (id: number) => {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(await readError(response));
    setTasks((current) => current.filter((task) => task.id !== id));
  };
  return { tasks, loading, error, refresh, create, update, remove };
}
