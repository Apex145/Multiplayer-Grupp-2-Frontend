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
    playerId : string
    playerName:  string
    slot: number
    x: number
    y: number
    alive: boolean 
    sessionId: string
}
