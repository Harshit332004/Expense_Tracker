import axios from "axios";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const addToWishlist = async (name) => {
    setIsProcessing(true); // Disable pointer events during API call
    try {
      const { data } = await axios.post(`http://localhost:3000/add_to_wishlist`, {
        product_name: name,
      });
      console.log(data);
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    } finally {
      setIsProcessing(false); // Re-enable pointer events after operation
    }
  };

  const handleIconClick = async (name) => {
    if (!isProcessing && await addToWishlist(name)) {
      setIsFavorite(!isFavorite);
    }
  };

  const viewProduct = async (pid) => {
    navigate(`/product/${pid}`);
  };

  const discount = 15;
  const previousPrice = Math.round(product?.price / (1 - discount / 100));
  const roundedRating = Math.floor(product?.rating || 0);

  return (
    <div
      className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
      style={{ backgroundColor: "#fdf6ed", pointerEvents: isProcessing ? "none" : "auto" }}
    >
      <button
        onClick={() => { handleIconClick(product?.name); }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full"
        style={{ backgroundColor: "#fff" }}
      >
        <Heart
          className={isFavorite ? "fill-red-600 text-red-600" : "text-red-600"}
          size={22}
          strokeWidth={isFavorite ? 0 : 2}
        />
      </button>

      <Link className="relative mx-2.5 mt-2.5 flex h-60 overflow-hidden rounded-xl"
        to={`/product/${product?.id}`}>
        <img
          onClick={() => { viewProduct(product?.id); }}
          className="object-cover w-full h-full"
          src={product?.images[0]}
          alt={product?.name}
        />
      </Link>

      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${product?.id}`}>
          <h5 className="text-xl font-semibold mb-3 text-gray-900 text-left">{product?.name}</h5>
        </Link>

        <div className="flex items-center">
          {[...Array(roundedRating)].map((_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-6 w-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-base">{product?.rating || 0}</span>
        </div>

        <div className="mt-2 mb-5 flex items-center justify-between">
          <div className="flex items-center text-left">
            <p className="text-lg font-semibold mb-1 text-gray-900">₹{product?.price}.00</p>
            {previousPrice && (
              <>
                <p className="text-ms font-normal text-gray-500 line-through ml-4">₹{previousPrice}.00</p>
                <p className="text-sm font-semibold text-green-500 ml-4">({discount}% Off)</p>
              </>
            )}
          </div>
        </div>

        <Link
          to={`/product/${product?.pid}`}
          className="flex items-center justify-center rounded-md bg-orange-800 px-5 py-2.5 text-center text-sm font-medium text-white"
        >
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
