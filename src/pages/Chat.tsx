import { useEffect, useState } from "react"
// import matrixcs from "matrix-js-sdk"
import { useKeycloak } from "@react-keycloak/web"
import API from "../api";
import { ChannelFilters, StreamChat } from 'stream-chat'
import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
} from 'stream-chat-react';
import 'stream-chat-css/dist/css/index.css';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"
import { CancelOutlined } from "@mui/icons-material";

export default function ChatPage() {

    const { keycloak } = useKeycloak()
    const [token, setToken] = useState("");

    const apiKey = process.env.REACT_APP_STREAM_KEY as string;
    const userId = keycloak.subject as string;

    const chatClient = StreamChat.getInstance(apiKey);

    const getApiToken = async () => {
        const token = await API.getChatToken()
        setToken(token.token)
    }

    useEffect(() => {
        if (keycloak.subject && token) {
            chatClient.connectUser({ id: keycloak.subject }, token);
        }

    }, [token, keycloak.subject])

    useEffect(() => {
        getApiToken();
    }, [])

    const filters: ChannelFilters = { type: 'messaging', members: { $in: [keycloak.subject || ""] } };

    return (
        <>
            {token && <div style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: "100vw", zIndex: 1 }}>
                <Chat client={chatClient}>
                    <ChannelList filters={filters} />
                    <Channel>
                        <Window>
                            <Grid alignItems="center" container style={{ padding: ".5em", backgroundColor: "white" }}>
                                <Link to="/home" style={{ color: "black", marginRight: "1em" }}>
                                    <CancelOutlined />
                                </Link>
                                <ChannelHeader />
                            </Grid>
                            <MessageList />
                            <MessageInput focus />
                        </Window>
                        <Thread />
                    </Channel>
                </Chat>
            </div>}
        </>)
}