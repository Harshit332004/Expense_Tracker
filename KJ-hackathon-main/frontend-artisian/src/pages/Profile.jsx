import axios from "axios";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Profile() {
  const [prevOrders, setPrevOrders] = useState([]);

  useEffect(() => {
    get_profile();
  }, []);

  async function get_profile() {
    try {
      const { data } = await axios.get("http://localhost:3000/get-orders");
      console.log(data);
      const prevData = data || [];

      // Use Promise.all to handle multiple async requests
      const prevOrderData = await Promise.all(
        prevData.map(async (element) => {
          const pid = element?.pid;
          const response = await axios.post('http://localhost:3000/get-single-product', { pid });
          return response?.data; // Assuming response contains product data
        })
      );

      console.log(prevOrderData);
      setPrevOrders(prevOrderData);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingBag className="text-orange-800 mr-3" size={25} />
            <h2 className="text-2xl font-semibold text-gray-800">Previous Orders</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {prevOrders?.length} {prevOrders?.length === 1 ? "item" : "items"}
          </div>
        </div>
        <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prevOrders?.map((single_item, index) => (
            <ProductCard product={single_item} key={index} />
          ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
