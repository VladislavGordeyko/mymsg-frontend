export interface IGameStatus {
    currentMoveClientId: string,
    currentMovePlayer?: IPlayer,
    currentWord?: string,
    previousMoveClientId?: string,
    status: 'started' | 'lobby',
}

export interface IBaseClient {
    clientId?: string,
    userName?: string,
    tgId: string,
    avatar: string,
}
export interface IPlayer extends IBaseClient {
    score: number,
    isCurrentMove: boolean,
    isHost?: boolean,
}