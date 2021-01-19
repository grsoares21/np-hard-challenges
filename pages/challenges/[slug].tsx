import fs from "fs";
import { Box, Text, Image } from "@chakra-ui/react";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const Challenges: React.FC<{
  challengeName: string;
  challengeStatement: string;
}> = ({ challengeName, challengeStatement }) => {
  console.log(`Challenge statement ${challengeStatement}`);
  return (
    <Box width="100%">
      <Text as="h3" fontSize="2em" textAlign="center">
        {challengeName}
      </Text>
      <Box
        border="solid 1px black"
        marginTop="20px"
        marginX={["10px", "20px", "70px", "200px", "300px"]}
        padding="15px"
        dangerouslySetInnerHTML={{
          __html: challengeStatement,
        }}
      ></Box>
    </Box>
  );
};

export default Challenges;

const challengesDirectory = join(process.cwd(), "challenges");

export async function getStaticProps({ params }) {
  const challengeData = matter(
    fs.readFileSync(join(challengesDirectory, params.slug + ".md"), "utf8")
  );

  const challengeStatement = (
    await remark()
      .use(html)
      .process(challengeData.content ?? "")
  ).toString();

  return {
    props: {
      challengeName: challengeData.data.name,
      challengeStatement,
    },
  };
}

export async function getStaticPaths() {
  const challengeFileNames = fs.readdirSync(challengesDirectory);

  return {
    paths: challengeFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.replace(".md", ""),
        },
      };
    }),
    fallback: false,
  };
}
