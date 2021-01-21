import "../styles/global.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { useState } from "react";
import UserContext, { User } from "../contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
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
