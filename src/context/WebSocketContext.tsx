import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { IWebSocketContext, IWebSocketProvider } from './models';
import { v4 as uuidv4 } from 'uuid';
import { IPlayer } from '@/entities/game';

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<IWebSocketProvider> = ({ children, sessionId, player }) => {

  const [clientId, setClientId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  // const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(player);
  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000';

  const maxReconnectAttempts = 20;
  let reconnectAttempts = 0;

  useEffect(() => {
    let uid = localStorage.getItem('clientId');
    if (!uid) {
      uid = uuidv4();
      localStorage.setItem('clientId', uid);
    }
    setClientId(uid);
  }, []);


  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      setIsLoading(true);
      console.log({sessionId});
      if (sessionId) {
        sendMessage(JSON.stringify({
          type: 'JOIN_SESSION', 
          sessionId, 
          player,
          clientId
          //  telegramData: window.Telegram.WebApp.initDataUnsafe
        }));
      }
      //  else {
      //   sendMessage(JSON.stringify({ type: 'CREATE_SESSION', telegramData: window.Telegram.WebApp.initDataUnsafe }));
      // }
      setIsLoading(false);
    },
    onClose: () => {
      console.log('WebSocket closed. Attempting to reconnect...');
      setIsLoading(true); 
    },
    onError: () => {
      setIsLoading(true); 
      // setIsError(true);
      // setError('Connection error');
    },
    // shouldReconnect: (closeEvent) => true,
    shouldReconnect: (closeEvent) => {
      setIsLoading(true);
      // Increase reconnect attempts
      reconnectAttempts++;
      // Check if max attempts have been reached
      if (reconnectAttempts < maxReconnectAttempts) {
        console.log(`Reconnection attempt #${reconnectAttempts}`);
        return true; // Attempt to reconnect
      } else {
        console.log('Max reconnection attempts reached.');
        setIsError(true);
        setError('Max reconnection attempts reached.');
        return false; // Do not reconnect
      }
    },
  });

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState, isLoading, error, isError, clientId }}>
      {children}
    </WebSocketContext.Provider>
  );
};
