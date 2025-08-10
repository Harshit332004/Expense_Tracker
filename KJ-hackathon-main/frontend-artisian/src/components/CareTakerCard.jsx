import React, { useState } from 'react';
import { Mail, Phone, DollarSign, BriefcaseIcon, Heart, IndianRupee } from 'lucide-react';
import caretakerprofile1 from '../assets/caretaker_profile12.jpg'

export default function CareTakerCard({ caregiver }) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="w-full sm:w-[350px] md:w-[380px] lg:w-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white transform hover:-translate-y-0.5 hover:scale-102 transition-transform duration-300 min-h-[450px] flex flex-col justify-between">
            <div>
                <div className="relative">
                    <img className="w-full h-56 object-cover" src={caregiver?.image} alt={caregiver?.name} />
                </div>
                <div className="px-4 pt-3">
                    <div className="font-bold text-base mb-2">{caregiver?.name}</div>
                    <p className="text-gray-700 text-xs mb-2 text-left">{caregiver?.description}</p>
                    <p className="text-gray-600 text-xs mb-2 text-left font-semibold">Experience:</p>
                    <p className="text-gray-600 text-xs mb-3 text-left pl-2">{caregiver?.experienceDescription}</p>
                    <p className="text-gray-600 text-xs mb-3 text-left">Age: {caregiver?.age} years old</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">{caregiver?.contact}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">{caregiver?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <BriefcaseIcon className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">{caregiver?.experience} years experience</span>
                        </div>
                        <div className="flex items-center">
                            <IndianRupee className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">₹{caregiver?.chargesPerDay}/day</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-full transition-colors duration-300">
                    Hire
                </button>
            </div>
        </div>
    );
}
