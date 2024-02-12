import { IGameStatus, IPlayer } from '@/entities/game';

export interface IGame {
    sessionId?: string,
    players: IPlayer[],
    host?: IPlayer,
    gameStatusUpdate?: IGameStatus,
    clientId: string,
}
