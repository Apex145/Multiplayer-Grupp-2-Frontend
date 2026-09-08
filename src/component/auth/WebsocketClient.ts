import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),

});

export const connected = new Promise<void>((resolve) => {
    stompClient.onConnect = () => resolve()
})

stompClient.activate();





/* onConnect: () => {
    stompClient.subscribe('/pokemon/players', (msg) => {
        console.log("Kalle", JSON.parse(msg.body));
    })
} */