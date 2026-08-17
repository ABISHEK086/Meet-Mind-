import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  time?: string
}

/** A thin, light iPhone-style frame matching the reference mockup — white body, hairline border, black pill notch. */
export function PhoneFrame({ children, time = '9:41' }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[272px] select-none sm:w-[300px]">
      {/* Hairline bezel — light, not a chunky black case */}
      <div className="relative rounded-[44px] border border-line-strong bg-white p-[10px] shadow-[0_24px_60px_-16px_rgba(21,20,31,0.18)]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[34px] bg-white">
          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-6 pt-3 text-[13px] font-semibold text-ink">
            <span>{time}</span>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor" />
                <rect x="4.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor" />
                <rect x="9" y="3" width="2.5" height="8" rx="0.5" fill="currentColor" />
                <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor" />
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 10.5C8 10.5 8.4 10.3 8.7 10L7.5 8.5L6.3 10C6.6 10.3 7 10.5 7.5 10.5Z" fill="currentColor" />
                <path
                  d="M7.5 6.2C8.7 6.2 9.8 6.7 10.6 7.5L9.2 9.1C8.8 8.6 8.2 8.3 7.5 8.3C6.8 8.3 6.2 8.6 5.8 9.1L4.4 7.5C5.2 6.7 6.3 6.2 7.5 6.2Z"
                  fill="currentColor"
                />
                <path
                  d="M7.5 2C9.9 2 12.1 3 13.7 4.6L12.3 6.2C11 4.9 9.3 4.1 7.5 4.1C5.7 4.1 4 4.9 2.7 6.2L1.3 4.6C2.9 3 5.1 2 7.5 2Z"
                  fill="currentColor"
                />
              </svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
                <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4" />
                <rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" />
                <rect x="21.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Notch — solid black pill, same as the reference */}
          <div className="absolute left-1/2 top-[9px] z-30 h-[24px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />

          {/* Screen content */}
          <div className="relative h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}