import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";

export default function CallPage() {
  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <Chatbot />
      </div>
    </div>
  );
}