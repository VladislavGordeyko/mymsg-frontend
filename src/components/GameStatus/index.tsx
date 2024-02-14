import React, { useEffect, useState } from 'react';
import { IGameStatusComponent } from './models';
import styles from './gameStatus.module.scss';
import PlayerCard from '../PlayerCard';
import Image from 'next/image';
import TextInput from '../TextInput';
import Button from '../Button';

const GameStatus: React.FC<IGameStatusComponent> = ({
  clientId,
  gameStatus,
  host,
  onWordChange,
  selectedPlayer,
  word,
  setWordToUser,
  isGuessed,
  setIsGueesed
}) => {
  const [isNotPlayable, setIsNotPlayable] = useState(false);
  const [isWordHide, setIsWordHide] = useState(true);

  useEffect(() => {
    if (gameStatus?.previousMoveClientId === clientId) {
      setIsNotPlayable(true);
    } else {
      setIsNotPlayable(false);
    }
  }, [gameStatus]);

  const onBackClick = () => {
    setIsGueesed(false);
    window.Telegram.WebApp.BackButton.hide();
  };

  const onGuessClick = () => {
    setIsWordHide(true);
    setIsGueesed(true);
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(onBackClick);
  };

  const setWordClick = () => {
    window.Telegram.WebApp.BackButton.hide();
    setWordToUser();
  };

  return (
    <div className={styles['game-status']}>
      {gameStatus?.currentWord ? <>
        {gameStatus?.currentMoveClientId === clientId ? <>
          {!isGuessed ? <>
            <div className={styles['game-status__word-container']}>
              <span className={styles['game-status__text']}>You are demonstrating this word:</span>
              <div className={styles['game-status__word']}>
                {isWordHide ?
                  <Button
                    text='Show word'
                    onClick={() => setIsWordHide(false)}
                  /> :
                  <span
                    className={styles['game-status__word-text']}
                    onClick={() => setIsWordHide(true)}
                  >
                    {gameStatus.currentWord}
                  </span>
                }
              </div>
              {/* <span className={styles['game-status__small-text']}>Please try to show the words using sign language, not using words or giving clues that can be lip-read.</span> */}
            </div>
            <div className={styles['game-status__guessed-container']}>
              <span className={styles['game-status__small-text']}>If someone is guessed press the button below</span>
              <Button text='Someone guessed' onClick={onGuessClick} />
            </div>
          </> : <div className={styles['game-status__set-word-container']}>
            <Image
              src='/assets/charades-game.png'
              alt='charades-game'
              width={543}
              height={499}
              className={styles['game-status__image']}
            />
            <span className={styles['game-status__text']}>Pick a player which guessed the word and type a word(s)</span>
            <TextInput className={styles['game-status__input']} value={word} onChange={onWordChange} placeholder='Word(s)' label='Word(s)' />
            <Button text='Confirm' onClick={setWordClick} disabled={!(selectedPlayer && word !== '')} />
          </div>}
        </> : <>{isNotPlayable ?
          <div className={styles['game-status__watch']}>
            <span className={styles['game-status__text']}>Now just chill and have fun!</span>
          </div> :
          <div className={styles['game-status__player-show']}>
            <span className={styles['game-status__text']}>This player is currently showing the word:</span>
            {gameStatus.currentMovePlayer && <PlayerCard player={gameStatus.currentMovePlayer} />}
            <span className={styles['game-status__text-info']}>Try to guess the word</span>
          </div>
        }</>}
      </> :
        <>
          {host?.clientId === clientId && !gameStatus?.currentMoveClientId &&
            <>

              <div className={styles['game-status__waiting']}>
                <Image
                  src='/assets/charades-game.png'
                  alt='charades-game'
                  width={543}
                  height={499}
                  className={styles['game-status__image']}
                />
                <span className={styles['game-status__text']}>
                  Select a player to start, type a word, and have that player express the word through body language.
                </span>
                <TextInput className={styles['game-status__input']} value={word} onChange={onWordChange} placeholder='Word(s)' label='Word(s)' />
              </div>

              <Button className={styles['game-status__set-word']} text='Confirm' onClick={setWordClick} disabled={!(selectedPlayer && word !== '')} />
              {/* <Button text='Random select' onClick={randomSelect} /> */}
            </>}
          {!gameStatus?.currentMoveClientId && host?.clientId !== clientId && <div className={styles['game-status__waiting']}>
            <Image
              src='/assets/charades-game.png'
              alt='charades-game'
              width={543}
              height={499}
              className={styles['game-status__image']}
            />
            <span className={styles['game-status__text']}>
              Waiting to player will be chosen...
            </span>
          </div>}
        </>}
    </div>
  );
};

export default GameStatus;