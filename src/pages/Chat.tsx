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
        console.log(`sub ${keycloak.subject} token ${token}`)
        if (keycloak.subject && token) {
            chatClient.connectUser({ id: keycloak.subject }, token);
        }

    }, [token, keycloak.subject])

    useEffect(() => {
        getApiToken();
    }, [])

    const filters: ChannelFilters = { type: 'messaging', members: { $in: [keycloak.subject || ""] } };

    return (<div>
        {console.log(`token: ${token}  chatClinet: ${chatClient.user}`)}
        <p>{(token && chatClient.user) ? "true" : "false"}</p>
        {(token && chatClient.user) && 
        <>
        <p>chat rendered</p>
        <Chat client={chatClient}>
            <ChannelList filters={filters} />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput focus />
                </Window>
                <Thread />
            </Channel>
        </Chat></>}
    </div>)
}