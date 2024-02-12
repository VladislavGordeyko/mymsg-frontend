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
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<AvatarOption>(avatarOptions[0]);

  useEffect(() => {
    if(telegramData && telegramData.user) {
      setName(telegramData.user.username);
      let suggestions: string[] = [];
      if (telegramData.user.username) {
        suggestions.push(telegramData.user.username);
      }
      if (telegramData.user.first_name) {
        suggestions.push(telegramData.user.first_name);
      }
      if (telegramData.user.last_name) {
        suggestions.push(telegramData.user.last_name);
      }
      if (telegramData.user.last_name && telegramData.user.first_name) {
        suggestions.push(`${telegramData.user.first_name} ${telegramData.user.last_name}`);
      }
      setNameSuggestions(suggestions);

      console.log({nameSuggestions});
      
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
      if (avatar) {
        const telegramAvatar = {id: 9, imageUrl: avatar};
        setAvatar(telegramAvatar);
        avatarOptions.push(telegramAvatar);
      }
     
    }
  };

  useEffect(() => {
    getAvatar();
  },[telegramData]);

  return (
    <div className={styles['login']}>
      <span className={styles['login__title']}>MYMSG</span>
      <div className={styles['login__user-container']}>
        <AvatarPicker avatar={avatar.imageUrl} isEditable  onAvatarChange={avatarChange}/>
        <TextInput className={styles['login__input']} label='Name' value={name} onChange={setName}  placeholder='Put your name here' suggestions={nameSuggestions}/>
      </div>
      <Button onClick={onJoin} text='Join game' disabled={name === ''}/>
    </div>
  );
};

export default Login;