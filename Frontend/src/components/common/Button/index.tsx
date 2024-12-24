import { Wrapper } from './style';

interface IButtonProps {
  children: any;
  buttonClass?: string;
  disabled?: boolean;
  type: 'button' | 'reset' | 'submit' | undefined;
  variant?: 'primary' | 'secondary';
  onClick?: any;
}

const Button = (props: IButtonProps) => {
  const { children, variant, buttonClass, type = 'button', disabled, onClick } = props;

  return (
    <Wrapper
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variant === 'primary' && 'btnPrimary'}  ${
        variant === 'secondary' && 'btnSecondary'
      } ${disabled && 'disabled'} ${buttonClass}`}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
