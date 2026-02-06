export const Sponsors = () => (
  <div className="flex w-full items-start justify-center py-12">
    <div className="w-full max-w-[850px] flex flex-col items-center">
      <h1 
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pb-12"
        style={{ fontFamily: 'Eagle Lake' }}
      >
        SPONSORS
      </h1>
      
      <div className="w-full overflow-hidden relative">
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {sponsorLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 mx-8">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {sponsorLogos.map((logo, i) => (
            <div key={`duplicate-${i}`} className="flex-shrink-0 mx-8">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const sponsorLogos = [
  { src: '/sponsors/logo1.png', alt: 'Sponsor 1' },
  { src: '/sponsors/logo2.png', alt: 'Sponsor 2' },
  { src: '/sponsors/logo3.png', alt: 'Sponsor 3' },
  { src: '/sponsors/logo4.png', alt: 'Sponsor 4' },
  { src: '/sponsors/logo5.png', alt: 'Sponsor 5' },
  { src: '/sponsors/logo6.png', alt: 'Sponsor 6' },

]