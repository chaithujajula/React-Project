import { NextResponse } from 'next/server';
import { createTask, listTasks } from '@/lib/tasks-store';

export async function GET() {
  return NextResponse.json({ data: listTasks() });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || !('title' in body) || typeof body.title !== 'string') {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }
    const title = body.title.trim();
    if (title.length < 3 || title.length > 120) {
      return NextResponse.json({ error: 'Title must be between 3 and 120 characters.' }, { status: 400 });
    }
    return NextResponse.json({ data: createTask(title) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }
}
