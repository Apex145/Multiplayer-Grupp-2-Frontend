import { useEffect, useState } from "react";
import { clearPlayerName, getPlayerName, getGamesWon } from "./auth/session";
import "./LobbyPage.css";
import type { LeaderBoardItem } from "../Interface/Interface";
import { stompClient } from "./auth/WebsocketClient";
import { showLeaderBoard } from "../api/api";
import type { StompSubscription } from "@stomp/stompjs";

export const LobbyPage = () => {
    async function handleSubmit() {
        clearPlayerName();
    }

    const [leaderboard, setLeaderBoard] = useState<LeaderBoardItem[]>([]);

    useEffect(() => {
        let subscription: StompSubscription | undefined

        const setupSubscription = () => {
            subscription = stompClient.subscribe('/pokemon/leaderboard', (msg) => {
                console.log(msg.body)
                setLeaderBoard(JSON.parse(msg.body));
            });
            showLeaderBoard();
        };

        if (stompClient.connected) {
            setupSubscription()
        } else {
            stompClient.onConnect = setupSubscription
        }

        return () => subscription?.unsubscribe()
    }, []);



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
                    <h2>🏆 Top 4 Global Players</h2>
                    <ol>
                        {leaderboard.length === 0 ? (
                            <li>Inga spelare hittades</li>
                        ) : (
                            leaderboard.map((player) => (
                                <li key={player.playerId}>
                                    {player.player} - {player.gamesWon}
                                </li>
                            ))
                        )}
                    </ol>
                </aside>
            </div>
        </>
    );
};