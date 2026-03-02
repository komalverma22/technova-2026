import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import App from './App.tsx';
import './index.css';

// ── PDF.js worker — configured ONCE here so both BrochurePage and
// SchedulePage share the same worker instance without conflicts.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
import { Faq } from './components/ui/FAQ/faq.tsx';
import { Sponsors } from './components/ui/Sponsors/Sponsor.tsx';
import { AboutUs } from './components/ui/About-us/index.tsx';
import Example from './components/ui/Gallery/Gallery.tsx';
import GalleryPage from './components/ui/Gallery/GalleryPage.tsx';
import GettingHerePage from './components/ui/Getting-here/gettingHere.tsx';
import FloatingLines from './components/ui/bg.tsx';
import Footer from './components/ui/Footer/Footer.tsx';
import Register from './components/ui/SignIn/Form.tsx'; // Register page import
import AccountPage from './components/ui/Account/AccountPage.tsx';
import LoginPage from './components/ui/SignIn/Login.tsx';
import EventsPage from './components/ui/Events/EventsPage.tsx';
import EventDetailPage from './components/ui/Events/EventDetailPage.tsx';
import EventRegistrationPage from './components/ui/Events/EventRegistrationPage.tsx';
import { HomeEventsSection } from './components/ui/Events/HomeEventsSection.tsx';
import AdminDashboard from './components/ui/Admin/AdminDashboard.tsx';
import AdminEventsPage from './components/ui/Admin/AdminEventsPage.tsx';
import AdminGuard from './components/ui/Admin/AdminGuard.tsx';
import BrochurePage from './components/ui/Brochure/BrochurePage.tsx';
import SchedulePage from './components/ui/Schedule/SchedulePage.tsx';
import ContactPage from './components/ui/Contact/ContactPage.tsx';

import Carousel from './components/ui/About-us/Carousel.tsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './components/ui/button.tsx';

// Home page component banao
function HomePage() {
  return (
    <>
      <App />
      <AboutUs />
      {/* <Example/> */}
      <HomeEventsSection />

      {/* ── Gallery Preview Section ── */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-indigo-400 font-semibold mb-2">
            Moments from the Past
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
            style={{ textShadow: '0 0 40px rgba(99,102,241,0.35)' }}
          >
            Gallery
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative h-[240px] sm:h-[360px] md:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            <Carousel autoplay={true} autoplayDelay={3000} pauseOnHover={true} loop={true} />
          </div>

          {/* Visit Gallery button – identical to View All Events */}
          <div className="mt-12 flex justify-center">
            <Link to="/gallery">
              <Button variant="white" size="lg" className="gap-2 px-8 py-6 text-base">
                Visit Full Gallery
                <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <Sponsors/> */}
      <Faq />
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Background - fixed */}
        <div className="fixed inset-0 z-0">
          <FloatingLines />
        </div>

        {/* Routes - on top */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/getting-here" element={<GettingHerePage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/events/:id/register" element={<EventRegistrationPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/dashboard/events" element={<AdminGuard><AdminEventsPage /></AdminGuard>} />
            <Route path="/brochure" element={<BrochurePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);