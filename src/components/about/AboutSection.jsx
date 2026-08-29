import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { credentials, socials, techLogos } from '../../data/portfolio'

function CredentialPoster({ item, index, progress }) {
  const center = .335 + index * .072
  const scale = useTransform(progress, [center - .065, center, center + .065], [.82, 1, .82])
  const opacity = useTransform(progress, [center - .075, center, center + .075], [.35, 1, .35])
  const rotate = useTransform(progress, [center - .065, center, center + .065], [-7, 0, 7])
  const y = useTransform(progress, [center - .065, center, center + .065], [55, 0, -35])

  return <motion.article className="credential-poster" style={{ scale, opacity, rotate, y }}>
    <div className="credential-poster-top"><span>{item.n}</span><small>{item.label}</small></div>
    <strong aria-hidden="true">{item.n}</strong>
    <div className="credential-poster-copy"><h3>{item.title}</h3><p>{item.note}</p></div>
  </motion.article>
}

function CredentialGallery({ progress, stageStyle }) {
  const x = useTransform(progress, [.3, .65], ['35vw', '-97vw'])
  const rail = useTransform(progress, [.3, .65], [0, 1])

  return <motion.div className="credential-gallery" style={stageStyle}>
    <div className="credential-gallery-head"><p>Path &amp; recognition</p><span>Scroll to explore</span></div>
    <motion.div className="credential-gallery-track" style={{ x }}>
      {credentials.map((item, index) => <CredentialPoster key={item.label} item={item} index={index} progress={progress} />)}
    </motion.div>
    <div className="credential-gallery-progress"><motion.span style={{ scaleX: rail }} /></div>
  </motion.div>
}

export default function AboutSection() {
  const section = useRef(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const { scrollYProgress: entryProgress } = useScroll({ target: section, offset: ['start end', 'start start'] })
  const entryY = useTransform(entryProgress, [0, 1], [105, 0])
  const entryScale = useTransform(entryProgress, [0, 1], [.955, 1])
  const entryOpacity = useTransform(entryProgress, [0, .35, 1], [.25, .72, 1])
  const entryClip = useTransform(entryProgress, [0, 1], ['inset(12% 3% 0% 3% round 54px 54px 0 0)', 'inset(0% 0% 0% 0% round 0px)'])
  const titleScale = useTransform(scrollYProgress, [0, .24], [1.7, .72])
  const titleY = useTransform(scrollYProgress, [0, .24], [80, -145])
  const titleOpacity = useTransform(scrollYProgress, [.18, .34], [1, .1])
  const introY = useTransform(scrollYProgress, [.12, .28], [90, 0])
  const introOpacity = useTransform(scrollYProgress, [.12, .23, .36], [0, 1, 0])
  const credentialScale = useTransform(scrollYProgress, [.235, .305, .65], [.88, 1, .96])
  const credentialY = useTransform(scrollYProgress, [.235, .305, .65], [100, 0, -90])
  const credentialOpacity = useTransform(scrollYProgress, [.225, .295, .62, .68], [0, 1, 1, 0])
  const credentialClip = useTransform(scrollYProgress, [.225, .3], ['inset(44% 16% 44% 16% round 80px)', 'inset(0% 0% 0% 0% round 0px)'])
  const stackScale = useTransform(scrollYProgress, [.64, .76, .88], [.66, 1, .92])
  const stackY = useTransform(scrollYProgress, [.62, .76, .88], [190, 0, -110])
  const stackOpacity = useTransform(scrollYProgress, [.62, .72, .82, .88], [0, 1, 1, 0])
  const connectOpacity = useTransform(scrollYProgress, [.23, .31, .64, .73, .82, .88], [1, 0, 0, 1, 1, 0])
  const socialY = useTransform(scrollYProgress, [.84, .94], [150, 0])
  const socialScale = useTransform(scrollYProgress, [.84, .94], [.92, 1])
  const socialOpacity = useTransform(scrollYProgress, [.83, .91], [0, 1])
  const socialClip = useTransform(scrollYProgress, [.84, .94], ['inset(35% 5% 35% 5% round 40px)', 'inset(0% 0% 0% 0% round 0px)'])

  return <section className="about about-zoom section-dark" id="about" ref={section}>
    <div className="about-sticky">
      <motion.div className="about-entry-frame" style={{ y: entryY, scale: entryScale, opacity: entryOpacity, clipPath: entryClip }}>
        <motion.div className="section-kicker" style={{ opacity: connectOpacity }}><span>01</span><p>About</p></motion.div>
        <motion.h2 className="zoom-title" style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}>About <em>me</em></motion.h2>
        <motion.div className="zoom-intro" style={{ y: introY, opacity: introOpacity }}>
          <p>Computer Science student<br/>and <strong>full-stack developer.</strong></p>
        </motion.div>
        <CredentialGallery progress={scrollYProgress} stageStyle={{ scale: credentialScale, y: credentialY, opacity: credentialOpacity, clipPath: credentialClip }} />
        <motion.div className="logo-stage" style={{ scale: stackScale, y: stackY, opacity: stackOpacity }}>
          <div className="logo-stage-head"><p><b>ϟ</b> Tech stack</p><span>16 technologies</span></div>
          <div className="logo-grid">{techLogos.map(([name, file], index) => <motion.div className="logo-item" key={name} initial={{ opacity: 0, scale: .7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .025 }} title={name}><img src={`/assets/logos/${file}`} alt={name}/><small>{name}</small></motion.div>)}</div>
        </motion.div>
        <motion.div className="about-connect" style={{ opacity: connectOpacity }}><p><MapPin size={16}/> Ghazieh, Lebanon</p></motion.div>
        <motion.div className="social-stage" id="socials" style={{ y: socialY, scale: socialScale, opacity: socialOpacity, clipPath: socialClip }}>
          <div className="social-stage-head"><p>Socials</p><span>Let’s connect / 05</span></div>
          <div className="social-directory">{socials.map(({ n, label, handle, href }) => <a href={href} key={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><small>{n}</small><strong>{label}</strong><span>{handle}</span><i><ArrowUpRight /></i></a>)}</div>
        </motion.div>
      </motion.div>
    </div>
  </section>
}
