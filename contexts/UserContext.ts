import { createContext } from "react";
import firebase from "firebase/app";

export type User = {
  name: string;
  email: string;
  token: string;
};

type userContext = {
  user?: firebase.User;
  setUser: (user: firebase.User) => void;
};

export default createContext<userContext>({
  setUser: (_user) => {},
});
