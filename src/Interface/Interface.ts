export interface Player {
    id: string
    playerName: string
    gamesWon: number
}
export interface LeaderBoardItem {
    playerId: number,
    player: string,
    gamesWon: number
};

export interface PlayerGameStatus {
    playerId: string | null
    playerName: string
    slot: number
    x: number // 0-100, how far along the field the player has travelled
    y: number
    alive: boolean
    sessionId: string | null
}

export interface FallingBlock {
    id: string,
    x: number,
    y: number,
    speed: number
}
