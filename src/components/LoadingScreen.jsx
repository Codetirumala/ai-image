import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  const [phase, setPhase] = useState(0) // 0=boot, 1=logo, 2=reveal, 3=exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Floating particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    color: ['#ff00ff', '#00ffff', '#bf00ff', '#ffffff'][Math.floor(Math.random() * 4)],
  }))

  // Horizontal scan lines
  const scanLines = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    y: Math.random() * 100,
    delay: Math.random() * 1.5,
    width: Math.random() * 40 + 20,
  }))

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0f' }}
      animate={phase === 3 ? { 
        clipPath: 'circle(0% at 50% 50%)',
      } : {
        clipPath: 'circle(150% at 50% 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Deep background grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient background pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(191,0,255,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(255,0,255,0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -80, -160],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Horizontal scan lines */}
      {phase >= 0 && scanLines.map(line => (
        <motion.div
          key={line.id}
          className="absolute left-0 h-[1px]"
          style={{
            top: `${line.y}%`,
            background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
            width: `${line.width}%`,
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear',
          }}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center">

        {/* Phase 0: Boot sequence text */}
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 0 ? 1 : 0 }}
        >
          {['> INITIALIZING NEURAL NETWORK...', '> LOADING AI MODELS...', '> CALIBRATING IMAGE ENGINE...'].map((text, i) => (
            <motion.p
              key={i}
              className="text-[10px] font-mono text-neon-cyan/50 text-left mb-1 tracking-wider"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: phase >= 1 ? 0.4 : 0, x: 0 }}
              transition={{ delay: 0.1 + i * 0.3, duration: 0.3 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Main Logo - Hexagon with animated borders */}
        <motion.div
          className="relative w-40 h-40 mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: phase >= 1 ? 1 : 0, 
            rotate: phase >= 1 ? 0 : -180,
          }}
          transition={{ duration: 0.8, type: 'spring', damping: 12 }}
        >
          {/* Outer rotating hexagon frame */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" />
                  <stop offset="50%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#bf00ff" />
                </linearGradient>
              </defs>
              <polygon
                points="80,8 148,42 148,118 80,152 12,118 12,42"
                fill="none"
                stroke="url(#hexGrad)"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          {/* Inner counter-rotating ring */}
          <motion.div
            className="absolute inset-6"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="#00ffff"
                strokeWidth="1.5"
                strokeDasharray="8 12"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Core energy orb */}
          <motion.div
            className="absolute inset-10 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(191,0,255,0.3) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                textShadow: [
                  '0 0 20px #00ffff, 0 0 40px #00ffff',
                  '0 0 30px #ff00ff, 0 0 60px #ff00ff',
                  '0 0 20px #00ffff, 0 0 40px #00ffff',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl font-cyber font-bold text-white">AI</span>
            </motion.div>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#ff00ff', '#00ffff', '#bf00ff'][i],
                boxShadow: `0 0 10px ${['#ff00ff', '#00ffff', '#bf00ff'][i]}`,
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [
                  Math.cos((i * 2 * Math.PI) / 3) * 70,
                  Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 70,
                  Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 70,
                ],
                y: [
                  Math.sin((i * 2 * Math.PI) / 3) * 70,
                  Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 70,
                  Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 70,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        {/* Title with glitch + typewriter effect */}
        <div className="relative mb-6 overflow-hidden">
          <motion.h1
            className="text-5xl md:text-7xl font-cyber font-black tracking-wider relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* Glitch layers */}
            <motion.span
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500"
              style={{ WebkitTextStroke: '0px' }}
              animate={phase >= 1 ? {
                x: [-2, 2, -1, 0],
                opacity: [0, 0.7, 0, 0],
              } : {}}
              transition={{ duration: 0.3, repeat: 3, repeatDelay: 0.5, delay: 0.5 }}
              aria-hidden
            >
              NEON AI
            </motion.span>
            <motion.span
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={phase >= 1 ? {
                x: [2, -2, 1, 0],
                opacity: [0, 0.7, 0, 0],
              } : {}}
              transition={{ duration: 0.3, repeat: 3, repeatDelay: 0.5, delay: 0.6 }}
              aria-hidden
            >
              NEON AI
            </motion.span>

            {/* Main text */}
            <motion.span
              className="relative text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple"
              animate={phase >= 1 ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              NEON AI
            </motion.span>
          </motion.h1>

          {/* Underline sweep */}
          <motion.div
            className="h-[2px] mx-auto mt-3"
            style={{
              background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, #bf00ff, transparent)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={phase >= 1 ? { width: '100%', opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-sm md:text-base font-mono tracking-[0.3em] uppercase text-white/40 mb-10"
          initial={{ opacity: 0, letterSpacing: '1em' }}
          animate={phase >= 1 ? { opacity: 1, letterSpacing: '0.3em' } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Image Generation Studio
        </motion.p>

        {/* Progress bar */}
        <div className="w-72 mx-auto">
          <motion.div
            className="h-[3px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ff00ff, #00ffff, #bf00ff)',
                boxShadow: '0 0 15px #00ffff, 0 0 30px rgba(0,255,255,0.3)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>

          {/* Loading percentage */}
          <motion.div
            className="flex justify-between mt-2 text-[10px] font-mono text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span>LOADING</span>
            <LoadingPercent />
          </motion.div>
        </div>

        {/* Status chips */}
        <motion.div
          className="flex justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {['Neural Engine', 'GPU Render', 'AI Models'].map((label, i) => (
            <motion.span
              key={label}
              className="text-[9px] px-3 py-1 rounded-full border font-mono uppercase tracking-wider"
              style={{
                borderColor: ['#ff00ff33', '#00ffff33', '#bf00ff33'][i],
                color: ['#ff00ff', '#00ffff', '#bf00ff'][i],
                background: ['rgba(255,0,255,0.05)', 'rgba(0,255,255,0.05)', 'rgba(191,0,255,0.05)'][i],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, type: 'spring', damping: 10 }}
            >
              ● {label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Corner decorations */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} w-8 h-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          <div
            className="w-full h-full"
            style={{
              borderTop: i < 2 ? '2px solid #00ffff' : 'none',
              borderBottom: i >= 2 ? '2px solid #00ffff' : 'none',
              borderLeft: i % 2 === 0 ? '2px solid #00ffff' : 'none',
              borderRight: i % 2 === 1 ? '2px solid #00ffff' : 'none',
            }}
          />
        </motion.div>
      ))}

      {/* Vertical side lines */}
      <motion.div
        className="absolute left-12 top-0 w-[1px] h-full"
        style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(0,255,255,0.1) 50%, transparent 80%)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
      <motion.div
        className="absolute right-12 top-0 w-[1px] h-full"
        style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(255,0,255,0.1) 50%, transparent 80%)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      />
    </motion.div>
  )
}

// Animated percentage counter
const LoadingPercent = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2500
    const steps = 100
    const stepTime = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setCount(current)
      if (current >= 100) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [])

  return <span>{count}%</span>
}

export default LoadingScreen
