import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import SearchResultCard from "../components/SearchResultCard";
import CareTakerCard from "@/components/CareTakerCard";
import DoctorProfileCard from "@/components/DoctorCard";
import { useSearchResult } from "@/context/SearchContext";
import ProductCard from "@/components/ProductCard";

export default function Cart() {
  const { searchResult } = useSearchResult()
  console.log(searchResult);

  const [searchresult, setSearchResult] = useState(null)

  useEffect(() => {
    console.log(searchResult);
    const search_result = JSON.parse(localStorage.getItem("search_result"))
    setSearchResult(search_result.search_result)
  }
    , [])
  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        {searchResult?.category === 'caregivers' ? (
          <>
            <div className="px-4 py-8">
              {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Caretakers</h1> */}

              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Our Dedicated Caregiving Team
                </h1>
                <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">
                  Compassionate professionals committed to your health and comfort
                </p>
              </div>

              {/* Updated responsive grid structure for caretakers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResult?.search_result?.map((caregiver, index) => (
                  <div key={index} className="flex justify-center">
                    <CareTakerCard caregiver={caregiver} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : ((searchResult?.category === 'doctors') ? (
          <>
            <div className="px-4 py-8">
              {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Doctors</h1> */}

              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Meet Our Expert Doctors
                </h1>
                <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">
                  Dedicated professionals committed to your health and well-being
                </p>
              </div>

              {/* Updated responsive grid structure for caretakers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResult?.search_result?.map((doctor, index) => (
                  <div key={index} className="flex justify-center">
                    <DoctorProfileCard doctor={doctor} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>

            <div className="">
              <div className="section_header">Products Found ({searchResult?.search_result?.length})</div>
              <div className="search_result_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 py-6">
                {searchResult?.search_result?.map((single_item, index) => (
                  <ProductCard singleprod={single_item} key={index} />
                ))}
              </div>
            </div>
          </>
        )
        )}
        <Chatbot />
      </div>
    </div >
  );
}
