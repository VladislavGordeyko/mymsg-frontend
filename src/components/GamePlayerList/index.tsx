import React, { useRef, useState } from 'react';
import styles from './gamePlayerList.module.scss';
import { IGamePlayerList } from './models';
import PlayerCard from '../PlayerCard';
import { IPlayer } from '@/entities/game';
import { playersMock } from '../Lobby/constants';

const GamePlayerList: React.FC<IGamePlayerList> = ({ players, onPlayerClick, selectedPlayer }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScroll, setStartScroll] = useState(0);
  
  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScroll(listRef.current?.scrollLeft ?? 0);
      listRef.current!.style.cursor = 'grabbing';
      document.documentElement.style.userSelect = 'none'; // Prevent text selection
      e.preventDefault();
  };
  
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
  
    const dx = e.pageX - startX;
    if (listRef.current) {
      listRef.current.scrollLeft = startScroll - dx;
    }
  
    // If we detect a drag, set a flag
    if (Math.abs(dx) > 5) {
        listRef.current!.classList.add('dragging');
    }
  };
  
  const onDragEnd = () => {
    setIsDragging(false);
      listRef.current!.style.cursor = 'grab';
      document.documentElement.style.userSelect = '';
  
      // Add a slight delay to clear the dragging class to allow for click events
      setTimeout(() => listRef.current!.classList.remove('dragging'), 0);
  };
  
  const handleCardClick = (player: IPlayer) => {
    if (!listRef.current!.classList.contains('dragging')) {
      onPlayerClick && onPlayerClick(player);
    }
  };
  
  return (
    <div className={styles['game-player-list']}>
      <div  
        ref={listRef}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={onDragMove} 
        className={styles['game-player-list__container']}>
        {players.map(player =>
          <PlayerCard 
            key={player.clientId} 
            player={player} 
            size='sm' 
            onClick={() => handleCardClick(player)} 
            isSelected={selectedPlayer?.clientId === player.clientId}
          />)}
      </div>
      <div className={styles['game-player-list__divider']}></div>
    </div>
  );
};

export default GamePlayerList;