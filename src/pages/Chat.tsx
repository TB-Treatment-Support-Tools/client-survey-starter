import { useEffect, useState } from "react"
// import matrixcs from "matrix-js-sdk"
import { useKeycloak } from "@react-keycloak/web"

export default function Chat(){

    const { keycloak } = useKeycloak()
    const [rooms,setRooms] = useState([]);

    // useEffect(()=>{
    //     let client = matrixcs.createClient("https://chat.local.app:4400")
    //     if(!client.isLoggedIn() && keycloak.token){
    //         console.log("Logging in")
    //         client.login("org.matrix.login.jwt", {token: keycloak.token}).then(()=>{
    //             client.startClient({initialSyncLimit: 10}).then(()=>{
    //                 let rooms = client.getRooms();
    //                 console.log(rooms)
    //             });
    //         })
            
    //     }else{

    //     }

    //     client.on('RoomMember.membership', async (event, member) => {
    //         //Auto Accept Room invites
    //         if (member.membership === 'invite' && member.userId === client.getUserId()) {
    //             await client.joinRoom(member.roomId);
    //             // setting up of room encryption seems to be triggered automatically
    //             // but if we don't wait for it the first messages we send are unencrypted
    //             // await client.setRoomEncryption(member.roomId, { algorithm: 'm.megolm.v1.aes-sha2' })
    //         }
    //     });
    //     return function cleanup(){
    //         client.stopClient();
    //     }
    // },[])

    return (<div>
        <h1>Chat</h1>
    </div>)
}