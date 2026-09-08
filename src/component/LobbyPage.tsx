import { useEffect, useState } from "react";
import { clearPlayerName, getPlayerName, getGamesWon } from "./auth/session";
import "./LobbyPage.css";
import type { LeaderBoardItem, Player } from "../Interface/Interface";
import { connected, stompClient } from "./auth/WebsocketClient";
import { showAllPlayers, showLeaderBoard } from "../api/api";
import type { StompSubscription } from "@stomp/stompjs";

export const LobbyPage = () => {
    async function handleSubmit() {
        clearPlayerName();
    }

    const [leaderboard, setLeaderBoard] = useState<LeaderBoardItem[]>([]);
    const [playersInLobby, setPlayersInLobby] = useState<string[]>([]);

    useEffect(() => {
        let leaderboardSubscription: StompSubscription | undefined
        let playerSubscription: StompSubscription | undefined

        connected.then(() => {

            playerSubscription = stompClient.subscribe('/pokemon/players', (msg) => {
                console.log("Kalle", JSON.parse(msg.body));
                console.log("asdasdswd")
                setPlayersInLobby(JSON.parse(msg.body))
            })
            showAllPlayers();

            leaderboardSubscription = stompClient.subscribe('/pokemon/leaderboard', (msg) => {
                console.log(msg.body)
                setLeaderBoard(JSON.parse(msg.body));
            });
            showLeaderBoard();

        })


        return () => {
            playerSubscription?.unsubscribe()
            leaderboardSubscription?.unsubscribe()
        }
    }, []);



    return (
        <>
            <p>Welcome to Pokedodge!</p>

            <div id="playerLobbyPage">
                <div>
                    <h2>🕹️ Players in lobby:</h2>
                    <ul id="playerList">{
                        playersInLobby.map((player) => (
                            <li key={player}>
                                {player}
                                <hr />
                            </li>
                        ))
                    }
                    </ul>
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
                            <li>No players found</li>
                        ) : (
                            leaderboard.map((player) => (
                                <li key={player.playerId}>
                                    {player.player} - {player.gamesWon}
                                </li>
                            ))
                        )}
                    </ol>
                </aside>
            </div >
        </>
    );
};