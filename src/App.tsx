import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
function App() {
  const [heroImage, setHeroImage] = useState("/hero1.png");
  const [heroIndex, setHeroIndex] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Cookie check is synchronous — runs before first paint via useEffect
    const hasToken = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));
    setIsAuthenticated(hasToken);
  }, []);

  const handleImageHover = (image: string, index: number) => {
    setHeroImage(image);
    setHeroIndex(index);
  };

  return (
    <div className="relative min-h-screen bg-slate-600 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-2 sm:pt-[10.8px]">
        <div className="max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-sm rounded-lg sm:rounded-xl py-2 sm:py-[9px] overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="inline-block mx-4 sm:mx-[28.8px] text-[10px] sm:text-[12.6px] font-medium text-slate-900 whitespace-nowrap"
              >
                TECHNOVA'26
              </span>
            ))}
          </div>
        </div>
      </div>
{/* navbar */}
      <nav className="fixed top-[42px] sm:top-[50.4px] left-0 right-0 z-40 px-3 sm:px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-[28.8px] py-3 sm:py-[14.4px] flex items-center justify-between">
          <div className="text-lg sm:text-[21.6px] font-bold text-slate-900 tracking-tight">
            TÉCHNOVA
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-[25.2px] text-[13.5px] ml-auto">
            <a
              href="/"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Home
            </a>
            <Link
              to="/gallery"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Gallery
            </Link>
            <a
              href="/events"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Events
            </a>
            <Link
              to="/getting-here"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Getting Here
            </Link>
            <Link
              to="/brochure"
              className="text-slate-900 hover:text-black transition-colors font-medium"
            >
              Brochure
            </Link>
          
            {/* <a href="#" className="text-slate-900 hover:text-black transition-colors flex items-center gap-2 font-medium">
              <ShoppingBag className="w-[16.2px] h-[16.2px]" />
              Bag
              <span className="flex items-center justify-center w-[21.6px] h-[21.6px] rounded-full border border-slate-900 text-[12.6px] font-medium">0</span>
            </a> */}
          </div>

          <div className="flex items-center gap-2">
            {/* Render nothing until auth is resolved → no flash */}
            {isAuthenticated === true && (
              <Link
                to="/account"
                className="text-slate-900 hover:text-black transition-colors"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
            {isAuthenticated === false && (
              <div className="hidden lg:flex items-center gap-2">
                
                <Link
                  to="/signup"
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-[13px] font-semibold text-white transition hover:bg-slate-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-900 hover:text-black transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-3xl mx-auto bg-slate-300/95 backdrop-blur-md rounded-xl px-4 py-4">
            <div className="flex flex-col gap-3 text-sm">
              <a href="/" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Home</a>
              <Link to="/gallery" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Gallery</Link>
              <a href="/events" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Events</a>
              <Link to="/getting-here" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Getting Here</Link>
              <Link to="/brochure" className="text-slate-900 hover:text-black transition-colors font-medium py-2">Brochure</Link>
              {/* Auth links in mobile menu */}
              {isAuthenticated === true && (
                <Link to="/account" className="flex items-center gap-2 text-slate-900 hover:text-black transition-colors font-medium py-2">
                  <User className="w-4 h-4" />
                  My Account
                </Link>
              )}
              {isAuthenticated === false && (
                <>
              
                  <Link to="/signup" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="relative h-screen pt-[80px] sm:pt-[90px] md:pt-[100.8px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion model in blue denim"
            className="w-full h-full object-cover transition-all duration-500"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </div>

        <div className="relative h-full px-4 sm:px-6 md:pl-8 flex flex-col justify-end gap-8 sm:gap-12 md:gap-16 pb-8 sm:pb-10 md:pb-12 pt-12 sm:pt-16 md:pt-20">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-[0.95] tracking-tight mb-4 sm:mb-6">
              Technova'26 <br />
              The Future is Here
            </h1>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white/30 leading-none transition-all duration-300">
                {heroIndex.toString().padStart(2, "0")}
              </span>
              <div className="flex gap-2 sm:gap-3">
                <div
                  className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer"
                  onClick={() => handleImageHover("/hero1.png", 1)}
                  onMouseEnter={() => handleImageHover("/hero1.png", 1)}
                >
                  <img
                    src="/hero1.png"
                    alt="Collection preview 1"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer"
                  onClick={() => handleImageHover("/hero2.png", 2)}
                  onMouseEnter={() => handleImageHover("/hero2.png", 2)}
                >
                  <img
                    src="/hero2.png"
                    alt="Collection preview 2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="w-20 h-12 sm:w-24 sm:h-14 md:w-[128px] md:h-[72px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer"
                  onClick={() => handleImageHover("/hero3.png", 3)}
                  onMouseEnter={() => handleImageHover("/hero3.png", 3)}
                >
                  <img
                    src="/hero3.png"
                    alt="Collection preview 3"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Hero Log In button — only when auth is confirmed false */}
            {isAuthenticated === false && (
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
                <p className="text-xs sm:text-[13.6px] text-white/90 leading-relaxed text-center px-4">
                  Layer up with confidence and
                  <br />
                  stylish all season
                </p>
                <Link to="/login">
                  <button className="bg-white hover:bg-slate-400/85 text-slate-900 font-semibold text-[10px] sm:text-[16px] px-4 sm:px-[22.4px] py-2 sm:py-[11.2px] rounded-lg transition-all">
                    Log In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
