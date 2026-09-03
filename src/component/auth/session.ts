
const KEY = 'playerName'
const STATSKEY = 'gamesWon'

export const getPlayerName = () => sessionStorage.getItem(KEY)

export const setPlayerName = (playerName: string) => sessionStorage.setItem(KEY, playerName)

export const clearPlayerName = () => sessionStorage.removeItem(KEY)

export const setGamesWon = (gamesWon: string) => sessionStorage.setItem(STATSKEY, gamesWon)

export const getGamesWon = () => sessionStorage.getItem(STATSKEY)

export const clearGamesWon = () => sessionStorage.removeItem(STATSKEY)