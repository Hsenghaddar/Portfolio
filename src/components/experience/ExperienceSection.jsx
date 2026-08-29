import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../../data/portfolio'

function ExperienceCard({ item, index, total, progress }) {
  const start = index / total
  const end = Math.min(1, (index + 1.15) / total)
  const targetScale = 1 - (total - 1 - index) * .025
  const scale = useTransform(progress, [start, end], [1, targetScale])
  return <motion.article className="experience-card" style={{ scale, top: `${76 + index * 28}px`, zIndex: index + 1 }}>
    <div className="experience-card-top"><span>0{index + 1}</span><p>{item.period}</p></div>
    <div className="experience-card-main">
      <div><p className="experience-label">Experience</p><h3>{item.company}</h3></div>
      <div><p className="experience-label">Role</p><h4>{item.role}</h4><p className="experience-detail">{item.detail}</p></div>
    </div>
    <div className="experience-card-line"><span /></div>
  </motion.article>
}

function ExperienceStack() {
  const stack = useRef(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })
  return <div className="experience-stack" ref={stack}>
    {experience.map((item, index) => <ExperienceCard key={item.company} item={item} index={index} total={experience.length} progress={scrollYProgress} />)}
  </div>
}

export default function ExperienceSection({ sceneRef, curtainScale, introStyle }) {
  return <section className="experience" id="experience" ref={sceneRef}>
    <motion.div className="experience-curtain" style={{ scaleY: curtainScale }} />
    <motion.div className="experience-intro" style={introStyle}>
      <div className="section-kicker dark"><span>02</span><p>Experience</p></div>
      <h2>Where I’ve<br/>made an impact.</h2>
    </motion.div>
    <ExperienceStack />
  </section>
}
