import React, { useEffect, useState } from 'react';
import { ILobby } from './models';
import Game from '../Game';
import { useWebSocketContext } from '@/context/WebSocketContext';
import { CONNECTIONERRORTEXT, SESSIONNOTEXISTTEXT } from './constants';
import {  IBaseClient, IGameStatus, IPlayer } from '@/entities/game';
import { TelegramService } from '@/services/TelegramService';
import Spinner from '../Spinner';
import styles from './lobby.module.scss';
import PlayerCard from '../PlayerCard';
import Button from '../Button';

const Lobby: React.FC<ILobby> = ({ chatId, session, onBack, player }) => {
  const [isSessionExist, setIsSessionExist] = useState<boolean | undefined>();
  const [sessionId, setSessionId] = useState(session);
  const [players, setPlayers] = useState<IPlayer[]>();
  const [isHost, setIsHost] = useState(false);
  const [host, setHost] = useState<IPlayer>();
  // const [clientId, setClientId] = useState('');
  const [gameStatus, setGameStatus] = useState<IGameStatus>();
  const [, setSpectators] = useState<IBaseClient[]>();
  const { lastMessage, isLoading, error, sendMessage, clientId } = useWebSocketContext();

  const startGame = () => {
    window.Telegram.WebApp.MainButton.hide();
    sendMessage(JSON.stringify({ type: 'START_GAME', sessionId }));
    // setGameStatus('')
  };

  useEffect(() => {
    if (players && players.length > 0 && !isHost) {
      const newHost = players.find(player => player.isHost);
      if (newHost) {
        setHost(newHost);
        if (clientId === newHost?.clientId) {
          setIsHost(true);
        }
      }
    }
  },[players]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const tgService = new TelegramService;
      switch (data.type) {
      case 'START_GAME': 
        const newGameStatus : IGameStatus = data.gameStatus;
        setGameStatus(newGameStatus);
        console.log({newGameStatus});
        break ;

      case 'SESSION_JOINED':
        setIsSessionExist(true);
        const gameStatus : IGameStatus = data.gameStatus;
        const players: IPlayer[] = data.players;
        const spectators : IBaseClient[] = data.spectators;
         
        const newHost = players.find(player => player.isHost);
        // if (newHost) {
        //   setHost(newHost);
        //   if (data.clientId === host?.clientId) {
        //     setIsHost(true);
        //   }
        // }
        // if ()
        // if (!clientId) {
        //   // setClientId(data.clientId);
        //   const host = players.find(player => player.isHost);
        //   setHost(host);

        //   if (data.clientId === host?.clientId) {
        //     setIsHost(true);
        //   }
        // }

        setPlayers(players);
        setSpectators(spectators);
        setGameStatus(gameStatus);
        setSessionId(data.sessionId);
        break;
      
      case 'SESSION_ERROR': 
        setIsSessionExist(false);
        break;

      case 'USER_DISCONNECTED': 
        // setGameStatus(data.gameStatus);
        const newPlayers: IPlayer[] = data.players;
        setPlayers(newPlayers);
        // const newHost = newPlayers.find(player => player.isHost);
        // if (newHost) {
        //   setHost(host);
        //   if (clientId === host?.clientId) {
        //     setIsHost(true);
        //   }
        // }
        // setSpectators(data.spectators);
        break;
      }
    }
  }, [lastMessage]);

  // const onBackHandle = () => {
  //   onBack();
  //   window.Telegram.WebApp.BackButton.hide();
  // };

  useEffect(() => {
    if (isHost && gameStatus?.status === 'lobby') {
      window.Telegram.WebApp.MainButton.setText('Start Game');
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(startGame);
    }
  }, [isHost, gameStatus]);

  const handlePlayersUpdate = (players: IPlayer[]) => {
    // setPlayers(players);
  };

  const getComponentComponent = () => {
    switch(gameStatus?.status) {
    case 'lobby': return <div className={styles['lobby--padding']}>
      <div className={styles['lobby__header']}>Waiting another players to join...</div>
      {/* {isHost && <div className={styles['lobby__start-button']}>
        <Button 
          text='Start game' 
          onClick={startGame}
        //  disabled={players && players?.length < 3} 
        />
      </div>} */}
      <div className={styles['lobby__players']}>
        {players?.map(i => <PlayerCard key={i.clientId} player={i} isCurrentPlayer={i.clientId === clientId} />)}
      </div>
      
    </div>;
    case 'started': return <Game 
      clientId={clientId}
      host={host}
      gameStatusUpdate={gameStatus} 
      sessionId={sessionId} 
      players={players || []} 
    />;
    }
  };

  return (
    <div className={styles['lobby']}>
      {isLoading ? 
        <Spinner /> : error ? 
          <h3 className={styles['lobby__text']}>
            {CONNECTIONERRORTEXT}
          </h3> 
          : getComponentComponent()
      }
    </div>
  );
};

export default Lobby;