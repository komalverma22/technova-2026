

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

        {/* Poster - Left Side */}
        <div className="w-full sm:w-[85%] md:w-[75%] lg:w-1/2">
          <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px]">
            <img
              src="/poster.png"
              alt="TechNova'26 Poster"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>

        {/* Text Content - Right Side */}
        <div className="w-full lg:w-1/2 text-white flex flex-col justify-center">
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-200">
            <p>
              TECHNOVA is the Annual Technical Symposium of DCRUST and is one of the largest of its kind in Haryana. Technova has grown by leaps and bounds over the years. It is held over 2 days in the month of March every year and has consistently attracted participants from all over NCR region. Technova is all about technical creativity and innovation. Innovation in students is always cherished and supported. In its previous editions, Technova brought participation pool of over 2500 students from the engineering colleges and Universities located in NCR region. Many technical and entrepreneurship events are held during the fest including Robotics, Coding marathons, quizzes events. These are broadly classified into various departmental and centralized events. Apart from this, Workshops and exhibitions are also held. To highlight the social responsibility of engineers, social/environmental awareness initiatives are undertaken under the banner of various departments. Project Expo is also organised in order to encourage the practical knowledge, Hobby Expo and Poster Presentation events are another major attraction for the participants.
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
)