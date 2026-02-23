import { motion } from 'framer-motion'
import { ChevronDown, Zap, Wand2, Sparkles } from 'lucide-react'

const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative pt-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Floating Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="w-4 h-4 text-neon-yellow" />
          <span className="text-sm font-medium text-white/80">
            Powered by Advanced AI Technology
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-cyber font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="block mb-2">Create Stunning</span>
          <span 
            className="relative inline-block"
            data-text="AI Images"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple animate-gradient-x">
              AI Images
            </span>
            <motion.span
              className="absolute -inset-1 rounded-lg opacity-30 blur-xl bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
          <span className="block mt-2">In Seconds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Transform your imagination into breathtaking visuals with our
          <span className="text-neon-cyan"> next-generation </span>
          AI image generator. No limits, no boundaries.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={scrollToGenerator}
            className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan" />
            <span className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan opacity-0 blur-xl group-hover:opacity-50 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Start Generating
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/20 hover:border-neon-cyan/50 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            View Gallery
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: '10M+', label: 'Images Created' },
            { value: '< 5s', label: 'Generation Time' },
            { value: '4K', label: 'Resolution' },
            { value: '100+', label: 'Art Styles' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-4 rounded-2xl glass neon-border-glow"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-cyber font-bold text-neon-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-neon-cyan/50" />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-neon-pink/20 rounded-full animate-spin-slow" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-neon-cyan/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </section>
  )
}

export default Hero
