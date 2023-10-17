interface AuthObject  {
    username: string,
    password: string,
    token: string
  }

type AuthContextType = {
    auth: AuthObject | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthObject | null>>;
  };