import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'services/redux/store';

import { ROUTES } from 'utils/constants/routes';

import { LoaderWrapper } from '../loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      // TODO : Uncomment the line above and provide the correct import for ROUTES
      navigate(ROUTES.signIn, { replace: true });
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) return <>{children}</>;
  else
    return (
      <LoaderWrapper>
        <h6>Loading</h6>
      </LoaderWrapper>
    );
};

export default AuthGuard;
