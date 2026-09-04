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
    stompClient.publish({
        destination: '/app/game/players',
        body: JSON.stringify(playerName)
    })

    if (!response.ok) {
        throw new Error(`login failed: ${response.status}`)
    }
    return response.json()
}

