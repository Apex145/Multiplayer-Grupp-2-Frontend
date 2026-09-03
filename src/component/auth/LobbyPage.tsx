import { clearPlayerName } from "./session"

export const LobbyPage = () => {

    async function handleSubmit(){
        clearPlayerName()
    }

    return (
        <>
            <p>HEJ!</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    LOGGA UT!
                </button>
            </form>
        </>
    )
}