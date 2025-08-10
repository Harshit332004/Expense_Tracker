import React from 'react';

const RumbleTalkChat = () => {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <iframe
                src="https://rumbletalk.com/client/chat.php?C@@W~i0o"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="RumbleTalk Chat"
                allow="microphone; camera"
            ></iframe>
        </div>
    );
};

export default RumbleTalkChat;
