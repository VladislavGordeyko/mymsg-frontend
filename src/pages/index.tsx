import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import Lobby from '@/components/Lobby';
import { IPlayer } from '@/entities/game';
import { WebSocketProvider } from '@/context/WebSocketContext';
import Login from '@/components/Login';
import { WebAppInitData } from '@twa-dev/types';

// const mockData: WebAppInitData = {
// 	'user': {
// 		'id': 1,
// 		'first_name': 'Vlad',
// 		'last_name': 'Gordeyko',
// 		'username': 'linken_vlad',
// 		'language_code': 'en',
// 		'allows_write_to_pm': true
// 	},
// 	'chat_instance': '1',
// 	'chat_type': 'private',
// 	'start_param': '1',
// 	'auth_date': 1,
// 	'hash': '1'
// };

const Home = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [player, setPlayer] = useState<IPlayer>();
	const [telegramUserData, setTelegramUserData] = useState<WebAppInitData>();
	const [session, setSession] = useState<string>();

	const onLogin = (name: string, avatar: string) => {
		console.log({ telegramUserData })
		setPlayer({ avatar: avatar, userName: name, isCurrentMove: false, score: 0, tgId: telegramUserData?.user?.username || '', });
		setIsLoggedIn(true);
	};

	useEffect(() => {
		window.Telegram.WebApp.ready();
		window.Telegram.WebApp.expand();
		console.log(window.Telegram);
		const data = window.Telegram.WebApp.initDataUnsafe.start_param;
		setTelegramUserData(window.Telegram.WebApp.initDataUnsafe);
		console.log(data);
		if (data) {
			setSession(data);
			// setGameType('Player');
		} else {
			setSession('a95accda-2dff-42d1-a598-a00cf7031b25');
		}
	}, []);

	const onBack = () => {
		// setGameType('Unnasigned');
	};

	const renderMainComponent = () => {
		if (isLoggedIn && player) {
			return <WebSocketProvider sessionId={session} player={player}>
				<Lobby session={session} onBack={onBack} player={player} />
			</WebSocketProvider>;
		} else {
			return <div className={styles['home__login']}>
				<Login telegramData={telegramUserData} onLogin={onLogin} />
			</div>;
		}
	};

	return (
		<main className={styles.home}>
			{renderMainComponent()}
		</main>
	);
};

export default Home;
