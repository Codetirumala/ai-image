import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      createParticle(container)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  const createParticle = (container) => {
    const particle = document.createElement('div')
    particle.className = 'absolute rounded-full pointer-events-none'
    
    const size = Math.random() * 4 + 2
    const colors = ['#ff00ff', '#00ffff', '#bf00ff', '#ff8000']
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.background = color
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.opacity = Math.random() * 0.5 + 0.2
    
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5
    
    particle.style.animation = `float-particle ${duration}s ${delay}s infinite ease-in-out`
    
    container.appendChild(particle)
  }

  return (
    <>
      {/* Particle Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Cyber Grid */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0" />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Pink Orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-float"
          style={{
            background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)',
            top: '-200px',
            left: '-200px',
          }}
        />
        {/* Cyan Orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] animate-float"
          style={{
            background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
            bottom: '-150px',
            right: '-150px',
            animationDelay: '-3s',
          }}
        />
        {/* Purple Orb */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px] animate-float"
          style={{
            background: 'radial-gradient(circle, #bf00ff 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '-1.5s',
          }}
        />
      </div>
    </>
  )
}

export default ParticleBackground
