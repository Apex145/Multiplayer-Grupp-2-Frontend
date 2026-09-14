import { useEffect, useState } from "react";
import type { FallingBlock } from "../Interface/Interface";
import { connected, stompClient } from "../component/auth/WebsocketClient";
import type { StompSubscription } from "@stomp/stompjs";

interface BlocksProps {
    blocksUpdate: (blocks: FallingBlock[]) => void;
}

export function Blocks({blocksUpdate}: BlocksProps) {

    const [, setSpawnBlocks] = useState<FallingBlock>();
    const [, setActiveBlocks] = useState<FallingBlock[]>([]);


    useEffect(() => {
        let blockSubscription: StompSubscription | undefined;
        let activeBlockSubscription: StompSubscription | undefined;
        
        connected.then(() => {

            blockSubscription = stompClient.subscribe("/pokemon/spawnblocks", (msg) => {
                const blocks: FallingBlock = JSON.parse(msg.body)
                setSpawnBlocks(blocks)
            })

            activeBlockSubscription = stompClient.subscribe("/pokemon/activeblocks", (msg) => {
                const updateBlocks: FallingBlock[] = JSON.parse(msg.body)
                setActiveBlocks(updateBlocks)
                blocksUpdate(updateBlocks)
            })
        })

        return() => {
            blockSubscription?.unsubscribe()
            activeBlockSubscription?.unsubscribe()
        }
    }, [blocksUpdate])

    // return(
    //     <div>
    //         {activeBlocks.map(block => (
    //             <div key={block.id} className="block" style={{ position: 'absolute', left: block.x, top: block.y }}></div>
    //         ))}
    //     </div>
    // )

    return null;
}

