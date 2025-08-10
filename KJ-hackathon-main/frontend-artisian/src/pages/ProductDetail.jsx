import React, { useEffect, useState } from 'react';
import { Star, ShoppingCart, CreditCard, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Navbar from '@/components/Navbar';

const ProductDetail = () => {
    const { pid } = useParams();
    const [product, setProduct] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const getProductDetails = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:3000/get-single-product`, { pid: pid }
            );
            setProduct(data);
            setMainImage(data?.images[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async () => {
        try {
            const { data } = await axios.post(`http://localhost:3000/add_to_cart`, {
                product_name: product?.name,
                quantity: quantity
            });
            console.log(data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const buyNow = async () => {
        try {
            const { data } = await axios.post(`http://localhost:3000/create-order`, {
                name: 'Aryan Maurya',
                email: "aryan.maurya@gmail.com",
                pid: product?.pid,
                amount: product?.price,
                address: 'Mumbai',
                qauntity: 1
            });
            console.log(data);
            window.open("https://razorpay.com/payment-link/plink_P5gDkh02tQ43T4/test")
        } catch (error) {
            console.log(error);
            return false;
        }
    };


    const handleImageChange = (image) => {
        setMainImage(image);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    useEffect(() => {
        getProductDetails();
    }, []);

    if (!product) return <div>Loading...</div>;

    const discount = 15;
    const previousPrice = Math.round(product?.price / (1 - discount / 100));

    return (
        <div className="main_container">
            <div className="navbar_container">
                <Navbar />
            </div>
            <div className="main_screen">
                <div className="min-h-screen bg-gray-100 p-4 w-full">
                    <div className="w-full h-full bg-white rounded-lg shadow-xl p-6 flex flex-col gap-4">
                        <button onClick={() => navigate(-1)} className="flex items-center text-orange-800 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to results
                        </button>
                        <div className="flex flex-col md:flex-row gap-8 h-full">
                            {/* Image section */}
                            <div className="w-2/3 flex flex-row gap-4">
                                {/* Thumbnails */}
                                <div className="flex flex-col gap-2 w-[100px]">
                                    {product.images?.map((image, index) => (
                                        <div key={index} className="bg-gray-200 rounded-lg h-20">
                                            <img
                                                src={image}
                                                alt="Thumbnail"
                                                onClick={() => handleImageChange(image)}
                                                className="w-full h-full object-fill cursor-pointer rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Main image */}
                                <div className={`bg-gray-200 rounded-lg flex-1 flex items-center justify-center ${isAnimating ? 'swashIn' : ''}`}>
                                    <img
                                        src={mainImage}
                                        alt="Product"
                                        className="w-full h-full object-fill rounded-lg"
                                    />
                                </div>
                            </div>
                            {/* Product details section */}
                            <div className="md:w-1/2 flex flex-col justify-between">
                                <div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-left">{product.name}</h1>
                                    </div>

                                    <div className="border-b border-gray-200 py-4">
                                        <div className="mt-2 mb-1 flex items-center justify-between">
                                            <div className="flex items-center text-left">
                                                <p className="text-xl font-semibold mb-1 text-gray-900">₹{product?.price}.00</p>
                                                {previousPrice && (
                                                    <>
                                                        <p className="text-ms font-normal text-gray-500 line-through ml-4">₹{previousPrice}.00</p>
                                                        <p className="text-sm font-semibold text-green-500 ml-4">({discount}% Off)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <div className="flex mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <span className="text-gray-600 text-xm">(5.0)</span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 text-left">(Inclusive of all taxes)</p>
                                        <p className="text-green-600 text-sm text-left">
                                            {product.stock > 0 ? 'In stock' : 'Out of stock'}
                                        </p>

                                        {/* Quantity selector */}
                                        <div className="flex items-center mt-3">
                                            <span className="mr-3 text-gray-700">Quantity:</span>
                                            <button onClick={decrementQuantity} className="bg-gray-200 px-2 py-1 rounded-l">
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="bg-gray-100 px-4 py-0.5">{quantity}</span>
                                            <button onClick={incrementQuantity} className="bg-gray-200 px-2 py-1 rounded-r">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-200 py-4">
                                        <h3 className="font-semibold mb-2 text-left">About the product</h3>
                                        <p className="text-gray-700 text-left">
                                            {showMore ? product.desc : `${product.desc?.substring(0, 600)}...`}
                                            <button
                                                className="text-blue-600 ml-1"
                                                onClick={() => setShowMore(!showMore)}
                                            >
                                                {showMore ? 'See Less' : 'See More'}
                                            </button>
                                        </p>
                                    </div>

                                    <div className="py-4 text-left">
                                        <p className="flex flex-col text-gray-700 mb-2 text-left">
                                            <div>Seller: <span className="font-semibold">{'Anrtikas'}</span></div>
                                            <div>Category: <span className="font-semibold capitalize">{product.category}</span></div>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        className="flex-1 bg-white border border-orange-800 text-orange-800 hover:bg-orange-50 py-2 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                                        onClick={addToCart}>
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        <span className="ml-1">Add to Cart</span>
                                    </button>
                                    <button onClick={buyNow} className="flex-1 bg-orange-800 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        <span className="ml-1">Buy Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
