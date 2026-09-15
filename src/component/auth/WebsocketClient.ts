import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const API_URL = import.meta.env.VITE_API_URL || "";

export const stompClient = new Client({
    webSocketFactory: () => new SockJS(`${API_URL}/websocket`),

});

export const connected = new Promise<void>((resolve) => {
    stompClient.onConnect = () => resolve()
})

/* export const connectedBoolean = new Promise<void>((resolve) => {
    stompClient.onConnect = () => resolve()
})
 */
stompClient.activate();





/* onConnect: () => {
    stompClient.subscribe('/pokemon/players', (msg) => {
        console.log("Kalle", JSON.parse(msg.body));
    })
} */