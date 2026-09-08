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