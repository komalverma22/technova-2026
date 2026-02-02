import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TextGenerateEffect } from './components/ui/text-generate-effect.tsx';
// import Gallery from './components/ui/Gallery/index.tsx';
import GalleryHeading from './components/ui/Gallery/GalleryHeading.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <TextGenerateEffect words=' Technova is all about technical creativity and innovation. Innovation in students is always cherished and supported. In its previous editions. Technova brought participation pool of over 600 students from the colleges under DCRUST.'/>
   <GalleryHeading/>
  </StrictMode>
);
