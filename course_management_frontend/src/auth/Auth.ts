import { Dispatch, SetStateAction } from "react";

export interface AuthObject {
  username: string;
  password: string;
  token: string;
}

export type AuthContextType = {
  auth: AuthObject | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject | null>>;
};
