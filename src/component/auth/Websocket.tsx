import { stompClient } from "./WebsocketClient"
import { useEffect } from "react"

const Websocket = () => {


    useEffect(() => {
        stompClient.subscribe('/pokemon/players', (msg) => {
            console.log(msg);

        })
    }, [])


    return (
        <div>Websocket connected</div>
    )

}

export default Websocket;
