export interface IAvatarPicker {
    avatar: string,
    isEditable?: boolean,
    onAvatarChange: (avatar: AvatarOption) => void,
}

export type AvatarOption = {
    id: number;
    imageUrl: string;
  };