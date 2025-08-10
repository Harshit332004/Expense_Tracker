import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Education() {
    return (
        <div className="main_container flex flex-col min-h-screen bg-gray-50">
            <div className="navbar_container">
                <Navbar />
            </div>
            <div className="main_screen flex-1 p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-6 text-center">Education for Farmers</h1>
                <p className="text-lg mb-6 text-center">
                    Welcome to our education platform, dedicated to providing farmers with the latest knowledge and resources to enhance their farming practices.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crop Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Learn about best practices for managing different crops, including soil health, pest control, and irrigation techniques.
                            </CardDescription>
                            <a href="/crop-management" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sustainable Farming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Discover methods to promote sustainable agriculture, including organic farming and crop rotation.
                            </CardDescription>
                            <a href="/sustainable-farming" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Weather Forecasting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Stay updated on weather patterns and learn how to prepare for seasonal changes that affect farming.
                            </CardDescription>
                            <a href="/weather-forecasting" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Market Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Understand the market trends for agricultural products and learn how to maximize your profits.
                            </CardDescription>
                            <a href="/market-trends" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Planning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Access resources for budgeting, securing loans, and managing financial risks in farming.
                            </CardDescription>
                            <a href="/financial-planning" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Technology in Agriculture</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Explore the latest technologies in agriculture, including precision farming and data analytics.
                            </CardDescription>
                            <a href="/technology-in-agriculture" className="text-blue-500 hover:underline">Read More</a>
                            <iframe width="425" height="300" 
                            className="mt-3" src="https://www.youtube.com/embed/zSCR2K81IRo?si=ff2YmvSxa7S8u9SA" title="crop management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardContent>
                    </Card>
                </div>

               

                <div className="mt-8">
                    <Chatbot />
                </div>
            </div>
        </div>
    );
}
