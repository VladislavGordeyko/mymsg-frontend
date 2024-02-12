import React from 'react';
import { IPlayerCard } from './models';
import Image from 'next/image';
import styles from './playerCard.module.scss';


const PlayerCard: React.FC<IPlayerCard> = ({ player, isCurrentPlayer, size, onClick, isSelected = false }) => {
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
        {player?.avatar ?  <Image
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
        {player?.score > 0 && <div className={styles['player-card__score']}>
          {player.score}
        </div>}
      </div>   
      <span className={styles['player-card__name']}>{player?.userName}</span>
    </div>
  );
};

export default PlayerCard;