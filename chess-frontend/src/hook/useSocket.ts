import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const wsConn = new WebSocket(WS_URL);
        wsConn.onopen = () => {
            console.log("Connected");
            setSocket(wsConn);
        }
        wsConn.onclose = () => {
            console.log("Disconnected");
            setSocket(null);
        }

        wsConn.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        setSocket(wsConn);

        return () => {
            wsConn.close();
            setSocket(null);
        }

    }, [])
    return socket;
}

