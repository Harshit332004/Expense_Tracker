import CareTakerCard from "@/components/CareTakerCard";
import axios from "axios";
import { useState } from "react";
import caretakerprofile1 from '../assets/caretaker_profile1.jpg'
import Navbar from "@/components/Navbar";

const CareTaker = () => {
    const [careTakers, setCareTakers] = useState([
        {
            "id": 1,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile12.jpg?alt=media&token=2bcedbdd-3e34-423b-a647-4e7ed7d31887",
            "name": "Emily Davis",
            "description": "A passionate nurse experienced in post-operative care, providing critical support to patients recovering from surgery. My focus is on ensuring a smooth recovery process through personalized care and attention.",
            "age": 28,
            "contact": "+91 9819505200",
            "email": "emily.davis@gmail.com",
            "experienceDescription": "Emily has 3 years of experience in post-operative nursing, helping patients recover swiftly and safely while providing compassionate care.",
            "experience": "3",
            "chargesPerDay": "900"
        },
        {
            "id": 2,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile7.jpg?alt=media&token=a9fc72b6-b980-481f-906c-4cd8ae14e7d7",
            "name": "Michael Wilson",
            "description": "A dedicated caregiver focusing on pediatric health education and wellness. I work closely with families to create a supportive environment for children's health and growth.",
            "age": 38,
            "contact": "+91 9819505201",
            "email": "michael.wilson@gmail.com",
            "experienceDescription": "With 7 years of experience in pediatric health, Michael has developed extensive expertise in educating families and promoting healthy lifestyles for children.",
            "experience": "7",
            "chargesPerDay": "1300"
        },
        {
            "id": 3,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile2.jpg?alt=media&token=6d90025a-fcea-40c3-89fa-f5c7cad83938",
            "name": "Jessica Taylor",
            "description": "A compassionate caregiver with experience in rehabilitation and physical therapy. I focus on helping clients regain their independence through customized recovery plans.",
            "age": 30,
            "contact": "+91 9819505202",
            "email": "jessica.taylor@gmail.com",
            "experienceDescription": "Jessica has 5 years of experience in rehabilitation services, helping clients recover from injuries and surgeries with personalized therapy plans.",
            "experience": "5",
            "chargesPerDay": "1000"
        },
        {
            "id": 4,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile6.jpg?alt=media&token=286de518-1674-4ff0-a00d-5f2a781fc5b5",
            "name": "David Anderson",
            "description": "An expert in critical care and emergency nursing, dedicated to providing the highest level of care to patients in life-threatening situations.",
            "age": 50,
            "contact": "+91 9819505203",
            "email": "david.anderson@gmail.com",
            "experienceDescription": "With 12 years of experience in emergency care, David has a proven track record of successfully managing critical health situations and stabilizing patients.",
            "experience": "12",
            "chargesPerDay": "2200"
        },
        {
            "id": 5,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile4.jpg?alt=media&token=6e7be363-7c05-4d5e-9d66-628bb7612c30",
            "name": "Dr. Ashley Thompson",
            "description": "An experienced pediatrician dedicated to providing comprehensive care for children. With a focus on preventative health, I ensure that each child receives personalized attention tailored to their unique needs.",
            "age": 33,
            "contact": "+91 9819505196",
            "email": "ashley.thompson@gmail.com",
            "experienceDescription": "With over 4 years of experience in pediatric care, Dr. Ashley has become a trusted name for many families.",
            "experience": "4",
            "chargesPerDay": "1100"
        },
        {
            "id": 6,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile9.jpg?alt=media&token=e29cf49b-3999-45da-a44e-d4c506439f3d",
            "name": "Nurse John Smith",
            "description": "A skilled nurse specializing in elder care, with a compassionate approach to daily health management. I am committed to improving the quality of life for my clients by providing attentive and personalized care.",
            "age": 40,
            "contact": "+91 9819505197",
            "email": "john.smith@gmail.com",
            "experienceDescription": "John has over 8 years of experience in geriatric nursing, managing chronic illnesses and providing emotional support to patients and their families.",
            "experience": "8",
            "chargesPerDay": "1500"
        },
        {
            "id": 7,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile11.jpg?alt=media&token=882ac1b8-f14c-43f7-9790-109a51afff79",
            "name": "Sarah Johnson",
            "description": "An expert in mental health, dedicated to providing counseling and support for elderly individuals facing emotional challenges. I believe in a holistic approach that combines therapeutic techniques with compassionate care.",
            "age": 35,
            "contact": "+91 9819505198",
            "email": "sarah.johnson@gmail.com",
            "experienceDescription": "Sarah has been practicing mental health support for over 6 years, working with elderly patients to manage anxiety, depression, and other emotional challenges.",
            "experience": "6",
            "chargesPerDay": "1200"
        },
        {
            "id": 8,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile5.jpg?alt=media&token=74a6f80f-b2bb-47ce-a0e7-1f409e2859e4",
            "name": "Dr. Robert Brown",
            "description": "A specialist in geriatrics, I focus on improving the health and well-being of older adults through comprehensive medical care and personalized treatment plans.",
            "age": 45,
            "contact": "+91 9819505199",
            "email": "robert.brown@gmail.com",
            "experienceDescription": "With 10 years of experience in geriatric care, Dr. Brown has provided invaluable care to hundreds of elderly patients, helping them maintain a high quality of life.",
            "experience": "10",
            "chargesPerDay": "2000"
        },
        {
            "id": 9,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile10.jpg?alt=media&token=f2012ed0-c476-435a-b27a-d716eb0292ea",
            "name": "Linda Martinez",
            "description": "A loving nurse with a focus on hospice care, providing comfort and support to terminally ill patients and their families during difficult times.",
            "age": 42,
            "contact": "+91 9819505204",
            "email": "linda.martinez@gmail.com",
            "experienceDescription": "With over 9 years of experience in hospice care, Linda has helped many families navigate end-of-life challenges with grace and compassion.",
            "experience": "9",
            "chargesPerDay": "1600"
        },
        {
            "id": 10,
            "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile8.jpg?alt=media&token=c17cef69-2d05-4b0a-a8da-5c603febc017",
            "name": "Thomas Garcia",
            "description": "A dedicated professional specializing in home care for individuals with disabilities, committed to enhancing their quality of life through personalized support.",
            "age": 36,
            "contact": "+91 9819505205",
            "email": "thomas.garcia@gmail.com",
            "experienceDescription": "Thomas has 5 years of experience providing tailored home care for individuals with disabilities, ensuring their comfort and independence.",
            "experience": "5",
            "chargesPerDay": "1200"
        }
    ]);

    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="px-4 py-8">
                {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Caretakers</h1> */}

                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Dedicated Caregiving Team
                    </h1>
                    <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">
                        Compassionate professionals committed to your health and comfort
                    </p>
                </div>

                {/* Updated responsive grid structure for caretakers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {careTakers.map((caretaker, index) => (
                        <div key={index} className="flex justify-center">
                            <CareTakerCard caretaker={caretaker} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CareTaker;
