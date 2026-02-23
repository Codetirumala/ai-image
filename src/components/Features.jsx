import { motion } from 'framer-motion'
import { 
  Zap, 
  Palette, 
  Wand2, 
  ImagePlus, 
  Layers, 
  Sparkles,
  Shield,
  Clock,
  Globe
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate stunning images in seconds with our optimized AI engine',
      color: 'from-yellow-400 to-orange-500',
      glowColor: '#ffaa00',
    },
    {
      icon: Palette,
      title: '100+ Art Styles',
      description: 'From photorealistic to anime, oil paintings to cyberpunk aesthetics',
      color: 'from-pink-500 to-purple-500',
      glowColor: '#ff00ff',
    },
    {
      icon: Wand2,
      title: 'AI Magic',
      description: 'Advanced neural networks trained on millions of artworks',
      color: 'from-purple-500 to-indigo-500',
      glowColor: '#bf00ff',
    },
    {
      icon: ImagePlus,
      title: '4K Resolution',
      description: 'Create high-resolution images perfect for any use case',
      color: 'from-cyan-400 to-blue-500',
      glowColor: '#00ffff',
    },
    {
      icon: Layers,
      title: 'Unlimited Creations',
      description: 'No limits on how many images you can generate',
      color: 'from-green-400 to-emerald-500',
      glowColor: '#00ff80',
    },
    {
      icon: Shield,
      title: 'No Login Required',
      description: 'Start creating instantly without any account setup',
      color: 'from-red-400 to-pink-500',
      glowColor: '#ff4080',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="features" className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cyber font-bold mb-6">
            <span className="text-white">Powerful </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan">
              Features
            </span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Experience the most advanced AI image generation technology at your fingertips
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -10 }}
            >
              {/* Card */}
              <div className="relative p-6 rounded-2xl glass border border-white/10 h-full overflow-hidden transition-all duration-300 group-hover:border-transparent">
                {/* Animated Border on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${feature.glowColor}40, transparent, ${feature.glowColor}40)`,
                    padding: '1px',
                  }}
                />
                
                {/* Glow Effect */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: feature.glowColor }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-cyber mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Globe, value: 'Global', label: 'Accessibility', desc: 'Available worldwide' },
            { icon: Clock, value: '24/7', label: 'Availability', desc: 'Always online' },
            { icon: Zap, value: '0ms', label: 'Start Time', desc: 'Instant access' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl glass"
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-neon-cyan" />
              <div className="text-3xl font-cyber font-bold text-white mb-1">{stat.value}</div>
              <div className="text-lg text-white/80 mb-1">{stat.label}</div>
              <div className="text-sm text-white/50">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
