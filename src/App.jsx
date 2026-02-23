import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import ImageGenerator from './components/ImageGenerator'
import Gallery from './components/Gallery'
import Features from './components/Features'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)
  const [generatedImages, setGeneratedImages] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3800)
    return () => clearTimeout(timer)
  }, [])

  const handleImageGenerated = (image) => {
    setGeneratedImages(prev => [image, ...prev])
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ParticleBackground />
          <div className="relative z-10">
            <Header />
            <Hero />
            <ImageGenerator onImageGenerated={handleImageGenerated} />
            <Gallery images={generatedImages} />
            <Features />
            <Footer />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default App
