import { NextResponse } from 'next/server';
import { deleteTask, updateTask } from '@/lib/tasks-store';

type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: 'Invalid task id.' }, { status: 400 });
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    const patch: { title?: string; completed?: boolean } = {};
    if ('title' in body) {
      if (typeof body.title !== 'string' || body.title.trim().length < 3 || body.title.trim().length > 120) {
        return NextResponse.json({ error: 'Title must be between 3 and 120 characters.' }, { status: 400 });
      }
      patch.title = body.title.trim();
    }
    if ('completed' in body) {
      if (typeof body.completed !== 'boolean') return NextResponse.json({ error: 'Completed must be a boolean.' }, { status: 400 });
      patch.completed = body.completed;
    }
    const task = updateTask(id, patch);
    return task ? NextResponse.json({ data: task }) : NextResponse.json({ error: 'Task not found.' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }
}
export async function DELETE(_request: Request, context: Context) {
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: 'Invalid task id.' }, { status: 400 });
  return deleteTask(id) ? new Response(null, { status: 204 }) : NextResponse.json({ error: 'Task not found.' }, { status: 404 });
}
