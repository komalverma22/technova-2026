// import Masonry from "./Masonry";

import GalleryMasonry from "./galleryImg";

const GalleryHeading = () => {
  return (
    <div
      className=" w-full"
      style={{
        // background: "linear-gradient(180deg, #020B1B 0%, #031433 50%, #010E25 100%)",
      }}
    >
            <div className="flex justify-center items-center w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          className="text-[#F2F5F7] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pt-12"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          GALLERY
        </h1>
      </div>
    </div>
   <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-15">
  <GalleryMasonry />
</div>

    
    </div>
   
  );
};

export default GalleryHeading;
