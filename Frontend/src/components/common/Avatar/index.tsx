import { AvatarContainer, AvatarImage } from './style';

export interface IProps {
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  initials?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const Avatar: React.FC<IProps> = ({
  size = 50,
  backgroundColor,
  textColor,
  initials,
  imageUrl,
  onClick
}) => {
  return (
    <AvatarContainer
      size={size}
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
    >
      {imageUrl ? <AvatarImage src={imageUrl} alt="avatar" /> : initials}
    </AvatarContainer>
  );
};

export default Avatar;
