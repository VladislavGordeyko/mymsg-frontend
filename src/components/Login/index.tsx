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
  const [name, setName] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<AvatarOption>(avatarOptions[0]);
 
  useEffect(() => {
    if(telegramData && telegramData.user) {
      const { username, first_name, last_name } = telegramData.user;
      setName(username || first_name);

      const suggestions = [
        username,
        first_name,
        last_name,
        first_name && last_name ? `${first_name} ${last_name}` : null,
      ].filter(Boolean) as string[];

      setNameSuggestions(suggestions);
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
    setIsImageLoading(true);
    const tgService = new TelegramService();
    if (telegramData?.user) {
      const avatar = await tgService.getProfilePhoto(telegramData?.user?.id);
      if (avatar) {
        const telegramAvatar = {id: 9, imageUrl: avatar};
        setAvatar(telegramAvatar);
        avatarOptions.push(telegramAvatar);
      }
    }
    setIsImageLoading(false);
  };

  useEffect(() => {
    getAvatar();
  },[telegramData]);

  return (
    <div className={styles['login']}>
      <span className={styles['login__title']}>MYMSG</span>
      <div className={styles['login__user-container']}>
        <AvatarPicker 
          isLoading={isImageLoading} 
          avatar={avatar.imageUrl} 
          isEditable  
          onAvatarChange={avatarChange}
        />
        <TextInput className={styles['login__input']} label='Name' value={name} onChange={setName}  placeholder='Put your name here' suggestions={nameSuggestions}/>
      </div>
      <Button onClick={onJoin} text='Join game' disabled={!name}/>
    </div>
  );
};

export default Login;