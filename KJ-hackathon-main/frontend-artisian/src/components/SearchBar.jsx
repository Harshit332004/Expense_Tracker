import React, { useContext, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '@/context/SearchContext';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchResult, storeSearchResult } = useSearchResult()
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return; // Prevent empty searches
        try {
            console.log("Searching for:", searchTerm);

            // Fetch filtered products based on search params
            const { data } = await axios.post(`http://localhost:3000/search-product`, {
                search_value: searchTerm
            });
            console.log(data);
            storeSearchResult(data);
            navigate('/searchresult'); // Redirect to search results page
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e); // Fire search on Enter press
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="relative flex items-center justify-end mr-14"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Detect Enter key press
                placeholder="Search..."
                className="w-full sm:w-[25vw] px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
                <Search size={20} />
            </button>
        </form>
    );
};

export default SearchBar;
