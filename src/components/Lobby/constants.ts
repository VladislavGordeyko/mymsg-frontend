import { IPlayer } from '@/entities/game';
import { avatarOptions } from '../AvatarPicker/constants';

export const SESSIONNOTEXISTTEXT = 'Uh oh! Looks like session is expired. Try to create a new game!';
export const CONNECTIONERRORTEXT = 'Connection Error';


export const playersMock: IPlayer[] = [
  {
    avatar: avatarOptions[0].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 1',
    isHost: true,
    clientId: '1'
  },
  {
    avatar: avatarOptions[1].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 2',
    clientId: '2'
  },
  {
    avatar: avatarOptions[2].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 3',
    clientId: '3'
  },
  {
    avatar: avatarOptions[3].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 4',
    clientId: '4'
  },
  {
    avatar: avatarOptions[4].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 5',
    clientId: '5'
  },
  {
    avatar: avatarOptions[5].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 6',
    clientId: '6'
  },
  {
    avatar: avatarOptions[6].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 7',
    clientId: '7'
  },
  {
    avatar: avatarOptions[7].imageUrl,
    isCurrentMove: false,
    score: 0,
    tgId: '',
    userName: 'user 8',
    clientId: '8'
  },
];