'use client';
import { FormEvent, useState } from 'react';
import { useTasks } from '@/hooks/use-tasks';

export function TaskManager() {
  const { tasks, loading, error, refresh, create, update, remove } = useTasks();
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all');
  const visibleTasks = tasks.filter((task) => filter === 'all' || (filter === 'done' ? task.completed : !task.completed));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFormError('');
    const clean = title.trim();
    if (clean.length < 3 || clean.length > 120) { setFormError('Enter a task title between 3 and 120 characters.'); return; }
    setBusy(true);
    try { await create(clean); setTitle(''); }
    catch (err) { setFormError(err instanceof Error ? err.message : 'Could not create task.'); }
    finally { setBusy(false); }
  }
  async function saveEdit(id: number) {
    const clean = editTitle.trim();
    if (clean.length < 3 || clean.length > 120) { setFormError('Task title must be 3–120 characters.'); return; }
    setBusy(true); setFormError('');
    try { await update(id, { title: clean }); setEditingId(null); }
    catch (err) { setFormError(err instanceof Error ? err.message : 'Could not update task.'); }
    finally { setBusy(false); }
  }
  async function toggle(id: number, completed: boolean) {
    setFormError('');
    try { await update(id, { completed }); }
    catch (err) { setFormError(err instanceof Error ? err.message : 'Could not update task.'); }
  }
  async function deleteOne(id: number) {
    setFormError('');
    try { await remove(id); }
    catch (err) { setFormError(err instanceof Error ? err.message : 'Could not delete task.'); }
  }

  return <section className="tasks-panel" aria-labelledby="tasks-heading">
    <div className="section-heading"><div><p className="eyebrow">CRUD WORKSHOP</p><h2 id="tasks-heading">Your tasks</h2><p className="muted">Create, edit, complete, and delete tasks through your own API.</p></div><button className="button button-secondary" onClick={() => void refresh()} disabled={loading}>↻ Refresh</button></div>
    <form className="task-form" onSubmit={submit} noValidate>
      <label htmlFor="new-task">New task</label>
      <div className="form-row"><input id="new-task" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Learn useEffect" maxLength={120} aria-describedby="task-help" /><button className="button" disabled={busy} type="submit">{busy ? 'Saving…' : 'Add task +'}</button></div>
      <p id="task-help" className="muted small">Use 3–120 characters.</p>
    </form>
    {formError && <p className="error-message" role="alert">{formError}</p>}
    {error && <div className="error-message" role="alert">{error} <button className="text-button" onClick={() => void refresh()}>Try again</button></div>}
    <div className="task-toolbar"><span className="muted">{tasks.filter((task) => !task.completed).length} remaining · {tasks.length} total</span><div className="filter-group" aria-label="Filter tasks">{(['all', 'open', 'done'] as const).map((item) => <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item === 'all' ? 'All' : item === 'open' ? 'Active' : 'Completed'}</button>)}</div></div>
    {loading ? <p className="empty-state" role="status">Loading tasks…</p> : visibleTasks.length === 0 ? <p className="empty-state">No tasks here yet. Add one above.</p> : <ul className="task-list">{visibleTasks.map((task) => <li key={task.id} className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <input className="task-checkbox" type="checkbox" checked={task.completed} onChange={(event) => void toggle(task.id, event.target.checked)} aria-label={`Mark ${task.title} ${task.completed ? 'active' : 'completed'}`} />
      {editingId === task.id ? <div className="edit-fields"><input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} aria-label="Edit task title" maxLength={120} autoFocus /><button className="text-button" onClick={() => void saveEdit(task.id)} disabled={busy}>Save</button><button className="text-button muted" onClick={() => setEditingId(null)}>Cancel</button></div> : <span className="task-title">{task.title}</span>}
      {editingId !== task.id && <div className="task-actions"><button className="text-button" onClick={() => { setEditingId(task.id); setEditTitle(task.title); setFormError(''); }}>Edit</button><button className="text-button danger" onClick={() => void deleteOne(task.id)}>Delete</button></div>}
    </li>)}</ul>}
    <p className="api-note">API routes: <code>GET/POST /api/tasks</code> · <code>PATCH/DELETE /api/tasks/:id</code></p>
  </section>;
}
