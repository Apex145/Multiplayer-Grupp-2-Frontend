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

export function leaveLobby() {
    if (!stompClient.connected) return
    stompClient.publish({
        destination: '/app/game/leave'
    })
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

// Todo - remove magic strings here and in backend - replace with enums
export function sendMove(direction: string) {
    if (!stompClient.connected) return
    stompClient.publish({
        destination: "/app/game/move",
        body: direction
    })
}
