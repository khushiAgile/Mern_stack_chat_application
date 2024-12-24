import { Wrapper } from './style';

import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import Button from 'components/common/Button';

import { authFail } from 'services/redux/AuthSlice';
import { useAppSelector } from 'services/redux/store';

const Header = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { userData } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(authFail());
    // Clear query cache
    queryClient.clear();
  };

  return (
    <>
      <Wrapper>
        <div className="left">
          <h2>LOGO</h2>
        </div>
        <span>Hello, {userData?.firstName.concat(' ').concat(userData?.lastName)}</span>
        <div className="right">
          <Button variant="primary" type="button" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
