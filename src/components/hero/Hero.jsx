import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'

function MagnetAvatar() {
  const target = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handlePointer = event => {
      if (!target.current) return
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (event.clientY / window.innerHeight) * 2 - 1
      setActive(true)
      setPosition({ x: normalizedX * 78, y: normalizedY * 56 })
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])

  return <motion.div
    ref={target}
    className="hero-avatar"
    initial={{ opacity: 0, y: 30, scale: .92 }}
    animate={{ opacity: 1, x: position.x, y: active ? position.y : 0, scale: 1 }}
    transition={active ? { x: { duration: .3, ease: 'easeOut' }, y: { duration: .3, ease: 'easeOut' } } : { duration: .6, ease: 'easeInOut' }}
  >
    <img src="/assets/hero-avatar-latest.png" alt="Stylized avatar of Hussien Ghaddar" />
  </motion.div>
}

export default function Hero({ sceneRef, sceneStyle, textY }) {
  return <motion.section className="hero" id="top" ref={sceneRef} style={sceneStyle}>
    <nav>
      <a className="wordmark" href="#top">Full Stack Developer</a>
      <div className="navlinks"><a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Projects</a></div>
      <a className="nav-contact" href="mailto:hsenghaddar76@gmail.com">Let's talk <ArrowUpRight size={17} /></a>
    </nav>
    <MagnetAvatar />
    <motion.div className="hero-copy" style={{ y: textY }}>
      <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .25, ease: [.22, 1, .36, 1] }}>HI, I’M HUSSIEN</motion.h1>
    </motion.div>
    <div className="hero-bottom">
      <div className="hero-actions">
        <a href="/Hussien-Ghaddar-CV.pdf" className="hero-resume" download="Hussien-Ghaddar-CV.pdf">Get Resume <Download size={17} /></a>
        <a href="mailto:hsenghaddar76@gmail.com" className="hero-contact">Contact me <ArrowUpRight size={17} /></a>
      </div>
    </div>
  </motion.section>
}
