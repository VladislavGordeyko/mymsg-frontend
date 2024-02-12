export interface IAvatarPicker {
    avatar: AvatarOption,
    isEditable?: boolean,
    onAvatarChange: (avatar: AvatarOption) => void,
}

export type AvatarOption = {
    id: number;
    imageUrl: string;
  };