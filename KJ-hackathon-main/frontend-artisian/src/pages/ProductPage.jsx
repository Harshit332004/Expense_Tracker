import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/chatbot';
import ProductCard from '@/components/ProductCard';
import painting1 from '@/assets/painting1.jpg';
import painting2 from '@/assets/painting2.jpg';
import painting3 from '@/assets/painting3.jpg';
import { CategoryFilter } from '@/components/CategoryFilter';
import axios from 'axios';

// Dummy products array with categories
const dummyProducts = [
    {
        id: 1,
        image: painting1,
        title: 'Abstract Painting',
        price: 3999,
        previous_price: 1499,
        discount: 15,
        rating: 4,
        category: 'Art',
    },
    {
        id: 2,
        image: painting2,
        title: 'Nature Landscape',
        price: 2499,
        previous_price: 1499,
        discount: 15,
        rating: 5,
        category: 'Nature',
    },
    {
        id: 3,
        image: painting3,
        title: 'Modern Art Piece',
        price: 5999,
        previous_price: 1499,
        discount: 15,
        rating: 4,
        category: 'Modern',
    },
];

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            // Fetch product data from the API or use dummy products for now
            const { data } = await axios.get('http://localhost:3000/all_products');
            console.log(data);

            const products = data || dummyProducts;
            setAllProducts(products);
            setFilteredProducts(products); // Show all products by default
        } catch (error) {
            console.error('There was an error making the request:', error);
            setAllProducts(dummyProducts); // Fallback to dummy data if API call fails
            setFilteredProducts(dummyProducts); // Fallback to showing dummy products
        }
    };

    const viewProduct = async (pid) => {
        console.log(pid);
        navigate(`/product/${pid}`);
    };

    useEffect(() => {
        getAllProducts();
        return () => {
            console.log('Cleanup on component unmount');
        };
    }, []); // Fetches products only on component mount

    // Handles category selection changes and toggling
    const handleCategoryChange = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory('All'); // Reset to 'All' if the same category is clicked again
        } else {
            setSelectedCategory(category);
        }
    };

    // Apply filter logic based on selected category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(allProducts); // Show all products when 'All' is selected
        } else {
            const filtered = allProducts?.filter(product => product?.category === selectedCategory);
            setFilteredProducts(filtered); // Filter products based on selected category
        }
    }, [selectedCategory, allProducts]);

    return (
        <div className="main_container">
            <Navbar />
            <div className="main_screen">
                <div className="py-4 px-6 bg-white border-b border-gray-200">
                    <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                </div>
                <div className="product_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 mt-6 px-2 sm:px-4 lg:px-6">

                    {filteredProducts?.length > 0 ? (
                        filteredProducts?.map((product, index) => (
                            <ProductCard product={product} key={index} onClick={() => viewProduct(product?.pid)} />
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
                <Chatbot />
            </div>
        </div>
    );
};

export default ProductPage;
