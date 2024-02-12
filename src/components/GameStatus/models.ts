import { IGameStatus, IPlayer } from '@/entities/game';

export interface IGameStatusComponent {
    host?: IPlayer,
    clientId: string,
    gameStatus?: IGameStatus,
    word: string,
    onWordChange: (word: string) => void,
    selectedPlayer?: IPlayer,
    setWordToUser: () => void,
    isGuessed: boolean,
    setIsGueesed: (guessed: boolean) => void, 
}