import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('./header'));

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
