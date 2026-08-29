import React from 'react'
import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div className={`reveal ${className}`} initial={{ opacity: 0, y: 64, filter: 'blur(10px)', clipPath: 'inset(0 0 16% 0)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 1.05, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>
}
