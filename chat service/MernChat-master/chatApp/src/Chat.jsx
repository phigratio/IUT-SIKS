import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { UserContext } from "./UserContext";
import Logo from "./Logo";

export default function Chat(){
    const[ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const {username, id} = useContext(UserContext);
    const [newMessageText, setNewMessageText] = useState('');
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4020');
        setWs(ws);
        ws.addEventListener('message', handleMessage);

    }, []);

    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({userId,username}) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
        }

        function handleMessage(ev) {
            const messageData = JSON.parse(ev.data);
            // console.log('Message received:', messageData); // Log incoming data
            if ('online' in messageData) {
                showOnlinePeople(messageData.online);
            }
        }
        function sendMessage(ev){
            ev.preventDefault();
            ws.send(JSON.stringify({
                message: {
                    recipient: selectedUserId,
                    text: newMessageText,                 
                }
            }));
        }

        const onlinePeopleExclOurUser = {...onlinePeople};
        delete onlinePeopleExclOurUser[id];
        
    return(
        <div className="flex h-screen"> 
            <div className="bg-white w-1/3">
                <Logo />
                {Object.keys(onlinePeople).map(userId => (
                    <div key = {userId} onClick={() => setSelectedUserId(userId)} 
                    className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer" + (userId === selectedUserId ? 'bg-blue-100' : '')}>
                        {userId === selectedUserId && (
                            <div className="w-1 blue-500 h-12 rounded-r-md"></div>
                        )}
                        <div className="flex gap-2 py-2 pl-4 items-center">
                        <Avatar username= {onlinePeople[userId]} userId= {userId}/>
                        <span className="text-gray-800">{onlinePeople[userId]}</span>
                        </div>   
                    </div>
                ))}
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 p-2">
                <div className="flex h-full flex-grow items-center justify-center"> 
                    {!selectedUserId && (
                        <div className="text-gray-400">
                            &larr; Select a person from the sidebar
                            </div>
                    )}
                </div>
                {!!selectedUserId && (
                    <form className="flex gap-2" onSubmit={sendMessage}>
                    <input type= "text" 
                    value = {newMessageText}
                    onChange={ev => setNewMessageText(ev.target.value)}
                    placeholder= "Type your message here" 
                    className="bg-white flex-grow border rounded-sm p-2"/>
                    <button className="bg-blue-500 p-2 text-white rounded-sm"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
                )}
                
            </div>
        </div>
    );
}