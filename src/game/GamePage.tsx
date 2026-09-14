import { useRef, useEffect, useCallback } from "react";
import type { StompSubscription } from "@stomp/stompjs";
import { connected, stompClient } from "../component/auth/WebsocketClient";
import { sendMove } from "../api/api";
import type { FallingBlock, PlayerGameStatus } from "../Interface/Interface";

import pikachu from "../assets/pikachu.png";
import bulbasaur from "../assets/bulbasaur.png";
import charmander from "../assets/charmander.png";
import squirtle from "../assets/squirtle.png";
import pokeball from "../assets/pokeball.png";
import { Blocks } from "./Blocks";

// --- Spelets mått. Ändra här. ---
const CANVAS_W = 1000;
const CANVAS_H = 800;

const WALL_THICKNESS = 20;
const LEFT_WALL = 35;
const RIGHT_WALL = 950;

const PLAYER_W = 150;
const PLAYER_H = 180;

// movement directions
const LEFT = "left"
const RIGHT = "right"
const NONE = "none"

/* ===================== */
/* Jädrar */
/* ===================== */

const MIN_X = LEFT_WALL + WALL_THICKNESS;
const MAX_X = RIGHT_WALL - PLAYER_W;
const GROUND_Y = CANVAS_H - PLAYER_H;

function loadImage(src: string) {
    const img = new Image();
    img.src = src;
    return img;
}

// Picture you get is based on your player slot
const SPRITE_BY_SLOT: Record<number, HTMLImageElement> = {
    1: loadImage(pikachu),
    2: loadImage(squirtle),
    3: loadImage(charmander),
    4: loadImage(bulbasaur),
};

const POKEBALL_SPRITE: HTMLImageElement = loadImage(pokeball)

// skapar ett promise som väntar åp att alla bilder ska laddas
const spritesReady = Promise.all(
    Object.values(SPRITE_BY_SLOT).map(
        (img) =>
            new Promise<void>((resolve) => {
                if (img.complete) return resolve();
                img.onload = () => resolve();
                img.onerror = () => resolve();
            })
    )
);

// Server sends 0-100. 0 = left wall, 100 = right wall.
const percentToPixels = (x: number) => MIN_X + (x / 100) * (MAX_X - MIN_X);
const yToPixels = (y: number) => (y / 100) * CANVAS_H;

export function GamePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const playersRef = useRef<PlayerGameStatus[]>([]);
    const blocksRef = useRef<FallingBlock[]>([]);

    const updateBlocks = useCallback((b: FallingBlock[]) => {
        blocksRef.current = b;
    }, []);


    // Ta emot spelarna från servern och rita dem
    useEffect(() => {
        let cancelled = false;
        let subscription: StompSubscription | undefined;
        let animationFrame = 0;

        // Åt vilket håll varje gubbe tittar, uträknat av hur x ändras mellan två uppdateringar
        const facingRight = new Map<number, boolean>();
        const previousX = new Map<number, number>();

        const draw = () => {
            const ctx = canvasRef.current?.getContext("2d");
            if (!ctx) return;

            // Bakgrund
            ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

            // Väggar
            ctx.fillStyle = "black";
            ctx.fillRect(LEFT_WALL, 0, WALL_THICKNESS, CANVAS_H);
            ctx.fillRect(RIGHT_WALL, 0, WALL_THICKNESS, CANVAS_H);

            // Blocks
            for (const block of blocksRef.current) {
                ctx.fillStyle = "red";

                /* ctx.fillRect(percentToPixels(block.x), percentToPixels(block.y), 30,30); */
                ctx.drawImage(POKEBALL_SPRITE, percentToPixels(block.x), yToPixels(block.y), 30,30)
            }

            // Alla gubbar
            for (const player of playersRef.current) {
                if(!player.alive) continue;
                const sprite = SPRITE_BY_SLOT[player.slot] ?? SPRITE_BY_SLOT[1]; 
                const x = percentToPixels(player.x);

                ctx.save(); // Sparar canvas tillstånd innan flippen
                if (facingRight.get(player.slot)) {
                    ctx.translate(x + PLAYER_W, GROUND_Y);
                    ctx.scale(-1, 1);
                    ctx.drawImage(sprite, 0, 0, PLAYER_W, PLAYER_H);
                } else {
                    ctx.drawImage(sprite, x, GROUND_Y, PLAYER_W, PLAYER_H);
                }
                ctx.restore(); // Återställer canvas tillstånd efter ritningen

                ctx.fillStyle = "white";
                ctx.font = "20px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(player.playerName, x + PLAYER_W / 2, GROUND_Y - 10);
            }
        };

        // sker inte förrän spritesready och connected har laddats
        Promise.all([spritesReady, connected]).then(() => {
            if (cancelled) return;

            subscription = stompClient.subscribe("/pokemon/state", (msg) => {
                const players: PlayerGameStatus[] = JSON.parse(msg.body);

                for (const player of players) {
                    const previous = previousX.get(player.slot);
                    if (previous !== undefined) {
                        if (player.x > previous) facingRight.set(player.slot, true);
                        else if (player.x < previous) facingRight.set(player.slot, false);
                    }
                    previousX.set(player.slot, player.x);
                }

                playersRef.current = players;
            });

            const loop = () => {
                draw();
                animationFrame = requestAnimationFrame(loop);
            };
            animationFrame = requestAnimationFrame(loop);
        });

        return () => {
            cancelled = true;
            subscription?.unsubscribe();
            cancelAnimationFrame(animationFrame);
        };
    }, []);


    // Lyssna på tangentbordet och skicka riktningen till servern
    useEffect(() => {
        const held = { left: false, right: false };
        let direction : string = ""
        const publishDirection = () => {
            if (held.right) { direction = RIGHT}
            else if (held.left) {direction = LEFT}
            else (direction = NONE)
            sendMove(direction)
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (e.key === "ArrowLeft") held.left = true;
            else if (e.key === "ArrowRight") held.right = true;
            else return;
            e.preventDefault();
            publishDirection();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") held.left = false;
            else if (e.key === "ArrowRight") held.right = false;
            else return;
            publishDirection();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            sendMove("none"); 
        };
    }, []);

    return (
        <>

            <p style={{ display: "flex", position: "absolute", top: "90%" }}>Flytta gubben med ← och →</p>

            <Blocks blocksUpdate={updateBlocks}/>

            <div>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    style={{
                        border: "2px solid black",
                        width: "100%",
                        maxWidth: CANVAS_W,
                        height: "auto",
                        display: "flex",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "5%"
                    }}
                />

            </div>
        </>

    );
}
