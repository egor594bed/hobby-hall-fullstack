export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isActivated?: boolean;
}
