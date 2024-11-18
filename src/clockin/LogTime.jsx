import React, { createContext, useState, useContext } from 'react';

const LogContext = createContext();

export const LogTimeProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <LogContext.Provider value = {{ messages, addMessage }}>
            {children}
        </LogContext.Provider>
    );
};

export const useLogTime = () => {
    return useContext(LogContext)
};