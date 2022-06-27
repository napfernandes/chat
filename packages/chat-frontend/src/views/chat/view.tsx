import './styles.css';

import ChatComponent from "../../components/chat-conversation/component";

export default function ChatView() {
    return (
        <div className='chat-view'>
            <div className='chat-conversation'>
                <ChatComponent />
            </div>
        </div>
    )
}