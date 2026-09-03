
import { clearPlayerName } from "./auth/session"
import { getPlayerName, getGamesWon } from "./auth/session"
import './LobbyPage.css'


export const LobbyPage = () => {

    async function handleSubmit() {
        clearPlayerName()
    }

    return (
        <>
            <p>Welcome to Pokedodge!</p>
            <div id="playerLobbyPage">
                <div>Player: {getPlayerName()} | Games won: {getGamesWon()}</div>
                
                <div>
                    <form onSubmit={handleSubmit}>


                        <button type="submit">
                            Leave lobby!
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}