import { useEffect, useState } from 'react'
import { ScrollTrigger } from './animations/helpers.js'
import useSmoothScroll from './utils/useSmoothScroll.js'

import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import BackToTop from './components/BackToTop.jsx'

import Hero from './sections/Hero.jsx'
import Intro from './sections/Intro.jsx'
import Story from './sections/Story.jsx'
import Philosophy from './sections/Philosophy.jsx'
import Services from './sections/Services.jsx'
import Products from './sections/Products.jsx'
import Numbers from './sections/Numbers.jsx'
import WhyLumea from './sections/WhyLumea.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Gallery from './sections/Gallery.jsx'
import Experience from './sections/Experience.jsx'
import FinalCTA from './sections/FinalCTA.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  useSmoothScroll(!loading)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  // Recalculate trigger positions once assets (images/fonts) settle.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  const handleLoaded = () => {
    setLoading(false)
    window.dispatchEvent(new CustomEvent('lumea:ready'))
  }

  return (
    <>
      {loading && <Loader onComplete={handleLoaded} />}

      <Header />

      <main>
        <Hero />
        <Intro />
        <Story />
        <Philosophy />
        <Services />
        <Products />
        <Numbers />
        <WhyLumea />
        <Testimonials />
        <Gallery />
        <Experience />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />

      <ScrollProgress />
      <CustomCursor />
      <WhatsAppButton />
      <BackToTop />
    </>
  )
}
