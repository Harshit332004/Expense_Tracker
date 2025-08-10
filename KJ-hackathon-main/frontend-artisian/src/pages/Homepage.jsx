import "../styles/homepage.css";

import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../assets/urbanGardening1.png";
import img2 from "../assets/urbanGardening2.jpg";
import img3 from "../assets/urbanGardening3.jpg";
import Chatbot from "../components/chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    get_all_product();
  }, []);

  async function get_all_product() {
    try {
      const { data } = await axios.get("http://localhost:3000/all_products");
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>

      <div className="main_screen">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full relative h-[90vh]">
            <div className="flex flex-col justify-center items-center ml-8 mt-8 w-5/6">
              <h1 className="text-5xl font-bold mb-4">
                Restoring{" "}
                <img
                  src="https://nitk-23.vercel.app/static/media/fire.8fb21b7ff600f23e03bb851432d3dada.svg"
                  alt="Fire Icon"
                  className="inline-block"
                />
                <br />
                Connection and Care
                <br />
                with
                <br />
                Caremate
              </h1>
              <div className="mb-8">
                <p className="font-bold text-lg mt-2 text-gray-600 w-5/6 text-center  ml-8">
                  Supporting your loved ones with compassionate care and
                  seamless assistance.
                </p>
              </div>
              <div className="flex space-x-4 items-center">
                <button
                  className="bg-purple-500 text-white rounded-full px-8 py-3 shadow-lg hover:scale-105 transform transition duration-300"
                  onClick={() => navigate("/dashboard")}
                >
                  <b>Start now</b>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full border border-gray-300 shadow-md flex justify-center items-center cursor-pointer hover:scale-105 transform transition duration-300">
                    <div className="ml-1 border-solid border-l-[0.5rem] border-t-[0.25rem] border-b-[0.25rem] border-transparent border-l-blue-900"></div>
                  </div>
                  <p className="font-semibold">How it works</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="elderImage2.png"
                alt="Landing Gif"
                className="w-4/5 h-auto object-contain"
              />
            </div>
          </div>

          <div className="bottom_wrapper bg-white pt-2">
            <div className="section_header mb-8">MarketPlace</div>
            <div className="grid  grid-cols-2 w-11/12 mx-auto gap-5 md:gap-10 sm:grid-cols-3 md:grid-cols-4">
              {products?.map((singleprod, index) => (
                <ProductCard singleprod={singleprod} key={index} />
              ))}
            </div>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
