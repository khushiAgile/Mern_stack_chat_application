import { Wrapper } from './style';

interface IProps {
  children?: React.ReactNode;
}

export const LoaderWrapper: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};

export const Loader: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <div className="loader"></div>
        {children}
      </Wrapper>
      {children}
    </>
  );
};
