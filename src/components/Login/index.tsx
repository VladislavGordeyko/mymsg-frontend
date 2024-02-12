import React, { useEffect, useState } from 'react';
import { ILogin } from './models';
import Button from '../Button';
import styles from './login.module.scss';
import AvatarPicker from '../AvatarPicker';
import TextInput from '../TextInput';
import { TelegramService } from '@/services/TelegramService';
import { AvatarOption } from '../AvatarPicker/models';
import { avatarOptions } from '../AvatarPicker/constants';

const Login:React.FC<ILogin> = ({ telegramData, onLogin }) => {
  const [name, setName] = useState(telegramData?.user?.username);
  const [avatar, setAvatar] = useState<AvatarOption>(avatarOptions[0]);

  useEffect(() => {
    if(telegramData) {
      setName(telegramData.user?.username);
    }
  },[telegramData]);

  const onJoin = () => {
    if (name) {
      onLogin(name, avatar.imageUrl);
    }
  };

  const avatarChange = (avatar: AvatarOption) => {
    setAvatar(avatar);
  };

  const getAvatar = async () => {
    const tgService = new TelegramService();
    if (telegramData?.user) {
      const avatar = await tgService.getProfilePhoto(telegramData?.user?.id);
      // setAvatar(avatar);
      console.log({avatar});
    }
  };

  useEffect(() => {
    getAvatar();
  },[telegramData]);

  return (
    <div className={styles['login']}>
      <span className={styles['login__title']}>MYMSG</span>
      <div className={styles['login__user-container']}>
        <AvatarPicker avatar={avatar} isEditable  onAvatarChange={avatarChange}/>
        <TextInput label='Name' value={name} onChange={setName}  placeholder='Put your name here'/>
      </div>
      <Button onClick={onJoin} text='Join game' disabled={name === ''}/>
    </div>
  );
};

export default Login;