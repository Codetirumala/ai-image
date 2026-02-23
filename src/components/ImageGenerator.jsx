import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wand2, 
  Download, 
  RefreshCw, 
  Sparkles, 
  ImagePlus,
  Palette,
  Sliders,
  AlertCircle,
  XCircle
} from 'lucide-react'
import { generateImage } from '../utils/imageApi'

const ImageGenerator = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const inputRef = useRef(null)
  const abortControllerRef = useRef(null)

  const artStyles = [
    { id: 'realistic', name: 'Realistic', icon: '📸', color: 'from-blue-500 to-cyan-500' },
    { id: 'anime', name: 'Anime', icon: '🎨', color: 'from-pink-500 to-purple-500' },
    { id: 'digital', name: 'Digital Art', icon: '💫', color: 'from-purple-500 to-indigo-500' },
    { id: 'oil', name: 'Oil Painting', icon: '🖼️', color: 'from-amber-500 to-orange-500' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌃', color: 'from-neon-pink to-neon-cyan' },
    { id: '3d', name: '3D Render', icon: '🎮', color: 'from-green-500 to-teal-500' },
  ]

  const styleModifiers = {
    realistic: 'photorealistic, ultra detailed, 8k, high resolution',
    anime: 'anime style, manga art, studio ghibli inspired, vibrant colors',
    digital: 'digital art, concept art, trending on artstation, highly detailed',
    oil: 'oil painting style, classical art, canvas texture, masterpiece',
    cyberpunk: 'cyberpunk style, neon lights, futuristic, dark atmosphere, glowing',
    '3d': '3D render, octane render, unreal engine 5, volumetric lighting, realistic textures',
  }

  const samplePrompts = [
    "A futuristic city with neon lights at night",
    "Mystical forest with glowing mushrooms",
    "Astronaut floating in a colorful nebula",
    "Cyberpunk samurai with glowing katana",
    "Underwater kingdom with bioluminescent creatures",
  ]

  const generateImg = async () => {
    if (!prompt.trim()) {
      inputRef.current?.focus()
      return
    }

    // Cancel previous generation if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setIsGenerating(true)
    setError('')
    setStatusMessage('Connecting to AI...')
    
    try {
      const styleText = styleModifiers[selectedStyle] || ''
      const fullPrompt = `${prompt.trim()}, ${styleText}`

      const imageUrl = await generateImage(
        fullPrompt,
        { width: 512, height: 512 },
        (progress) => {
          setStatusMessage(progress.message || 'Generating...')
        },
        controller.signal
      )

      const newImage = {
        id: Date.now(),
        url: imageUrl,
        prompt: prompt,
        style: selectedStyle,
        timestamp: new Date().toISOString(),
      }

      setCurrentImage(newImage)
      onImageGenerated?.(newImage)
    } catch (err) {
      if (err.message !== 'Generation cancelled' && err.name !== 'AbortError') {
        setError(err.message || 'Failed to generate image. Please try again.')
      }
    } finally {
      setIsGenerating(false)
      setStatusMessage('')
      abortControllerRef.current = null
    }
  }

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsGenerating(false)
    setStatusMessage('')
  }

  const downloadImage = () => {
    if (!currentImage) return
    window.open(currentImage.url, '_blank')
  }

  return (
    <section id="generate" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
              Create Your Vision
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Describe your imagination and watch AI bring it to life
          </p>
        </motion.div>

        {/* Main Generator Card */}
        <motion.div
          className="relative rounded-3xl neon-border p-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <Wand2 className="w-4 h-4 text-neon-cyan" />
                    Enter your prompt
                  </label>
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image you want to create..."
                      className="w-full h-32 px-4 py-3 rounded-xl input-neon resize-none text-white placeholder-white/40"
                    />
                    <motion.div
                      className="absolute bottom-3 right-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <button
                        onClick={() => setPrompt(samplePrompts[Math.floor(Math.random() * samplePrompts.length)])}
                        className="p-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
                        title="Random prompt"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Style Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <Palette className="w-4 h-4 text-neon-pink" />
                    Art Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {artStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedStyle === style.id
                            ? 'border-neon-cyan bg-neon-cyan/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl mb-1 block">{style.icon}</span>
                        <span className="text-xs font-medium">{style.name}</span>
                        {selectedStyle === style.id && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-neon-cyan"
                            layoutId="styleOutline"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <motion.button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Sliders className="w-4 h-4" />
                  Advanced Options
                  <motion.span
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>

                {/* Advanced Options Panel */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Resolution</label>
                          <select className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-white/10 text-white text-sm">
                            <option>512 x 512</option>
                            <option>768 x 768</option>
                            <option>1024 x 1024</option>
                            <option>2048 x 2048</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Quality</label>
                          <select className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-white/10 text-white text-sm">
                            <option>Standard</option>
                            <option>High</option>
                            <option>Ultra</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Generate Button */}
                <div className="space-y-2">
                  <motion.button
                    onClick={generateImg}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                    whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan" />
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5" />
                          Generate Image
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Cancel Button */}
                  {isGenerating && (
                    <motion.button
                      onClick={cancelGeneration}
                      className="w-full py-2 rounded-xl font-medium text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-700 border-2 border-white/10">
                  {/* Loading Overlay */}
                  {isGenerating && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-700"
                    >
                      <div className="relative w-24 h-24 mb-4">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-neon-pink/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-2 rounded-full border-4 border-neon-cyan/30"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-4 rounded-full border-4 border-neon-purple/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                      <motion.p
                        className="text-white/70 font-medium text-center px-4"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {statusMessage || 'Generating...'}
                      </motion.p>
                      <p className="text-white/40 text-xs mt-2">This may take 15-60 seconds</p>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {error && !isGenerating && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-700 px-6">
                      <AlertCircle className="w-16 h-16 mb-4 text-red-400" />
                      <p className="text-red-400 text-center">{error}</p>
                      <button
                        onClick={() => { setError(''); generateImg(); }}
                        className="mt-4 px-6 py-2 rounded-lg bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Generated Image */}
                  {currentImage && !error && !isGenerating ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={currentImage.url}
                        alt={currentImage.prompt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm text-white/80 line-clamp-2 mb-3">
                          "{currentImage.prompt}"
                        </p>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={downloadImage}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </motion.button>
                          <motion.button
                            onClick={generateImg}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : !error && !isGenerating && !currentImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                      <ImagePlus className="w-16 h-16 mb-4" />
                      <p className="text-lg">Your creation will appear here</p>
                      <p className="text-sm">Enter a prompt and click generate</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sample Prompts */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-white/50 text-sm mb-4">Try these prompts:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {samplePrompts.map((samplePrompt, index) => (
              <motion.button
                key={index}
                onClick={() => setPrompt(samplePrompt)}
                className="px-4 py-2 rounded-full text-sm bg-dark-700/50 border border-white/10 text-white/70 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {samplePrompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImageGenerator
