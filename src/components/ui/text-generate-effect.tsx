"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div 
      className="dark:text-white/20 text-[#7E888F] text-2xl sm:text-3xl md:text-4xl lg:text-[38px] tracking-wider leading-relaxed text-center font-inter py-20" 
      style={{ 
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.04em',
        lineHeight: '1.4'
      }}
    >
      {renderWords()}
    </div>
  </div>
</div>
  );
};