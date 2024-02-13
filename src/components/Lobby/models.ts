import { IPlayer } from '@/entities/game';

export interface ILobby {
    session?: string,
    onBack: () => void,
    player: IPlayer,
}