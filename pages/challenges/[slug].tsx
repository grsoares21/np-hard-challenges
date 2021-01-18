import fs from "fs";
import { Box, Text, Image } from "@chakra-ui/react";
import { join } from "path";

const Challenges: React.FC<{ challengeName: string }> = ({ challengeName }) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap">
      {challengeName}
    </Box>
  );
};

export default Challenges;

const challengesDirectory = join(process.cwd(), "challenges");

export async function getStaticPaths() {
  const challengeFileNames = fs
    .readdirSync(challengesDirectory)
    .map((fileName) => fileName.replace(".md", ""));

  return {
    paths: challengeFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { challengeName: params.slug },
  };
}
