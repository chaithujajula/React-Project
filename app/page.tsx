import Link from 'next/link';
import { WeatherCard } from '@/components/weather-card';
import { TaskManager } from '@/components/task-manager';

export default function HomePage() {
  return <main className="page-shell">
    <header className="topbar"><Link href="/" className="brand"><span className="brand-mark">R</span> React / Next Lab</Link><nav><Link href="/tasks">Tasks route ↗</Link><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Weather API ↗</a></nav></header>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">LEARN BY BUILDING</p><h1>From React basics to a <span>production-minded</span> app.</h1><p className="hero-description">A hands-on starter covering component patterns, CRUD workflows, API routes, live data, validation, and testing.</p><div className="hero-pills"><span>React 19</span><span>Next.js App Router</span><span>TypeScript</span><span>Vitest</span></div></div><div className="hero-stat"><span className="stat-icon">✳</span><p className="muted">Your learning sprint</p><strong>6 modules</strong><span>One small project, end to end.</span></div></section>
    <div className="dashboard-grid"><WeatherCard /><aside className="learning-card"><p className="eyebrow">PROJECT ROADMAP</p><h2>What you’ll practice</h2><ol><li><span>01</span><div><strong>React fundamentals</strong><p>Props, state, events, conditional UI</p></div></li><li><span>02</span><div><strong>CRUD + custom hooks</strong><p>Forms, effects, reusable API logic</p></div></li><li><span>03</span><div><strong>Scalable architecture</strong><p>Feature-focused components and types</p></div></li><li><span>04</span><div><strong>Next.js App Router</strong><p>Layouts, pages, route handlers</p></div></li><li><span>05</span><div><strong>Service integration</strong><p>Live weather, loading and errors</p></div></li><li><span>06</span><div><strong>Quality + performance</strong><p>Unit tests, linting, production build</p></div></li></ol></aside></div>
    <TaskManager />
    <footer></footer>
  </main>;
}
