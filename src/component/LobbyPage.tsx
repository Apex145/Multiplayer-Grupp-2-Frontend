import { clearPlayerName, getPlayerName, getGamesWon } from "./auth/session";
import "./LobbyPage.css";

export const LobbyPage = () => {
    async function handleSubmit() {
        clearPlayerName();
    }

    const topPlayers = [
        { name: getPlayerName(), gamesWon: getGamesWon() },
        { name: getPlayerName(), gamesWon: getGamesWon() },
        { name: getPlayerName(), gamesWon: getGamesWon() },
        { name: getPlayerName(), gamesWon: getGamesWon() },
    ];

    return (
        <>
            <p>Welcome to Pokedodge!</p>

            <div id="playerLobbyPage">
                <div>
                    Player: {getPlayerName()} | Games won: {getGamesWon()}
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Leave lobby!</button>
                    </form>
                </div>

                {/* Leaderboard */}
                <aside className="leaderboard">
                    <h2>🏆 Top 5 Global Players</h2>
                    <ol>
                        {topPlayers.map((player) => (
                            <li key={player.name}>
                                {player.name} – {player.gamesWon}
                            </li>
                        ))}
                    </ol>
                </aside>
            </div>
        </>
    );
};