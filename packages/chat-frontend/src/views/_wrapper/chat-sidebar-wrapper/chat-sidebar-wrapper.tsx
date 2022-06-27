import { Outlet } from 'react-router-dom';

import './styles.css';
import ChatSidebar from '../../../components/chat-sidebar/component';

export default function ChatSidebarWrapper() {
    return (
        <div className='chat-view'>
            <div className='chat-sidebar'>
                <ChatSidebar />
            </div>
            <div className='chat-conversation'>
                <Outlet />
            </div>
        </div>
    )
}