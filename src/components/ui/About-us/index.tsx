// import Carousel from './Carousel'

import Carousel from "./Carousel";

export const AboutUs = () => (
  <div id="about" className="flex w-full items-center justify-center py-12 px-4">
    <div className="w-full max-w-[1200px] flex flex-col items-center">
      {/* Heading */}
      <h1
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pb-12"
        style={{ fontFamily: 'Eagle Lake' }}
      >
        ABOUT US
      </h1>

      {/* Carousel and Text Container */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">

        {/* Carousel - Left Side */}
        <div className="w-full sm:w-[85%] md:w-[75%] lg:w-1/2">
          <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px]">
            {/* <Carousel
              baseWidth={500}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            /> */}
            <Carousel autoplay={true} autoplayDelay={3000} pauseOnHover={true} loop={true} />
          </div>
        </div>

        {/* Text Content - Right Side */}
        <div className="w-full lg:w-1/2 text-white flex flex-col justify-center">
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-200">
            <p>
              TECHNOVA is the Annual Technical Symposium of DCRUST and is one of the largest of its kind in Haryana. Technova has grown by leaps and bounds over the years. It is held over 2 day in the month of March and has consistently attracted participants from all over NCR. Technova is all about technical creativity and innovation. Innovation in students is always cherished and supported. In its previous editions. Technova brought participation pool of over 1000 students from the colleges under DCRUST.
            </p><p>
              Many technical and entrepreneurship events are held during the fest including Robotics, Coding marathons, quizzes events. These are broadly classified into various Departmental Events. Apart from this, Workshops and exhibitions are also held. To high- light the social responsibility of Engineers, social/environmental awareness initiatives are undertaken under the banner of CEEES. Project Expo is also organised in order to encourage the practical knowledge and Hobby Expo is another major attraction.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)