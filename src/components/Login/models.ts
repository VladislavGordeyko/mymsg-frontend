import { WebAppInitData } from '@twa-dev/types';

export interface ILogin {
    telegramData?: WebAppInitData,
    onLogin: (name: string, avatar: string) => void
}