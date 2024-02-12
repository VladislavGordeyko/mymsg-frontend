import React, { useState } from 'react';
import styles from './avatarPicker.module.scss';
import PencilIcon  from '../../../public/assets/icons/pencil.svg';
import { AvatarOption, IAvatarPicker } from './models';
import Image from 'next/image';
import Modal from './components/Modal';
import { avatarOptions } from './constants';

const AvatarPicker: React.FC<IAvatarPicker> = ({ avatar, isEditable, onAvatarChange }) => {
  const [showModal, setShowModal] = useState(false);
  // const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>();

  const handleAvatarClick = (avatar: AvatarOption) => {
    // setSelectedAvatar(avatar);
    onAvatarChange(avatar);
    setShowModal(false);
  };

  return (
    <div className={styles['avatar-picker']}>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div>Select an Avatar</div>
        <div className={styles['avatar-picker__avatars']}>
          {avatarOptions.map((avatar) => (
            <Image
              key={avatar.id}
              src={avatar.imageUrl}
              alt={`Avatar ${avatar.id}`}
              width={50}
              height={50}
              onClick={() => handleAvatarClick(avatar)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </Modal>
      {/* {avatar ? <img
        alt='user-avatar'
        onClick={() => isEditable && setShowModal(true)}
        className={styles['avatar-picker__avatar']}
        // src='https://fastly.picsum.photos/id/433/200/200.jpg?hmac=dBn6DDBngOA94Grm3jfIJNDtv08GorUvB0zMeAw0Jfs'
        src={image}
      /> :  */}
      <Image
        onClick={() => isEditable && setShowModal(true)}
        className={styles['avatar-picker__avatar']}
        src={avatar.imageUrl}
        alt='avatar'
        height={50}
        width={50}
      />
      {/* } */}
      {isEditable && 
      <div className={styles['avatar-picker__edit-container']}>
        <PencilIcon className={styles['avatar-picker__pencil']} />
      </div>}
    </div>
  );
};

export default AvatarPicker;