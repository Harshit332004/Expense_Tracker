import React, { useState } from 'react';
import { Phone, Calendar, Mail, DollarSign, BriefcaseIcon, IndianRupee } from 'lucide-react';
import doctor_profile1 from '../assets/doctor_profile14.jpg';

const DoctorProfileCard = ({ doctor }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="w-full sm:w-[350px] md:w-[380px] lg:w-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white transform hover:-translate-y-0.5 hover:scale-102 transition-transform duration-300 min-h-[450px] flex flex-col justify-between">
            <div>
                <div className="relative">
                    <img className="w-full h-56 object-cover rounded-t-lg" src={doctor?.image} alt={doctor?.name} />
                    {/* Heart icon can be added here if needed for a favorite feature */}
                </div>
                <div className="px-4 pt-3">
                    <div className="font-bold text-base mb-2">{doctor?.name}</div>
                    <p className="text-gray-700 text-xs mb-2 text-left">{doctor?.description}</p>
                    <p className="text-gray-600 text-xs mb-3 text-left">Specialty: {doctor?.specialty}</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-purple-500" /> {/* Purple theme */}
                            <span className="text-gray-600 text-xs">{doctor?.contact}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-purple-500" /> {/* Purple theme */}
                            <span className="text-gray-600 text-xs">{doctor?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <BriefcaseIcon className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">{doctor?.experience} years experience</span>
                        </div>
                        <div className="flex items-center">
                            <IndianRupee className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="text-gray-600 text-xs">₹{doctor?.chargesPerDay}/day</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-4 mt-auto"> {/* Button container shifted to the bottom */}
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-full transition-colors duration-300">
                    <Calendar size={14} className="mr-2" />
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorProfileCard;
