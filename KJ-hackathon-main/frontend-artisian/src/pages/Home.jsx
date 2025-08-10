import React, { useState, useEffect } from "react";
import Chatbot from "@/components/Chatbot";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Joyride,  {STATUS} from "react-joyride";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const steps = [
    {
      target: ".first-step",
      content: "Welcome! 🎉 Use this navigation bar to explore different sections of our website easily.",
      disableBeacon: true,
    },
    {
      target: ".second-step",
      content: "Hi there! 👋 I am your virtual voice assistant, here to help you with any questions or guidance you need. 🤗",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    const hasSeenTour = sessionStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      sessionStorage.setItem("hasSeenTour", "true");
    }
  };

  const handleCategoryShift = (name) => {
    navigate('/products')
  };

  // Categories data
  const categories = [
    {
      name: "Ceramic",
      image: "https://www.soosi.co.in/cdn/shop/products/WhatsAppImage2021-03-25at7.39.50PM_580x.jpg?v=1616695308",
    },
    {
      name: "Handmade Jewellery",
      image: "https://d1bk2y5ix4k199.cloudfront.net/pics/Black-Onyx-Ganesha-gemstone-artisan-handmade-necklace-set-41355_1_full.jpg",
    },
    {
      name: "Woodworking",
      image: "https://img.freepik.com/premium-photo/traditional-woodworking-tools-displayed-table-artisan-craftsmanship-image_706399-29128.jpg",
    },
    {
      name: "Painting",
      image: "https://img.freepik.com/premium-photo/colorful-bird-is-branch-with-colorful-background_1135095-19121.jpg?uid=R132421341&ga=GA1.1.1646679099.1723902055&semt=ais_hybrid",
    },
    {
      name: "Marble Furnishings",
      image: "https://www.nismaayadecor.in/cdn/shop/files/makaio-arabescato-corchia-marble-coffee-table_4.jpg?v=1717503628&width=1080",
    },
  ];

  // Recommended products data
  const recommendedProducts = [
    {
      name: "Terracota Flower Pot",
      image: "https://storage.googleapis.com/kj-hackathon-88e7e.appspot.com/products/pid1728145940790/1",
      price: "₹150",
    },
    {
      name: "Product 2",
      image: "https://storage.googleapis.com/kj-hackathon-88e7e.appspot.com/products/pid1728146987449/1",
      price: "₹180",
    },
    {
      name: "Product 3",
      image: "https://storage.googleapis.com/kj-hackathon-88e7e.appspot.com/products/pid1728173686733/1",
      price: "₹40",
    },
    // Add more products as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % recommendedProducts.length);
    }, 1000); // Change slide every 1 second

    return () => clearInterval(interval);
  }, [recommendedProducts.length]);

  const renderCategories = () => (
    <div className="flex justify-center items-center space-x-8 py-8">
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center group" onClick={handleCategoryShift}>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-2 transition-transform duration-300 group-hover:scale-110">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-center text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  );

  const renderRecommendedProducts = () => (
    <AliceCarousel
      activeIndex={activeIndex}
      autoPlay
      autoPlayInterval={1000}
      infinite
      items={recommendedProducts.map((product, index) => (
        <div key={index} className="text-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
      ))}
      responsive={{
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
      }}
    />
  );

  return (
    <div className="main_container">
      <Joyride
        steps={steps}
        run={runTour} // Automatically starts the tour based on runTour state
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
      />
      <div className="navbar_container first-step">
        <Navbar />
      </div>

      <div className="main_screen">
        <Hero />
        <div className="container mx-auto bg-beige-100 pt-12">
          <section className="mb-12">
            <h2 className="text-3xl font-samarkan mb-4">Categories</h2>
            {renderCategories()}
          </section>
          <section className="third-step">
            <h2 className="text-3xl font-samarkan mb-4">Recommended Products</h2>
            {renderRecommendedProducts()}
          </section>

          <FAQ />
        </div>

      
          <Chatbot />
        
      </div>
    </div>
  );
};

export default Home;
