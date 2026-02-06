import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { TextGenerateEffect } from './components/ui/text-generate-effect.tsx';
// import Gallery from './components/ui/Gallery/index.tsx';
// import GalleryHeading from './components/ui/Gallery/GalleryHeading.tsx';
import { Faq } from './components/ui/FAQ/faq.tsx';
import { Sponsors } from './components/ui/Sponsors/Sponsor.tsx';
// import Carousel from './components/ui/About-us/Carousel.tsx';
import { AboutUs } from './components/ui/About-us/index.tsx';
import Example from './components/ui/Gallery/Gallery.tsx';
import FloatingLines from './components/ui/bg.tsx';// Import your BG component
import Footer from './components/ui/Footer/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Background ComponentWrapper */}
    <div className="relative min-h-screen">
      {/* Your Background Component - fixed position */}
      <div className="fixed inset-0 z-0">
        <FloatingLines/>
      </div>
      
      {/* Content - on top of background */}
      <div className="relative z-10">
        <App />
        {/* <TextGenerateEffect words=' Technova is all about technical creativity and innovation. Innovation in students is always cherished and supported. In its previous editions. Technova brought participation pool of over 600 students from the colleges under DCRUST.'/> */}
        <AboutUs/>
        <Example/>
        <Sponsors/>
        <Faq/>
        <Footer/>
        {/* <Sponsors/> */}
      </div>
    </div>
  </StrictMode>
);