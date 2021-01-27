import "../styles/global.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import UserContext, { User } from "../contexts/UserContext";
import firebase from "firebase";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<firebase.User>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [firebase]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserContext.Provider>
  );
}
