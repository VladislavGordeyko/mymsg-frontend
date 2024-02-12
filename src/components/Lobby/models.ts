import { IPlayer } from '@/entities/game';

export interface ILobby {
    session?: string,
    chatId?: string,
    onBack: () => void,
    player: IPlayer,
}