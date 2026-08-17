export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 bg-bg">
      {/* A single, very faint highlight at the top — everything else stays flat white/grey */}
      <div
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(255,255,255,0.9), transparent 70%)' }}
      />
    </div>
  )
}