import { useRef, useEffect, useState } from "react";

// --- Spelets mått. Ändra här, resten räknas ut automatiskt. ---
const CANVAS_W = 1000;
const CANVAS_H = 800;

const WALL_THICKNESS = 20;
const LEFT_WALL = 35;
const RIGHT_WALL = 950;

const PLAYER_W = 150;
const PLAYER_H = 180;
const PLAYER_SPEED = 40;

/* ===================== */
/* Jädrar */
/* ===================== */

const MIN_X = LEFT_WALL + WALL_THICKNESS;
const MAX_X = RIGHT_WALL - PLAYER_W;
const GROUND_Y = CANVAS_H - PLAYER_H;

const playerImg = new Image()
playerImg.src = 'src/assets/pikachu.png'

/*     switch (player.id) {
    case 1 : playerImg.src = 'src/assets/pikachu.png'
    break
    case 2 : playerImg.src = 'src/assets/bulbasaur.png'
    break
    case 3 : playerImg.src = 'src/assets/charmander.png'
    break
    case 4 : playerImg.src = 'src/assets/squirtle.png'
}
 */

export function GamePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isFacingRight, setIsFacingRight] = useState(false)

    const [positionX, setPositionX] = useState(() =>
        Math.min(MAX_X, Math.max(MIN_X, CANVAS_W / 2 - PLAYER_W / 2))
    );



    // Rita spelet 
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            // Bakgrund
            ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

            // Väggar
            ctx.fillStyle = "black";
            ctx.fillRect(LEFT_WALL, 0, WALL_THICKNESS, CANVAS_H);
            ctx.fillRect(RIGHT_WALL, 0, WALL_THICKNESS, CANVAS_H);

            // Gubben
            ctx.save(); // Sparar canvas tillstånd innan flippen
            if (isFacingRight) {
                ctx.translate(positionX + PLAYER_W, GROUND_Y)
                ctx.scale(-1,1)
                ctx.drawImage(playerImg, 0, 0, PLAYER_W, PLAYER_H);
            } else {
                ctx.drawImage(playerImg, positionX, GROUND_Y, PLAYER_W, PLAYER_H)
            }
            ctx.restore(); // Återställer canvas tillstånd efter ritningen
        }

        if (playerImg.complete) {
            draw();
        } else {
            playerImg.onload = () => {
                draw();
            };
        }


    }, [positionX, isFacingRight]);

    // Lyssna på tangentbordet
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setPositionX((position) =>
                    Math.max(MIN_X, position - PLAYER_SPEED)
                );
                setIsFacingRight(false)
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                setPositionX((position) =>
                    Math.min(MAX_X, position + PLAYER_SPEED)
                );
                setIsFacingRight(true)
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