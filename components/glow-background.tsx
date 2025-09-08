export default function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 glow-noise">
      {/* Base subtle gradient to set overall tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-slate-50 to-white/50 dark:from-black/30 dark:via-slate-900/10 dark:to-black/10" />

      {/* Top-left large glow */}
      <div className="absolute glow-blob-lg -top-56 -left-56 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 opacity-20 blur-3xl transform-gpu drift-slow" />

      {/* Bottom-right large glow */}
      <div className="absolute glow-blob-lg-2 -bottom-56 -right-56 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-teal-400 via-indigo-400 to-purple-500 opacity-16 blur-3xl transform-gpu drift-slower" />

      {/* Center soft halo to emphasize CTAs */}
      <div className="absolute left-1/2 top-48 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-white/5 dark:bg-white/3 opacity-80 blur-2xl" />
    </div>
  )
}

