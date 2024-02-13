export interface IAvatarPicker {
    avatar: string,
    isEditable?: boolean,
    onAvatarChange: (avatar: AvatarOption) => void,
    isLoading?: boolean
}

export type AvatarOption = {
    id: number;
    imageUrl: string;
  };