// Heading Component
export const Heading = ({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          className="text-[#F2F5F7] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
};