import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function FloatingMenu() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * .82)
    const closeOnEscape = event => event.key === 'Escape' && setOpen(false)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    ['01', 'Home', '#top'],
    ['02', 'About', '#about'],
    ['03', 'Experience', '#experience'],
    ['04', 'Projects', '#work'],
    ['05', 'Socials', '#socials'],
  ]

  return <>
    <AnimatePresence>
      {(visible || open) && <motion.button className={`floating-menu-trigger ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(value => !value)} initial={{ opacity: 0, scale: .6, rotate: -35 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .7 }} transition={{ duration: .5, ease: [.16, 1, .3, 1] }}><span/><span/></motion.button>}
    </AnimatePresence>
    <AnimatePresence>
      {open && <motion.div className="floating-menu-overlay" initial={{ clipPath: 'circle(0% at calc(100% - 55px) 55px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 55px) 55px)' }} exit={{ clipPath: 'circle(0% at calc(100% - 55px) 55px)' }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }}>
        <div className="floating-menu-ghost" aria-hidden="true">MENU</div>
        <motion.div className="floating-menu-top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .42 }}><span>Hussien Ghaddar</span></motion.div>
        <nav className="floating-menu-links">{links.map(([n, label, href], index) => <motion.a href={href} key={label} onClick={() => setOpen(false)} initial={{ y: '115%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} exit={{ y: '115%' }} transition={{ delay: .2 + index * .075, duration: .72, ease: [.16, 1, .3, 1] }}><small>{n}</small><strong>{label}</strong><ArrowUpRight/></motion.a>)}</nav>
        <motion.div className="floating-menu-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .68 }}><a href="mailto:hsenghaddar76@gmail.com">Let’s talk <ArrowUpRight/></a></motion.div>
      </motion.div>}
    </AnimatePresence>
  </>
}
