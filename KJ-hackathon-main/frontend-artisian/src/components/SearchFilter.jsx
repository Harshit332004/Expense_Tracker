import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';

const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Beauty & Personal Care'
];

const SearchFilter = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [rating, setRating] = useState(0);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ searchTerm, category, priceRange, rating });
    };

    const handlePriceChange = (index, value) => {
        const newValue = parseInt(value);

        if (index === 0) {
            setPriceRange([Math.min(Math.max(newValue, 0), 9999), priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], Math.min(Math.max(newValue, 1), 10000)]);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pr-16 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="absolute right-8 top-0 mt-2 mr-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                >
                    <Search size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                >
                    <Sliders size={20} />
                </button>
            </form>

            {/* Filter Container with Smooth Transition */}
            <div
                className={`filter-container mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm transition-all duration-500 ease-in-out ${showFilters ? 'show' : ''}`}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(0, e.target.value)}
                                className="w-1/2 p-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                                placeholder="Min"
                                min="0"
                                max="9999"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(1, e.target.value)}
                                className="w-1/2 p-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                                placeholder="Max"
                                min="1"
                                max="10000"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                        >
                            <option value={0}>Any</option>
                            <option value={1}>1+ Stars</option>
                            <option value={2}>2+ Stars</option>
                            <option value={3}>3+ Stars</option>
                            <option value={4}>4+ Stars</option>
                            <option value={5}>5 Stars</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
