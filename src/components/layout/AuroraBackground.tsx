export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-void">
      <div
        className="aurora-blob absolute -left-1/3 -top-1/4 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[110px]"
        style={{ background: 'radial-gradient(circle, var(--color-violet-deep), transparent 70%)' }}
      />
      <div
        className="aurora-blob absolute -right-1/4 top-[5%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-[110px]"
        style={{ background: 'radial-gradient(circle, var(--color-magenta), transparent 70%)', animationDelay: '-7s' }}
      />
      <div
        className="aurora-blob absolute bottom-[-15%] left-[15%] h-[55vh] w-[55vh] rounded-full opacity-[0.22] blur-[110px]"
        style={{ background: 'radial-gradient(circle, var(--color-cyan), transparent 70%)', animationDelay: '-14s' }}
      />
      {/* Vignette to keep edges of the viewport dark and let center content breathe */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 40%, var(--color-void) 100%)' }}
      />
      {/* Grain over the whole canvas for material texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}