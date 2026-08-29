import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/portfolio'
import Reveal from '../shared/Reveal'

function ProjectsPortal() {
  const portal = useRef(null)
  const { scrollYProgress } = useScroll({ target: portal, offset: ['start start', 'end end'] })
  const size = useTransform(scrollYProgress, [0, .82, 1], ['11vmin', '175vmax', '190vmax'])
  const ringScale = useTransform(scrollYProgress, [0, .7], [.55, 1.45])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 160])
  const ringRotateReverse = useTransform(ringRotate, value => -value * .72)
  const dotOpacity = useTransform(scrollYProgress, [0, .58], [1, 0])

  return <section className="projects-portal" ref={portal} aria-hidden="true">
    <div className="projects-portal-sticky">
      <motion.div className="portal-aperture" style={{ width: size, height: size }}>
        <motion.span className="portal-ring ring-one" style={{ scale: ringScale, rotate: ringRotate }} />
        <motion.span className="portal-ring ring-two" style={{ scale: ringScale, rotate: ringRotateReverse }} />
        <motion.i className="portal-dot dot-one" style={{ opacity: dotOpacity }} />
        <motion.i className="portal-dot dot-two" style={{ opacity: dotOpacity }} />
        <motion.i className="portal-dot dot-three" style={{ opacity: dotOpacity }} />
      </motion.div>
    </div>
  </section>
}

function ProjectCard({ project }) {
  const Card = project.href ? 'a' : 'article'
  const linkProps = project.href ? { href: project.href, target: '_blank', rel: 'noreferrer', 'aria-label': `View ${project.title} on GitHub` } : {}
  const followCursor = event => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - rect.top}px`)
  }

  return <Card className={`project-card ${project.accent} ${project.href ? 'has-link' : ''}`} onMouseMove={project.href ? followCursor : undefined} {...linkProps}>
    {project.href && <span className="project-cursor" aria-hidden="true"><ArrowUpRight /></span>}
    <div className="project-visual"><span className="project-number">{project.n}</span><div className="visual-window"><span>&lt;</span><span>/</span><span>&gt;</span></div></div>
    <div className="project-copy"><p className="project-kind">{project.kind}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-footer"><div>{project.tech.map(technology => <span key={technology}>{technology}</span>)}</div></div></div>
  </Card>
}

export default function ProjectsSection() {
  return <>
    <ProjectsPortal />
    <section className="projects section-dark" id="work">
      <div className="section-kicker"><span>03</span><p>Selected work</p></div>
      <Reveal><h2>Projects that<br/><em>solve things.</em></h2></Reveal>
      <div className="project-grid">{projects.map((project, index) => <Reveal key={project.title} delay={(index % 2) * .08}><ProjectCard project={project} /></Reveal>)}</div>
    </section>
  </>
}
