
const KEY = 'playerName'

export const getPlayerName = () => sessionStorage.getItem(KEY)

export const setPlayerName = (playerName: string) => sessionStorage.setItem(KEY, playerName)

export const clearPlayerName = () => sessionStorage.removeItem(KEY)