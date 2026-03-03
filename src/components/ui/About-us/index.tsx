export const AboutUs = () => {
  return (
    <div id="about" className="flex w-full items-center justify-center py-12 px-4">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        {/* Heading */}
        <h1
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pb-12"
          style={{ fontFamily: 'Eagle Lake' }}
        >
          ABOUT US
        </h1>

        {/* Logo + Text */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">

          {/* ── TechNova Logo (favicon.png) ── */}
          <div className="w-full sm:w-[85%] md:w-[75%] lg:w-1/2 flex items-center justify-center">
            <div
              className="relative flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '420px',
                aspectRatio: '1 / 1',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(165,180,252,0.18)',
                boxShadow: '0 8px 48px rgba(99,102,241,0.25), 0 0 120px rgba(139,92,246,0.15)',
              }}
            >
              {/* Soft radial glow behind logo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.22) 0%, transparent 70%)',
                }}
              />
              <img
                src="/favicon.png"
                alt="TechNova'26 Logo"
                draggable={false}
                className="relative z-10 w-[65%] h-[65%] object-contain select-none"
                style={{
                  filter: 'drop-shadow(0 0 32px rgba(139,92,246,0.55)) drop-shadow(0 0 8px rgba(99,102,241,0.4))',
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-white flex flex-col justify-center">
            <div className="text-justify space-y-4 text-base md:text-lg leading-relaxed text-gray-200">
              <p>
                TECHNOVA is the Annual Technical Symposium of DCRUST and is one of the largest of its kind in Haryana. Technova has grown by leaps and bounds over the years. It is held over 2 days in the month of March every year and has consistently attracted participants from all over NCR region. Technova is all about technical creativity and innovation. Innovation in students is always cherished and supported. In its previous editions, Technova brought participation pool of over 2500 students from the engineering colleges and Universities located in NCR region. Many technical and entrepreneurship events are held during the fest including Robotics, Coding marathons, quizzes events. These are broadly classified into various departmental and centralized events. Apart from this, Workshops and exhibitions are also held. To highlight the social responsibility of engineers, social/environmental awareness initiatives are undertaken under the banner of various departments. Project Expo is also organised in order to encourage the practical knowledge, Hobby Expo and Poster Presentation events are another major attraction for the participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};