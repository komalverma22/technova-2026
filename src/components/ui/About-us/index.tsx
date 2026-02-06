import Carousel from './Carousel'

export const AboutUs = () => (
  <div className="flex w-full items-center justify-center py-12 px-4">
    <div className="w-full max-w-[1200px] flex flex-col items-center">
      {/* Heading */}
      <h1 
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pb-12"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        ABOUT US
      </h1>
      
      {/* Carousel and Text Container */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        
        {/* Carousel - Left Side */}
        <div className="w-full lg:w-1/2">
          <div style={{ height: '400px', position: 'relative' }} className="md:h-[500px] lg:h-[600px]">
            <Carousel
              baseWidth={300}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        {/* Text Content - Right Side */}
        <div className="w-full lg:w-1/2 text-white flex flex-col justify-center">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Who We Are
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-200">
            <p>
              We are a passionate team dedicated to creating exceptional experiences 
              and pushing the boundaries of what's possible. Our journey began with 
              a simple vision: to make a difference through innovation and creativity.
            </p>
            <p>
              With years of experience and a commitment to excellence, we've built 
              a community that shares our values and vision. Every project we undertake 
              is driven by our dedication to quality and our desire to exceed expectations.
            </p>
            <p>
              Our team brings together diverse talents and perspectives, united by 
              a common goal: to deliver outstanding results and create lasting impact. 
              We believe in continuous learning, collaboration, and staying ahead of 
              the curve.
            </p>
            <p>
              Join us on this exciting journey as we continue to grow, innovate, 
              and shape the future together.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)