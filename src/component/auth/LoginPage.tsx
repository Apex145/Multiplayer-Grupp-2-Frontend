import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../api/api"
import { setGamesWon, setPlayerName } from "./session"


export function LoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    /*async function handleSubmit(e: React.FormEvent<HTMLFormElement)
    const formData = new FormData(e.currentTarget);
    const playerName = String(formData.get('playerName') || '' ) */


    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const playerName = String(new FormData(form).get('playerName')).trim()

        if (!playerName.trim()) {
            setError("You cannot leave the playername field empty.")
            return
        }

        try {
            const player = await login(playerName);
            console.log("Login successful:", player);



            setPlayerName(player.playerName)
            setGamesWon(player.gamesWon.toString())
            console.log(player.gamesWon)
            /* sessionStorage.setItem(
                "player",
                JSON.stringify(player)
            ); */

            navigate("/LobbyPage");
        } catch (error) {
            console.error("Login failed:", error);
        }

    }

    return (
        < div >
            <form onSubmit={handleSubmit}>
                <h1>Login:</h1>
                <input name="playerName"
                    placeholder="player name"
                    required />

                <button type="submit">
                    login
                </button>
                {error && <p>{error}</p>}

            </form>
        </div >
    );

}