import { useEffect, useRef, useState } from "react";
import { socketArtisan } from "../socketArtisan";
import { speakText } from "../speech";
import AIicon from "../../public/Animation - 1723745985736.webm";
import AIicon1 from "../../public/Animation - 1728194516292.webm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchResult } from "@/context/SearchContext";

export default function ChatbotArtisan() {
  const [transcript1, setTranscript] = useState(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(transcript1);
  const accumulatedTranscriptRef = useRef("");
  const chatStatusref = useRef(false);
  const loopref = useRef(false);
  const navigate = useNavigate();
  const [chatVisibility, setChatVisibility] = useState(false);
  const { storeSearchResult } = useSearchResult();
  const location = useRef();
  const videoRef2 = useRef()
  const [chatContent, setChatContent] = useState(
    "Hello, I am Sarthi, your personal website assistant. How may I assist you?"
  );
  // Update the ref whenever transcript1 changes
  useEffect(() => {
    async function getCoordinates() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            location.current = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          },
          (err) => {
            console.error(err.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    getCoordinates();
  }, []);

  useEffect(() => {
    transcriptRef.current = transcript1;
  }, [transcript1]);

  useEffect(() => {
    const chatStatus = localStorage.getItem("chatActive1");
    chatStatusref.current = chatStatus;
    console.log(chatStatus);
    // if (chatStatus) {
    //   const AIbutton = document.getElementById("AIbutton");
    //   AIbutton.click();
    // }
  }, []);

  const startChat = () => {
    socketArtisan.connect();

    socketArtisan.on("connect", () => {
      console.log(socketArtisan.id);
    });

    const textToSpeak =
      "Hello, I Sarthi, your personal shopping assistant. How may I assist you?";

    if (window.location.pathname == "/admin" && chatStatusref.current) {
      speakText(textToSpeak);
    }

    startRecognition();
  };

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keep recognizing speech until stopped
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        console.log(result);
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          setTimeout(() => {
            recognitionRef.current.stop();
            console.log("stopped by timeout");
          }, 2500);
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Update the ref with the latest final transcript
      accumulatedTranscriptRef.current += finalTranscript;

      // For interim results, append to the current accumulated transcript
      setTranscript(accumulatedTranscriptRef.current + interimTranscript);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      console.log(accumulatedTranscriptRef.current); // State value might not be updated yet
      if (accumulatedTranscriptRef.current) {
        console.log(accumulatedTranscriptRef.current);
        setChatContent(accumulatedTranscriptRef.current);
        socketArtisan.emit("prompt", accumulatedTranscriptRef.current);
      }
      accumulatedTranscriptRef.current = "";
      setTranscript(accumulatedTranscriptRef.current);
      console.log("loopRef", loopref.current);
      if (loopref.current) {
        startRecognition();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const handleResponse = (response) => {
      console.log(response);

      const parts = response.split(" ");

      let pagename;

      // If the command starts with "open", process it
      if (parts[0].toLowerCase() === "open") {
        // Join the remaining parts, normalize by removing spaces and converting to lowercase
        pagename = parts.slice(1).join(" ").replace(/\s+/g, "").toLowerCase();

        console.log(pagename);

        // Define a mapping of possible variations to correct routes
        const pageRoutes = {
          dashboard: "/admin",
          dashboardpage: "/admin",
          inventory: "/admin/inventory",
          inventorypage: "/admin/inventory",
          orders: "/admin/orders",
          orderspage: "/admin/orders",
          addproduct: "/admin/add-product",
          addproductpage: "/admin/add-product",
        };

        // Check if the normalized page name exists in the mapping
        if (pageRoutes[pagename]) {
          speakText(`opening ${pagename}`);
          navigate(pageRoutes[pagename]);
        } else {
          speakText("Invalid page name");
        }
      } else {
        setChatContent(response);
        speakText(response);
      }
      startRecognition();
    };

    socketArtisan.on("response", handleResponse);

    return () => {
      socketArtisan.off("response", handleResponse); // Clean up the listener
    };
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.stop(); // Stops the recognition process
      loopref.current = false; // Ensure it doesn't restart
      console.log("Recognition stopped manually", loopref.current);
    }
  };

  return (
    <>
      <button
        className="button AIbutton chatbot second-step"
        id="AIbutton2"
        onClick={() => {
          console.log(loopref.current);
          if (!loopref.current) {
            startChat();
            localStorage.setItem("chatActive1", "true");
            setChatVisibility(true);
            loopref.current = true;
            if (videoRef2.current) {
              videoRef2.current.play(); // Play the video
            }
          } else {
            stopRecognition();
            localStorage.setItem("chatActive1", "false");
            loopref.current = false;
            if (videoRef2.current) {
              videoRef2.current.pause(); // Pause the video
            }
          }
        }}
      >
        <video
          ref={videoRef2} // Attach the ref to the video element
          src={AIicon1}
          alt="AI Icon Video"
          muted
          className="rounded-full"
          loop
        />
      </button>
      {chatVisibility ? (
        <div className="output-div" id="output-div">
          <button
            className="close_btn"
            onClick={() => {
              setChatVisibility(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>

          <p>{chatContent ? chatContent : null}</p>
        </div>
      ) : null}
    </>
  );
}
