import { useRef, useEffect, useState } from "react";

// --- Spelets mått. Ändra här, resten räknas ut automatiskt. ---
const CANVAS_W = 1000;
const CANVAS_H = 800;

const WALL_THICKNESS = 20;
const LEFT_WALL = 35;
const RIGHT_WALL = 950;

const PLAYER_W = 60;
const PLAYER_H = 80;
const PLAYER_SPEED = 20;

// --- Härledda gränser. Rör inte, de följer med när du ändrar ovan. ---
const MIN_X = LEFT_WALL + WALL_THICKNESS;
const MAX_X = RIGHT_WALL - PLAYER_W;
const GROUND_Y = CANVAS_H - PLAYER_H;

export function GamePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [positionX, setPositionX] = useState(() =>
        Math.min(MAX_X, Math.max(MIN_X, CANVAS_W / 2 - PLAYER_W / 2))
    );

    // Rita spelet
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Bakgrund (måste ritas först, annars målas gubben över)
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Väggar
        ctx.fillStyle = "black";
        ctx.fillRect(LEFT_WALL, 0, WALL_THICKNESS, CANVAS_H);
        ctx.fillRect(RIGHT_WALL, 0, WALL_THICKNESS, CANVAS_H);

        // Gubben
        ctx.fillStyle = "white";
        ctx.fillRect(positionX, GROUND_Y, PLAYER_W, PLAYER_H);
    }, [positionX]);

    // Lyssna på tangentbordet
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setPositionX((position) =>
                    Math.max(MIN_X, position - PLAYER_SPEED)
                );
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                setPositionX((position) =>
                    Math.min(MAX_X, position + PLAYER_SPEED)
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Ta bort event listener när komponenten försvinner
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>

            <p style={{ display: "flex", position: "absolute", top: "90%" }}>Flytta gubben med ← och →</p>

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
