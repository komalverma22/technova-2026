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
import AccountPage from './components/ui/Account/AccountPage.tsx';
import LoginPage from './components/ui/SignIn/Login.tsx';
import EventsPage from './components/ui/Events/EventsPage.tsx';
import AdminDashboard from './components/ui/Admin/AdminDashboard.tsx';
import AdminEventsPage from './components/ui/Admin/AdminEventsPage.tsx';

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
            <Route path="/events" element={<EventsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/events" element={<AdminEventsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);