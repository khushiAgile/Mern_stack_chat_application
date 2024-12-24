export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes {
  _id: string;
  accessToken: string;
}

export interface ISignUpReq {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
