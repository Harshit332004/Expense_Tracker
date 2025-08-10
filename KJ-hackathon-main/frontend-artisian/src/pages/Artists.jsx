import axios from "axios";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import UserCard from "@/components/UserCard";

export default function Artists() {
    const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="main_container">
            <div className="navbar_container">
                <Navbar />
            </div>
            <div className="main_screen">
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
                    <div className="flex items-center">
                        <ShoppingBag className="text-orange-800 mr-3" size={25} />
                        <h2 className="text-2xl font-semibold text-gray-800">Artists</h2>
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                        {count?.length} {count?.length === 1 ? "item" : "items"}
                    </div>
                </div>
                <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {count?.map((index) => (
                        <UserCard key={index} />
                    ))}
                </div>
                <Chatbot />
            </div>
        </div>
    );
}
