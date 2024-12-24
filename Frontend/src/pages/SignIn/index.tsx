import { Wrapper } from './style';

import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import { RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

import { useSignIn } from 'services/hooks/auth';
import { ILoginApiParam } from 'services/redux/AuthSlice/types';
import { useAppSelector } from 'services/redux/store';

import { ROUTES } from 'utils/constants/routes';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILoginApiParam>();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { mutate: signInMutate } = useSignIn();

  const onSubmit = (value: ILoginApiParam) => {
    signInMutate(value, {
      onSuccess: () => {
        navigate(ROUTES.chat);
      }
    });
  };

  if (isLoggedIn) {
    return <Navigate to={ROUTES.chat} />;
  }

  return (
    <>
      <Meta title="Chat App - Sign In" />
      <Wrapper>
        <div>
          <h2>Sign In</h2>
          <div className="form-container">
            {/* Sign in form */}

            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
              <RenderTextInput register={register('email')} type="email" labelName="Email" />
              <RenderTextInput
                register={register('password')}
                type="password"
                labelName="Password"
              />
              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </form>
          </div>
          <div className="mt-10">
            If you don't have an account,{' '}
            <a href={ROUTES.signUp} className="glow-on-hover">
              Sign Up
            </a>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SignIn;
