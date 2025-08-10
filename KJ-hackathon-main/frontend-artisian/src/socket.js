import { io } from "socket.io-client";

    const socket = io("http://localhost:3000", { autoConnect: false })
    const user_name = "aryan"
    socket.auth = { user_name }

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    export {socket}
    

