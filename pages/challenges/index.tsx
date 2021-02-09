import fs from "fs";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { join } from "path";
import matter from "gray-matter";
import Link from "next/link";

const ChallengeBox: React.FC<{
  slug: string;
  name: string;
  description: string;
  imgSrc: string;
}> = ({ name, description, imgSrc, slug }) => {
  return (
    <Box border="1px" display="flex" padding="15px" height="100%">
      <Box bg="#CCCCC" width="40%" display="flex" alignItems="center">
        <Image src={imgSrc}></Image>
      </Box>
      <Box
        width="60%"
        paddingLeft="15px"
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        <Text
          textAlign="center"
          as="h3"
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif"
          marginY="10px"
          width="100%"
        >
          {name}
        </Text>
        <Text width="100%">{description}</Text>
        <Link href={`/challenges/${slug}`}>
          <Button
            marginTop="10px"
            alignSelf="flex-end"
            bg="white"
            border="1px solid black"
          >
            Solve
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const Challenges: React.FC<{ challengeData: any[] }> = ({ challengeData }) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap">
      {challengeData.map((chal, i) => (
        <Box
          width={["100%", "100%", "100%", "100%", "50%", "50%", "25%"]}
          paddingX="60px"
          marginBottom="30px"
          key={i}
        >
          <ChallengeBox
            name={chal.name}
            description={chal.description}
            imgSrc={chal.imgSrc}
            slug={chal.slug}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Challenges;

const challengesDirectory = join(process.cwd(), "challenges");

export async function getStaticProps() {
  const challengeFileNames = fs
    .readdirSync(challengesDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const challengeData = challengeFileNames.map((fileName) => {
    const fileContent = fs.readFileSync(
      join(challengesDirectory, fileName, "statement.md"),
      "utf8"
    );
    const { data } = matter(fileContent);
    return { ...data, slug: fileName.replace(".md", "") };
  });

  return {
    props: { challengeData },
  };
}
