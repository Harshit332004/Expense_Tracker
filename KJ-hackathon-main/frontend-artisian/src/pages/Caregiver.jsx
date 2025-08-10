import CareTakerCard from "@/components/CareTakerCard";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Caregiver() {
  const [careGivers, setCareGivers] = useState([])

  const getCareGivers = async () => {
    try {
      // Fetch study data from the API
      const { data } = await axios.get(`http://localhost:3000/care_giver`);

      console.log(data);
      setCareGivers(data?.caregiver);

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getCareGivers()
    return () => {
      console.log('Cleanup on component unmount after getting care givers');
    };
  }, []);

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <div className="px-4 py-8">
          {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Caretakers</h1> */}

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Our Dedicated Caregiving Team
            </h1>
            <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">
              Compassionate professionals committed to your health and comfort
            </p>
          </div>

          {/* Updated responsive grid structure for caretakers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {careGivers?.map((caregiver, index) => (
              <div key={index} className="flex justify-center">
                <CareTakerCard caregiver={caregiver} />
              </div>
            ))}
          </div>
        </div>
        <Chatbot />
      </div>
    </div>
  );
}