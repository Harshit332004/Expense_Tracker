import CareTakerCard from "@/components/CareTakerCard";
import axios from "axios";
import { useState } from "react";
import caretakerprofile1 from '../assets/caretaker_profile1.jpg'
import Navbar from "@/components/Navbar";
import DoctorProfileCard from "@/components/DoctorCard";

const Doctors = () => {
    const [doctors, setDoctors] = useState([
        {
            "id": 1,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile10.jpg?alt=media&token=c13a4634-419d-4727-9168-4ce175cdd1c6",
            "name": "Dr. Ashley Thompson",
            "description": "A compassionate pediatrician with over 10 years of experience. Dr. Thompson is dedicated to providing comprehensive care for children and ensuring their physical and emotional well-being.",
            "specialty": "Pediatrician",
            "contact": "+91 9819505196",
            "email": "ashley.thompson@gmail.com"
        },
        {
            "id": 2,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile6.jpg?alt=media&token=8c3c519a-541b-4866-9a6a-b4d431c10e5d",
            "name": "Dr. John Smith",
            "description": "An experienced cardiologist who specializes in diagnosing and treating heart conditions. Dr. Smith is known for his patient-focused approach and advanced cardiac care techniques.",
            "specialty": "Cardiologist",
            "contact": "+91 9819505197",
            "email": "john.smith@gmail.com"
        },
        {
            "id": 3,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile12.jpg?alt=media&token=a295e6c9-98d6-4836-be58-526226123aa6",
            "name": "Dr. Sarah Johnson",
            "description": "Dr. Johnson is a leading neurologist with expertise in treating complex neurological disorders, including epilepsy and Parkinson's disease. She is known for her innovative treatment methods.",
            "specialty": "Neurologist",
            "contact": "+91 9819505198",
            "email": "sarah.johnson@gmail.com"
        },
        {
            "id": 4,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile5.jpg?alt=media&token=551c0887-86f4-4be0-a773-6501561221b0",
            "name": "Dr. Robert Brown",
            "description": "A well-respected orthopedic surgeon specializing in joint replacement and minimally invasive surgical techniques. Dr. Brown has over 15 years of experience helping patients recover from injuries.",
            "specialty": "Orthopedic Surgeon",
            "contact": "+91 9819505199",
            "email": "robert.brown@gmail.com"
        },
        {
            "id": 5,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile13.jpg?alt=media&token=3a3abb01-23e6-43f6-ace7-7c32098ee457",
            "name": "Dr. Emily Davis",
            "description": "With a background in internal medicine, Dr. Davis provides primary care and chronic disease management. She focuses on personalized treatment plans and preventive healthcare.",
            "specialty": "Internal Medicine",
            "contact": "+91 9819505200",
            "email": "emily.davis@gmail.com"
        },
        {
            "id": 6,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile3.jpg?alt=media&token=f761991b-b9f9-4ff1-8f79-1c374b5bbb3c",
            "name": "Dr. Michael Wilson",
            "description": "A well-known pediatrician, Dr. Wilson has extensive experience in child health care, ranging from routine checkups to the treatment of childhood diseases.",
            "specialty": "Pediatrician",
            "contact": "+91 9819505201",
            "email": "michael.wilson@gmail.com"
        },
        {
            "id": 7,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile11.jpg?alt=media&token=e8a16164-a30b-4528-b050-7881f10ae216",
            "name": "Dr. Jessica Taylor",
            "description": "Dr. Taylor is a renowned dermatologist specializing in treating skin disorders and performing cosmetic dermatology procedures. She is highly regarded for her patient-centered care.",
            "specialty": "Dermatologist",
            "contact": "+91 9819505202",
            "email": "jessica.taylor@gmail.com"
        },
        {
            "id": 8,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile8.jpg?alt=media&token=81589dcd-dc48-4dac-bd57-15afe5fb0531",
            "name": "Dr. David Anderson",
            "description": "A leading expert in emergency medicine, Dr. Anderson is known for his ability to handle critical care situations with precision and care. He has over 20 years of experience.",
            "specialty": "Emergency Medicine",
            "contact": "+91 9819505203",
            "email": "david.anderson@gmail.com"
        },
        {
            "id": 9,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile14.jpg?alt=media&token=8df5d5dc-49fa-416d-bab1-97b1f80d1e49",
            "name": "Dr. Linda Martinez",
            "description": "Dr. Martinez is an expert gynecologist, offering both preventive and curative care. She specializes in women’s health and has a particular focus on reproductive health issues.",
            "specialty": "Gynecologist",
            "contact": "+91 9819505204",
            "email": "linda.martinez@gmail.com"
        },
        {
            "id": 10,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fdoctors%2Fdoctor_profile7.jpg?alt=media&token=4851c25d-1ebe-4a70-9783-b6480da6b49a",
            "name": "Dr. Thomas Garcia",
            "description": "A highly experienced endocrinologist, Dr. Garcia is known for his work in managing diabetes and hormonal disorders. He is dedicated to providing personalized care for his patients.",
            "specialty": "Endocrinologist",
            "contact": "+91 9819505205",
            "email": "thomas.garcia@gmail.com"
        }
    ]);

    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="px-4 py-8">
                {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Doctors</h1> */}

                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Meet Our Expert Physicians
                    </h1>
                    <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">
                        Dedicated professionals committed to your health and well-being
                    </p>
                </div>

                {/* Updated responsive grid structure for caretakers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {doctors.map((doctors, index) => (
                        <div key={index} className="flex justify-center">
                            <DoctorProfileCard doctors={doctors} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Doctors;
