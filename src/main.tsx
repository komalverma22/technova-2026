import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Faq } from './components/ui/FAQ/faq.tsx';
import { Sponsors } from './components/ui/Sponsors/Sponsor.tsx';
import { AboutUs } from './components/ui/About-us/index.tsx';
import Example from './components/ui/Gallery/Gallery.tsx';
import FloatingLines from './components/ui/bg.tsx';
import Footer from './components/ui/Footer/Footer.tsx';
import Register from './components/ui/SignIn/Form.tsx'; // Register page import

// Home page component banao
function HomePage() {
  return (
    <>
      <App />
      <AboutUs/>
      <Example/>
      <Sponsors/>
      <Faq/>
      <Footer/>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Background - fixed */}
        <div className="fixed inset-0 z-0">
          <FloatingLines/>
        </div>
        
        {/* Routes - on top */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);