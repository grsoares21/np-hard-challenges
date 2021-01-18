import Head from "next/head";
import { Container, Text } from "@chakra-ui/react";
import MainMenu from "./MainMenu";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container centerContent maxW="x1">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway+Dots&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <Text
          as="h1"
          fontSize={["2em", "2.7em", "4em", "5.7em", "7em"]}
          textAlign="center"
          fontFamily="'Raleway Dots', sans-serif"
        >
          NP Hard Challenges
        </Text>
        <Text
          as="h5"
          fontSize={["0.9em", "1em", "1.1em", "1.5em", "2em"]}
          textAlign="center"
          fontFamily="'Roboto', sans-serif"
        >
          Compete and practice algorithms of combinatorial optimization
        </Text>
      </header>
      <MainMenu />
      <main style={{ width: "100%" }}>{children}</main>
      {/** todo add footer */}
    </Container>
  );
}
