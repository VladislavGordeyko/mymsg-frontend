import React, { useEffect, useState } from 'react';
import { IPlayerCard } from './models';
import Image from 'next/image';
import styles from './playerCard.module.scss';
import { getTitleByTgUserName } from '@/utils/stringUtils';

const PlayerCard: React.FC<IPlayerCard> = ({ player, isCurrentPlayer, size, onClick, isSelected = false, showTitle }) => {
  const [title, setTitle] = useState('');

  const getTitle = () => {
    setTitle(getTitleByTgUserName(player.tgId));
  };

  useEffect(() => {
    if (showTitle) {
      getTitle();
    }

  }, []);

  return (
    <div className={`${styles['player-card']} 
    ${isCurrentPlayer && styles['player-card--current-player']} 
    ${size === 'sm' && styles['player-card--small']}
    ${isSelected && styles['player-card--selected']}
    `
    }
      onClick={onClick}
    >
      {/* {player.isHost && <div>HOST</div>} */}
      <div className={`${styles['player-card__image-container']} ${player?.isCurrentMove && styles['player-card__image-container--active']}`}>
        {player?.avatar ? <Image
          className={styles['player-card__image']}
          alt='player-avatar'
          height={150}
          width={150}
          src={player.avatar}
        /> :
          <div className={styles['player-card__image-fill']}>
            <Image
              className={styles['player-card__image-mock']}
              alt='player-avatar-mock'
              height={25}
              width={25}
              src='/assets/smile.svg'
            />
          </div>
        }
      </div>
      <div className={styles['player-card__name']}>{player?.userName}</div>
      {showTitle && title && <div className={styles['player-card__title']}>{title}</div>}
    </div>
  );
};

export default PlayerCard;