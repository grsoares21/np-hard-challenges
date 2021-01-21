import { createContext } from "react";

export type User = {
  name: string;
  email: string;
  token: string;
};

type userContext = {
  user?: User;
  setUser: (user: User) => void;
};

export default createContext<userContext>({
  setUser: (_user) => {},
});
