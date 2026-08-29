import React from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { socials } from '../../data/portfolio'

export default function Footer() {
  return <footer id="contact">
    <p>Have a project, opportunity,<br/>or just a good idea?</p>
    <a href="mailto:hsenghaddar76@gmail.com">LET’S TALK <ArrowUpRight/></a>
    <div className="footer-bottom">
      <span>© 2026 Hussien Ghaddar</span>
      <div>
        {socials.slice(0, 2).map(social => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
        <a className="footer-resume" href="/Hussien-Ghaddar-CV.pdf" download="Hussien-Ghaddar-CV.pdf">Get Resume <Download size={14}/></a>
      </div>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>
}
