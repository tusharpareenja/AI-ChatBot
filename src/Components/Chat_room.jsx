import React, { useEffect, useState } from 'react';
import { getGenerativeModel } from '../GooglGenerativeAi.js';

function Chat_room() {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        setChatHistory([...chatHistory, { sender: 'user', text: userMessage }]);
        setLoading(true);

        try {
            const model = getGenerativeModel();
            const result = await model.generateContent(userMessage);
            const aiResponse = result.response.text();

            setChatHistory((prev) => [
                ...prev,
                { sender: 'ai', text: aiResponse }
            ]);

        } catch (error) {
            console.error('Error generating content:', error);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'ai', text: 'Sorry, something went wrong.' }
            ]);
        }

        setLoading(false);
        setUserMessage('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action (like adding a new line in a textarea)
            handleSendMessage(); // Send the message
        }
    };

    useEffect(() => {
        // Auto-scroll to the bottom of the chat
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <>
            <div className="bg-slate-900 h-screen w-screen text-yellow-50 text-xl flex">
                <div className="w-28 sm:w-48 md:w-60 lg:w-72 xl:w-80 h-screen shadow-2xl bg-slate-800">
                    {/* Sidebar Content */}
                </div>

                <div className="flex-1 p-4 flex flex-col">
                    <div id="chatContainer" className='w-full flex-1 overflow-auto'>
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`w-full max-w-md p-2 mb-2 rounded-lg ${message.sender === 'user' ? 'bg-cyan-700 text-white self-end ml-auto' : 'bg-gray-700 text-yellow-50 self-start mr-auto'}`}
                                style={{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}
                            >
                                <p>{message.text}</p>
                            </div>
                        ))}
                        {loading && (
                            <div className='w-full max-w-md p-2 mb-2 rounded-lg bg-gray-700 text-yellow-50 self-start'>
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>

                    <div className='w-full h-32 flex justify-center items-center'>
                        <div className='w-3/4 h-24 mt-16'>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={userMessage}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown} // Add key down handler here
                                className="w-full p-2 rounded-lg bg-gray-700 text-yellow-50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat_room;
