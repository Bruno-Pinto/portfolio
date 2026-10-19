export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-8 px-6 py-20 sm:px-12">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">Zurich, Switzerland / Portfolio in development</p>
      <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">Bruno Pinto<br /><span className="text-accent">Software Developer.</span></h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted">Computer Science student at ZHAW. This portfolio is being built to present my software development projects and experience.</p>
      <div className="max-w-2xl border border-line bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Foundation / 01</p>
        <p className="mt-3 leading-relaxed text-muted">Project case studies, English and German content, and a portrait will follow.</p>
      </div>
    </main>
  );
}
