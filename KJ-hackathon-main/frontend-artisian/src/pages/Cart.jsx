import axios from "axios";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartProduct from "@/components/CartProduct";
import { ShoppingCart } from "lucide-react";
import painting1 from '@/assets/painting1.jpg';
import painting2 from '@/assets/painting2.jpg';
import painting3 from '@/assets/painting3.jpg';
import painting4 from '@/assets/painting4.jpg';
import painting5 from '@/assets/painting5.jpg';


export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    get_cart();
  }, []);

  async function get_cart() {
    try {
      const { data } = await axios.get("http://localhost:3000/cart");
      console.log(data);
      setCart(data?.cart_products);

    } catch (err) {
      console.error(err);
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
            <ShoppingCart className="text-orange-800 mr-3" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {cart?.length} {cart?.length === 1 ? ` item` : ` items`}
          </div>
        </div>
        <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cart?.map((single_item, index) => (
            <>
              <CartCard product={single_item} key={index} />
            </>
          ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
