import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Use this instead of Next.js's router
import ProductCard from '@/components/ProductCard'; // Ensure the correct import path
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import axios from 'axios';
import { useSearchResult } from '@/context/SearchContext';
const SearchPage = () => {
    const [products, setProducts] = useState([]);

    const { searchResult, storeSearchResult } = useSearchResult()


    const handleSearchResult = (e) => {
        console.log(searchResult);
    };

    useEffect(() => {
        handleSearchResult(); // Fetch the search results when the page loads

    }, [searchResult]); // Run effect when id changes
    return (
        <div className="main_container">
            <div className="navbar_container">
                <Navbar />
            </div>
            <div className="main_screen">
                {searchResult['data-type'] === 'JSON' ? (
                    <>
                        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <Search className="text-orange-800 mr-3" size={24} />
                                <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2>
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {searchResult?.search_result?.length} {searchResult?.search_result?.length === 1 ? ` item` : ` items`}
                            </div>
                        </div>
                        <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResult?.search_result?.map((single_item) => (
                                <ProductCard product={single_item} key={single_item.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <Search className="text-orange-800 mr-3" size={24} />
                                <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2>
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {searchResult?.length} {searchResult?.length === 1 ? ` item` : ` items`}
                            </div>
                        </div>
                        <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResult?.map((single_item) => (
                                <ProductCard product={single_item} key={single_item.id} />
                            ))}
                        </div>
                    </>
                )}
                <Chatbot />
            </div>
        </div>
    );
};

export default SearchPage;
