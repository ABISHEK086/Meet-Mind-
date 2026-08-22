import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { AuroraBackground } from '@/components/layout/AuroraBackground'
import { IntroSplash } from '@/components/layout/IntroSplash'
import { Home } from '@/pages/Home'
import { Analyze } from '@/pages/Analyze'
import { Results } from '@/pages/Results'
import { Export } from '@/pages/Export'
import { SignUp } from '@/pages/SignUp'
import { SignIn } from '@/pages/SignIn'
import { OAuthSuccess } from '@/pages/OAuthSuccess'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
}

export default function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="relative min-h-screen text-ink">
      <AuroraBackground />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <IntroSplash onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results" element={<Results />} />
            <Route path="/export" element={<Export />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}