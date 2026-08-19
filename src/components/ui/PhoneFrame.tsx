import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  time?: string
  size?: 'md' | 'sm'
  className?: string
}

/** A premium-feeling iPhone-style frame — brushed metallic bezel, glossy screen highlight, deep floating shadow. */
export function PhoneFrame({ children, time = '9:41', size = 'md', className = '' }: PhoneFrameProps) {
  const width = size === 'md' ? 'w-[228px] sm:w-[252px]' : 'w-[188px] sm:w-[206px]'

  return (
    <div className={`relative mx-auto select-none ${width} ${className}`}>
      {/* Metallic bezel */}
      <div
        className="relative rounded-[42px] p-[3px] shadow-[0_50px_90px_-24px_rgba(21,20,31,0.45),0_10px_24px_-8px_rgba(21,20,31,0.25)]"
        style={{
          background: 'linear-gradient(155deg, #4b4b56 0%, #232228 22%, #1c1c22 45%, #17171c 55%, #3a3a42 78%, #121115 100%)',
        }}
      >
        {/* Inner rim highlight for a brushed-metal edge */}
        <div className="rounded-[39px] p-[6px]" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 30%)' }}>
          <div className="relative aspect-[9/19.3] overflow-hidden rounded-[32px] bg-white">
            {/* Status bar */}
            <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 text-[11px] font-semibold text-ink">
              <span>{time}</span>
              <div className="flex items-center gap-1">
                <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor" />
                  <rect x="4.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor" />
                  <rect x="9" y="3" width="2.5" height="8" rx="0.5" fill="currentColor" />
                  <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor" />
                </svg>
                <svg width="13" height="10" viewBox="0 0 15 11" fill="none">
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
                <svg width="21" height="10" viewBox="0 0 24 11" fill="none">
                  <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4" />
                  <rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" />
                  <rect x="21.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Notch — solid black pill */}
            <div className="absolute left-1/2 top-[7px] z-30 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-ink" />

            {/* Screen content */}
            <div className="relative h-full w-full">{children}</div>

            {/* Glossy diagonal screen highlight — sits above content, doesn't block interaction visually */}
            <div
              className="pointer-events-none absolute inset-0 z-40 opacity-[0.06]"
              style={{ background: 'linear-gradient(115deg, white 0%, transparent 30%, transparent 70%, white 100%)' }}
            />
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[92px] h-6 w-[3px] rounded-l-sm bg-[#2a2a30]" />
      <div className="absolute -left-[3px] top-[124px] h-9 w-[3px] rounded-l-sm bg-[#2a2a30]" />
      <div className="absolute -left-[3px] top-[164px] h-9 w-[3px] rounded-l-sm bg-[#2a2a30]" />
      <div className="absolute -right-[3px] top-[130px] h-12 w-[3px] rounded-r-sm bg-[#2a2a30]" />
    </div>
  )
}