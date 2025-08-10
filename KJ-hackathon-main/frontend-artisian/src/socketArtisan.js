import { io } from "socket.io-client";

    const socketArtisan = io("http://localhost:8000", { autoConnect: false })
    const user_name = "Om"
    socketArtisan.auth = { user_name }

    socketArtisan.onAny((event, ...args) => {
        console.log(event, args);
    });

    export {socketArtisan}