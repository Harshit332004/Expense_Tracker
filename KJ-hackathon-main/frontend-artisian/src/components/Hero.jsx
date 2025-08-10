import React, { useState, useEffect } from "react";

const Hero = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      background:
        "https://img.freepik.com/free-photo/close-up-hands-working-pottery_23-2151680832.jpg?t=st=1728197498~exp=1728201098~hmac=6c21b0c771ada02a98753b4426b71d0a9b44058660652c4d15dad8cd8ad7ea12&w=1380",
      title: "Ceramic",
      description: "Crafting Elegance in Every Piece.",
    },
    {
      background:
        "https://img.freepik.com/premium-photo/professional-photographer-capturing-artist-painting_1168612-147202.jpg?w=1380",
      title: "Paintings",
      description: "Bringing Emotions to Life on Canvas.",
    },
    {
      background:
        "https://img.freepik.com/premium-photo/professional-photographer-capturing-artist-sculpting_1168612-147079.jpg?w=1380",
      title: "Sculptures",
      description: "Bringing Art to everything",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full h-[30rem] md:h-[calc(90vh)] overflow-hidden">

      <div
        className="left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >

        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <div
              className="w-full h-full flex flex-col justify-end bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.background})` }} // Use backticks for template literals
            >

              <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                <span className="block text-white text-xl md:text-2xl font-bold mb-2 text-shadow-outline">
                  {slide.title}
                </span>
                <span className="block text-white text-3xl md:text-5xl font-bold leading-tight text-shadow-outline">
                  {slide.description}
                </span>
                <div className="mt-5">
                  <a
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-transparent text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                  >
                    Read Case Studies
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className=" inset-y-0 start-0 inline-flex justify-center items-center w-12 h-full text-black hover:bg-white/20 rounded-s-2xl focus:outline-none focus:bg-white/20"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-3.5 h-3.5 md:w-4 md:h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute inset-y-0 end-0 inline-flex justify-center items-center w-12 h-full text-black hover:bg-white/20 rounded-e-2xl focus:outline-none focus:bg-white/20"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-3.5 h-3.5 md:w-4 md:h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
