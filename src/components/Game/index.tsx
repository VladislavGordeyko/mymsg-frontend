
import React, { useState, useEffect } from 'react';
import { IGame } from './models';
import { IGameStatus, IPlayer } from '@/entities/game';
import { useWebSocketContext } from '@/context/WebSocketContext';
import GamePlayerList from '../GamePlayerList';
import GameStatus from '../GameStatus';
import styles from './game.module.scss';

const Game: React.FC<IGame> = ({ 
  sessionId, 
  players,
  gameStatusUpdate, 
  clientId,
  host,
}) => {
  const [gameStatus, setGameStatus] = useState<IGameStatus>();
  const { sendMessage, lastMessage } = useWebSocketContext();
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer>();
  const [word, setWord] = useState('');
  const [isGuessed, setIsGuessed] = useState(false);

  useEffect(() => {
    if (gameStatusUpdate) {
      setGameStatus(gameStatusUpdate);
    }
  }, [gameStatusUpdate]);

  const restartGame = ()  => {
    window.Telegram.WebApp.MainButton.hide();
    sendMessage(JSON.stringify({ type: 'RESTART_GAME', sessionId }));
  };

  // useEffect(() => {
  //   if (gameStatus?.isFinished ) {
  //     window.Telegram.WebApp.MainButton.text = 'Restart Game';
  //     window.Telegram.WebApp.MainButton.show();
  //     window.Telegram.WebApp.MainButton.onClick(restartGame);
  //   }
  // }, [gameStatus?.isFinished]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      switch (data.type) {
      case 'GAME_UPDATE':
        console.log('Update', data.gameStatus);
        setGameStatus(data.gameStatus);
        break;

      case 'RESTART_GAME':
        setGameStatus(data.gameStatus);
        window.Telegram.WebApp.MainButton.hide();
        break;

      default:
        break;
      }
    }
  }, [lastMessage]);

  const onPlayerClick = (player: IPlayer) => {
    if (host?.clientId === clientId && !gameStatus?.currentMoveClientId || (isGuessed && gameStatus?.currentMoveClientId === clientId)) {
      if (selectedPlayer?.clientId === player.clientId || player.clientId === clientId) {
        setSelectedPlayer(undefined);
      } else {
        setSelectedPlayer(player);
      }
    }
  };

  // const randomSelect = () => {
  //   const randomIndex = Math.floor(Math.random() * players.length);
  //   setSelectedPlayer(players[randomIndex]);
  // };

  const setWordToUser = () => {
    setIsGuessed(false);
    setSelectedPlayer(undefined);
    sendMessage(JSON.stringify({ type: 'GAME_UPDATE', sessionId, word, selectedPlayer, clientId }));

    setWord('');
  };

  return (
    <div className={styles.game}>
      <GamePlayerList players={players} onPlayerClick={onPlayerClick} selectedPlayer={selectedPlayer} />
      <GameStatus 
        clientId={clientId} 
        gameStatus={gameStatus} 
        host={host} 
        onWordChange={setWord} 
        selectedPlayer={selectedPlayer}
        setWordToUser={setWordToUser}
        word={word}
        isGuessed={isGuessed}
        setIsGueesed={setIsGuessed}
      />
    </div>
  );
};

export default Game;