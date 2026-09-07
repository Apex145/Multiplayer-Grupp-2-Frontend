import { stompClient } from "../component/auth/WebsocketClient"


export interface Player {
    id: string
    playerName: string
    gamesWon: number
}

export async function login(playerName: string): Promise<Player> {
    const response = await fetch('http://localhost:8080/api/auth/player/login', {
        method: 'POST',
        body: playerName
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }
    stompClient.publish({
        destination: '/app/game/players',
        body: playerName
    })

    return response.json()
}

