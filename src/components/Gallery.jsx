import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Heart, Share2, Eye, Filter } from 'lucide-react'

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [likes, setLikes] = useState({})
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  // Curated static gallery with stunning AI-style images
  const staticGallery = [
    {
      id: 's1',
      url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80',
      prompt: 'Neon cyberpunk cityscape at midnight',
      style: 'cyberpunk',
      author: 'NeonAI',
      likes: 2847,
    },
    {
      id: 's2',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      prompt: 'Earth from space with glowing city lights',
      style: 'realistic',
      author: 'NeonAI',
      likes: 4521,
    },
    {
      id: 's3',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      prompt: 'Abstract fluid art with vibrant neon colors',
      style: 'digital',
      author: 'NeonAI',
      likes: 3192,
    },
    {
      id: 's4',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      prompt: 'Geometric abstract art with purple and blue tones',
      style: 'digital',
      author: 'NeonAI',
      likes: 1876,
    },
    {
      id: 's5',
      url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      prompt: 'Cosmic nebula with vibrant stellar clouds',
      style: 'realistic',
      author: 'NeonAI',
      likes: 5234,
    },
    {
      id: 's6',
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      prompt: 'Retro gaming setup with neon glow',
      style: 'cyberpunk',
      author: 'NeonAI',
      likes: 2103,
    },
    {
      id: 's7',
      url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
      prompt: 'Surreal colorful wave of liquid metal',
      style: 'digital',
      author: 'NeonAI',
      likes: 3678,
    },
    {
      id: 's8',
      url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80',
      prompt: 'Mystical waterfall in enchanted forest',
      style: 'fantasy',
      author: 'NeonAI',
      likes: 4102,
    },
    {
      id: 's9',
      url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
      prompt: 'Neon light trails in futuristic tunnel',
      style: 'cyberpunk',
      author: 'NeonAI',
      likes: 1945,
    },
    {
      id: 's10',
      url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80',
      prompt: 'Deep space galaxy with million stars',
      style: 'realistic',
      author: 'NeonAI',
      likes: 6781,
    },
    {
      id: 's11',
      url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
      prompt: 'Vibrant gradient abstract 3D landscape',
      style: '3d',
      author: 'NeonAI',
      likes: 2456,
    },
    {
      id: 's12',
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      prompt: 'Snow mountains under starlit sky',
      style: 'fantasy',
      author: 'NeonAI',
      likes: 7893,
    },
  ]

  // Merge user-generated images at the top
  const userImages = (images || []).map(img => ({
    ...img,
    author: 'You',
    likes: 0,
  }))

  const allImages = [...userImages, ...staticGallery]

  const filters = ['all', 'cyberpunk', 'realistic', 'digital', 'fantasy', '3d']

  const filteredImages = activeFilter === 'all'
    ? allImages
    : allImages.filter(img => img.style === activeFilter)

  const toggleLike = (imageId) => {
    setLikes(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }))
  }

  const getLikeCount = (image) => {
    const base = image.likes || 0
    return likes[image.id] ? base + 1 : base
  }

  const downloadImage = (image) => {
    window.open(image.url, '_blank')
  }



  return (
    <section id="gallery" className="py-20 px-6 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Explore Creations</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink">
              AI Art Gallery
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Stunning visuals crafted by artificial intelligence
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-neon-pink to-neon-cyan text-white shadow-lg shadow-neon-pink/20'
                  : 'bg-dark-700/50 text-white/50 border border-white/10 hover:border-neon-cyan/30 hover:text-white/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />

                {/* Permanent subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated neon border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: 'inset 0 0 0 2px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.1)',
                  }}
                />

                {/* Content overlay on hover */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top - Style badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-neon-purple/40 text-neon-purple backdrop-blur-sm border border-neon-purple/30">
                      {image.style}
                    </span>
                    {image.author === 'You' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-neon-cyan/40 text-neon-cyan backdrop-blur-sm border border-neon-cyan/30">
                        Your Creation
                      </span>
                    )}
                  </div>

                  {/* Bottom - Info */}
                  <div>
                    <p className="text-sm text-white/90 font-medium line-clamp-2 mb-3">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <Heart className={`w-3 h-3 ${likes[image.id] ? 'fill-red-400 text-red-400' : ''}`} />
                        <span>{getLikeCount(image).toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); toggleLike(image.id) }}
                          className={`p-2 rounded-full backdrop-blur-sm ${
                            likes[image.id]
                              ? 'bg-red-500/30 text-red-400'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          } transition-colors`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Heart className={`w-4 h-4 ${likes[image.id] ? 'fill-current' : ''}`} />
                        </motion.button>
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); downloadImage(image) }}
                          className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom gradient with like count (always visible) */}
                <motion.div
                  className="absolute bottom-3 left-3 flex items-center gap-1 text-white/40 text-xs"
                  animate={{ opacity: hoveredId === image.id ? 0 : 1 }}
                >
                  <Heart className={`w-3 h-3 ${likes[image.id] ? 'fill-red-400 text-red-400' : ''}`} />
                  <span>{getLikeCount(image).toLocaleString()}</span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden neon-border"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-dark-900/70 backdrop-blur-sm text-white hover:bg-dark-900 border border-white/10 transition-colors"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image */}
              <div className="relative bg-dark-800">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.prompt}
                  className="w-full max-h-[65vh] object-contain"
                />
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
                  }}
                />
              </div>

              {/* Info Panel */}
              <div className="p-6 bg-dark-800/90 backdrop-blur-xl border-t border-white/5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-white text-lg font-medium mb-1">"{selectedImage.prompt}"</p>
                    <div className="flex items-center gap-3 text-sm text-white/50">
                      <span>by {selectedImage.author || 'NeonAI'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {getLikeCount(selectedImage).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30 whitespace-nowrap">
                    {selectedImage.style}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium ${
                      likes[selectedImage.id]
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                    } transition-all`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Heart className={`w-5 h-5 ${likes[selectedImage.id] ? 'fill-current' : ''}`} />
                    {likes[selectedImage.id] ? 'Liked' : 'Like'}
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                  
                  <motion.button
                    onClick={() => downloadImage(selectedImage)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:from-neon-pink/30 hover:to-neon-cyan/30 transition-all ml-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
