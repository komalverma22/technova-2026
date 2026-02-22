import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../Footer/Footer";

const galleryImages = [
  { id: 1, src: "/technova-img1.JPG", alt: "Technova Gallery 1" },
  { id: 2, src: "/technova-img2.JPG", alt: "Technova Gallery 2" },
  { id: 3, src: "/technova-img3.JPG", alt: "Technova Gallery 3" },
  { id: 4, src: "/technova-img4.JPG", alt: "Technova Gallery 4" },
  { id: 5, src: "/technova-img5.JPG", alt: "Technova Gallery 5" },
  { id: 6, src: "/technova-img6.jpg", alt: "Technova Gallery 6" },
  { id: 7, src: "/technova-img7.JPG", alt: "Technova Gallery 7" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  const currentIndex = selectedImage
    ? galleryImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handleNext = () => {
    if (currentIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(galleryImages[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-[120px] sm:pt-[130px]">
      {/* Heading */}
      <div className="flex justify-center items-center w-full mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight"
            style={{ fontFamily: "Eagle Lake" }}
          >
            GALLERY
          </h1>
          <p className="text-center text-slate-400 mt-4 text-sm sm:text-base">
            Explore moments from Technova
          </p>
        </div>
      </div>

      {/* Gallery Grid - 4 columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentIndex < galleryImages.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 rounded-full p-2 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
