import { IPlayer } from '@/entities/game';

export interface IPlayerCard {
    player: IPlayer,
    isSelected?: boolean,
    isCurrentPlayer?: boolean,
    size?: 'sm' | 'md',
    onClick?: () => void,
}