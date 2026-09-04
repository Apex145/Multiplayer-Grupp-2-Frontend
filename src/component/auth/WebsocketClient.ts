import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const stompClient = new Client({
    webSocketFactory: () => new SockJS("ws://localhost:8080/websocket"),
    onConnect: () => {
        console.log("Connected");
    }
});

stompClient.activate();