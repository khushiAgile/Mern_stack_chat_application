import { Wrapper } from './style';

import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import { RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

import { ISignUpReq } from 'services/api/auth/types';
import { useSignUp } from 'services/hooks/auth';
import { useAppSelector } from 'services/redux/store';

import { ROUTES } from 'utils/constants/routes';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ISignUpReq>();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { mutate: signUpMutate } = useSignUp();

  const onSubmit = (value: ISignUpReq) => {
    signUpMutate(value, {
      onSuccess: () => {
        navigate(ROUTES.signIn);
      }
    });
  };

  if (isLoggedIn) {
    return <Navigate to={ROUTES.chat} />;
  }

  return (
    <>
      <Meta title="Chat App - Sign Up" />
      <Wrapper>
        <div>
          <h2>Sign Up</h2>
          <div className="form-container">
            {/* Sign up form */}

            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
              <RenderTextInput
                register={register('firstName')}
                type="text"
                labelName="First Name"
              />
              <RenderTextInput register={register('lastName')} type="text" labelName="Last Name" />
              <RenderTextInput register={register('email')} type="email" labelName="Email" />
              <RenderTextInput
                register={register('password')}
                type="password"
                labelName="Password"
              />
              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </form>
          </div>
          <div className="mt-10">
            If you have an account,{' '}
            <a href={ROUTES.signIn} className="glow-on-hover">
              Sign In
            </a>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SignUp;
