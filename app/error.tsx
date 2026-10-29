'use client';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="page-shell"><section className="tasks-panel"><p className="eyebrow">SOMETHING WENT WRONG</p><h1>That didn’t load as expected.</h1><p className="muted">Try again. If the issue continues, check the terminal for server errors.</p><button className="button" onClick={() => reset()}>Try again</button></section></main>;
}
