import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthGuard from '../components/common/AuthGuard';
import SocketContext from 'components/chat/SocketContext';

import { ROUTES } from 'utils/constants/routes';

const Layout = lazy(() => import('../components/layout'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));

const Chat = lazy(() => import('./Chat'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route path={ROUTES.signUp} element={<SignUp />} />
      <Route
        path={ROUTES.default}
        element={
          <SocketContext>
            <AuthGuard>
              <Layout />
            </AuthGuard>
          </SocketContext>
        }
      >
        <Route index path={ROUTES.chat} element={<Chat />} />
        <Route path={ROUTES.default} element={<Navigate replace to={ROUTES.chat} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.default} />} />
    </Routes>
  );
};

export default Routing;
