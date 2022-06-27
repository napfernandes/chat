import './styles.css';

export default function ChatConversationComponent() {
    return (
        <div className='conversation-wrapper'>
            <div className='conversation-title'>Chat title</div>
            <div className='conversation-messages'>Mensagens</div>
            <div className='conversation-actions'>
                <input type="text" />
                <button type="submit">Send</button>
            </div>
        </div>
    );
}