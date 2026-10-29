import Link from 'next/link';
import { TaskManager } from '@/components/task-manager';
export default function TasksPage() {
  return <main className="page-shell"><header className="topbar"><Link href="/" className="brand"><span className="brand-mark">R</span> React / Next Lab</Link><Link href="/">← Back home</Link></header><section className="page-intro"><p className="eyebrow">APP ROUTER · /TASKS</p><h1>Task workspace</h1><p className="hero-description">A dedicated route reusing the same CRUD feature component.</p></section><TaskManager /><footer><span>Shared component · Separate route</span></footer></main>;
}
