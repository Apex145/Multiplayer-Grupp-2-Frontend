import { stompClient, connected } from "../component/auth/WebsocketClient"
import type { Player } from "../Interface/Interface"

export async function login(playerName: string): Promise<Player> {
    const response = await fetch('http://localhost:8080/api/auth/player/login', {
        method: 'POST',
        body: playerName
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    await connected;
    stompClient.publish({
        destination: '/app/game/join',
        body: playerName
    })

    return response.json()
}

export async function leaveLobby(player: string | null): Promise<void> {
    const response = await fetch('http://localhost:8080/api/auth/player/logout', {
        method: 'POST',
        body: player
    })
    if (!response.ok) {
        throw new Error('Failed to leave the lobby')
    }
}


export function showAllPlayers() {
    stompClient.publish({
        destination: '/app/game/players'
    })
}

export function showLeaderBoard() {
    stompClient.publish({
        destination: "/app/game/leaderboard",
    })
}

export function startGame() {
    stompClient.publish({
        destination: "/app/game/start"
    })
}
