import { RouteObject, useRoutes } from 'react-router-dom';

import HomeView from './views/home/view';
import ChatView from './views/chat/view';
import LoginView from './views/login/view';
import ChatEmptyView from './views/chat-empty/view';
import ChatSidebarWrapper from './views/_wrapper/chat-sidebar-wrapper/chat-sidebar-wrapper';

const applicationRoutes: RouteObject[] = [
    {
        path: '/',
        element: <HomeView />,
    },
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/chat',
        element: <ChatSidebarWrapper />,
        children: [{ index: true, element: <ChatEmptyView /> }]
    },
    {
        path: '/chat/:conversationIdOrHash',
        element: <ChatSidebarWrapper />,
        children: [{ index: true, element: <ChatView /> }]
    }
]

export const Routes = () => {
    return useRoutes(applicationRoutes);
};