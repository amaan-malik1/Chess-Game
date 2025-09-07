import { useEffect, useState } from "react"
import dotenv from "dotenv";

dotenv.config();

const WS_URL = process.env.WS_URL;

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

        return () => {
            wsConn.close();
        }

    }, [])

}