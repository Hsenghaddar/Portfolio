import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import FloatingMenu from './components/navigation/FloatingMenu'
import Hero from './components/hero/Hero'
import AboutSection from './components/about/AboutSection'
import ExperienceSection from './components/experience/ExperienceSection'
import ProjectsSection from './components/projects/ProjectsSection'
import Footer from './components/footer/Footer'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: .085,
      wheelMultiplier: .88,
      anchors: { offset: -24, duration: 1.2 },
    })
    return () => lenis.destroy()
  }, [])

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: .32 })
  const heroTextY = useTransform(smoothProgress, [0, .18], [0, 170])
  const heroScene = useRef(null)
  const experienceScene = useRef(null)
  const { scrollYProgress: heroExit } = useScroll({ target: heroScene, offset: ['start start', 'end start'] })
  const { scrollYProgress: experienceEntry } = useScroll({ target: experienceScene, offset: ['start end', 'start 12%'] })
  const heroScale = useTransform(heroExit, [0, 1], [1, .9])
  const heroOpacity = useTransform(heroExit, [0, .78, 1], [1, 1, .18])
  const heroRadius = useTransform(heroExit, [0, 1], ['0px', '70px'])
  const curtainScale = useTransform(experienceEntry, [0, .78], [1, 0])
  const experienceIntroY = useTransform(experienceEntry, [0, 1], [150, 0])
  const experienceIntroScale = useTransform(experienceEntry, [0, 1], [.82, 1])
  const experienceIntroOpacity = useTransform(experienceEntry, [0, .58, 1], [0, .35, 1])

  return <main>
    <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
    <FloatingMenu />
    <Hero sceneRef={heroScene} sceneStyle={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroRadius }} textY={heroTextY} />
    <AboutSection />
    <ExperienceSection sceneRef={experienceScene} curtainScale={curtainScale} introStyle={{ y: experienceIntroY, scale: experienceIntroScale, opacity: experienceIntroOpacity }} />
    <ProjectsSection />
    <Footer />
  </main>
}
