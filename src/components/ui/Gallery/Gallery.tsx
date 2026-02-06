'use client'

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalGallery = () => {
  return (
    <div className="w-full relative">
      {/* Heading */}
      <div className="flex justify-center items-center w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pt-12 "
            style={{ fontFamily: 'Eagle Lake' }}
          >
            GALLERY
          </h1>
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] sm:h-[250vh] md:h-[300vh]">
      <div className="sticky top-0 flex h-[60vh] sm:h-[70vh] md:h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-3 sm:gap-4 md:gap-6 px-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px] overflow-hidden rounded-lg shadow-xl flex-shrink-0"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {/* <p className=" p-4 sm:p-6 md:p-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white backdrop-blur-lg rounded-lg">
          {card.title}
        </p> */}
      </div>
    </div>
  );
};

export default HorizontalGallery;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/technova-img2.JPG",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/technova-img1.JPG",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/technova-img3.JPG",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/technova-img4.JPG",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/technova-img5.JPG",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/technova-img6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/technova-img7.JPG",
    title: "Title 7",
    id: 7,
  },
];