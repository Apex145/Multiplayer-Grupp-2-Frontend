/*import axios from "axios"

export interface Player {
    PlayerName: String
}
export const loginPlayer = async (playerName: string): Promise <Player> => {
    const response = await axios.post<Player>(
    `${API_URL}/login`
    {
             params: {
                 playerName: playerName,
             },
        }
    );
    retur response.data;
}   
*/

export interface Player {
    id: string
    playerName: string
    gamesWon: number
}

export async function login(playerName: string): Promise<Player> {
    const response = await fetch('http://localhost:8080/api/auth/player/login', {
        method: 'POST',
        body: JSON.stringify({ playerName: playerName })
    })
    if (!response.ok) {
        throw new Error(`login failed: ${response.status}`)
    }
    return  response.json()
}