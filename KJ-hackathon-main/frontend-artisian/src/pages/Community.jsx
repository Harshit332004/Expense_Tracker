import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import TawkToChat from "./Chat";
import RumbleTalkChat from "./Chat";
import { Users } from "lucide-react";

const blogs = [
    {
        title: "10 Tips for Sustainable Farming",
        description: "Discover essential practices for sustainable agriculture that can help you improve crop yields while protecting the environment.",
        link: "https://example.com/sustainable-farming-tips",
    },
    {
        title: "The Importance of Soil Health",
        description: "Learn about soil management techniques that promote soil health and enhance the productivity of your farm.",
        link: "https://example.com/soil-health-importance",
    },
    {
        title: "Maximizing Your Harvest: A Guide to Crop Rotation",
        description: "Understand the benefits of crop rotation and how it can lead to better yields and healthier soil.",
        link: "https://example.com/crop-rotation-guide",
    },
    {
        title: "Effective Pest Management Strategies",
        description: "Explore integrated pest management strategies that can help you reduce pesticide use and protect your crops.",
        link: "https://example.com/pest-management-strategies",
    },
    {
        title: "Understanding Weather Patterns for Better Farming",
        description: "Get insights into how to interpret weather patterns and use them to plan your planting and harvesting schedules.",
        link: "https://example.com/weather-patterns-farming",
    },
    {
        title: "Financial Planning for Farmers: Tips and Tools",
        description: "Access practical financial planning tools and tips to help you manage your farm's finances effectively.",
        link: "https://example.com/farming-financial-planning",
    },
];

export default function Community() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 p-4 md:p-8">
                {/* <h1 className="text-2xl font-bold mb-4 text-center">Farming Community Resources</h1>
                <p className="text-base mb-6 text-center text-gray-700">
                    Welcome to our community page! Here, you can find a curated selection of blogs and resources aimed at helping you thrive as a farmer.
                    Explore a wide range of topics, from sustainable practices and soil health to financial planning and pest management.
                    These resources are designed to provide you with the knowledge and tools you need to enhance your farming operations and ensure a successful yield.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog, index) => (
                        <Card key={index} className="shadow-lg transition-transform transform hover:scale-105">
                            <CardContent>
                                <CardTitle className="text-xl font-semibold mb-2">{blog.title}</CardTitle>
                                <p className="text-gray-700 mb-4">{blog.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div> */}
                <div className="flex items-center justify-center py-6 px-4 bg-white border-b border-gray-200">
                    <Users className="text-blue-600 mr-3" size={28} />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome to <span className="text-blue-600">{"Our Community"}</span>
                    </h1>
                </div>

                <div>
                    {/* <h1>Welcome to Elderly Community Chat</h1> */}
                    <RumbleTalkChat />
                </div>

                <div className="mt-8">
                    <Chatbot />
                </div>
            </div>
        </div>
    );
}
