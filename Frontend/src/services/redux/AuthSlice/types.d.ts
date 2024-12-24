export interface IUserData {
  accessToken: string;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ILoginApiParam {
  email: string;
  password: string;
  deviceId: string;
  deviceType: string;
  fcmToken: string;
}
