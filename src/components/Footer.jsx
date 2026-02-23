import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Mail,
  MapPin
} from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Gallery', 'Pricing', 'API'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Support'],
    Company: ['About', 'Careers', 'Contact', 'Press'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative pt-20 pb-8 px-6 overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-16 p-8 md:p-12 rounded-3xl neon-border relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-cyan/5" />
          
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-cyber font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
                Ready to Create?
              </span>
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Start generating amazing AI images right now. No signup required.
            </p>
            <motion.a
              href="#generate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              Start Creating Now
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-8 h-8 text-neon-cyan" />
              <span className="text-2xl font-cyber font-bold">
                <span className="text-neon-pink">NEON</span>
                <span className="text-neon-cyan">AI</span>
              </span>
            </motion.div>
            <p className="text-white/50 mb-6 max-w-xs">
              Transform your imagination into stunning visuals with the power of AI.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-dark-700 text-white/50 hover:text-neon-cyan hover:bg-dark-600 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-white/50 hover:text-neon-cyan transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 py-6 border-t border-white/10">
          <motion.a
            href="mailto:hello@neonai.com"
            className="flex items-center gap-2 text-white/50 hover:text-neon-cyan transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4" />
            hello@neonai.com
          </motion.a>
          <motion.span
            className="flex items-center gap-2 text-white/50"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-4 h-4" />
            San Francisco, CA
          </motion.span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/40 text-sm">
            © 2026 NeonAI. All rights reserved.
          </p>
          
          <motion.p
            className="flex items-center gap-1 text-white/40 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> by the NeonAI Team
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-neon-pink/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-neon-cyan/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </footer>
  )
}

export default Footer
