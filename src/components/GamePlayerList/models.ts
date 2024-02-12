import { IPlayer } from '@/entities/game';

export interface IGamePlayerList {
    players: IPlayer[],
    onPlayerClick?: (player: IPlayer) => void,
    selectedPlayer?: IPlayer,
}