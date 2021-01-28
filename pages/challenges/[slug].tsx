import fs from "fs";
import { Box, Text, Spinner, Button } from "@chakra-ui/react";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

const Challenges: React.FC<{
  challengeName: string;
  challengeStatement: string;
  challengeCode: string;
}> = ({ challengeName, challengeStatement, challengeCode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const onChooseFile = () => {
    if (fileInputRef.current) {
      const body = new FormData();
      body.append("solution", fileInputRef.current.files[0]);

      setLoading(true);
      user.getIdToken().then((token) => {
        console.log("calling upload solution");
        fetch(`/api/challenges/${challengeCode}/upload-solution`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        })
          .then((result) => result.json())
          .then((data) => {
            setLoading(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            if (!data.validSolution) {
              alert("Solução invalida");
            } else if (data.newRecord) {
              alert(`Parabéns, novo recorde: ${data.score}`);
            } else {
              alert(`Score: ${data.score}`);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      });
    }
  };

  return (
    <Box width="100%">
      <Text as="h3" fontSize="2em" textAlign="center">
        {challengeName}
      </Text>

      <Box
        border="dashed 1px black"
        marginTop="20px"
        marginX={["10px", "20px", "70px", "200px", "300px"]}
        padding="15px"
      >
        <Box display="flex" width="100%" justifyContent="flex-end">
          <form>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={onChooseFile}
              accept=".txt"
            />
          </form>
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {loading ? <Spinner /> : "Upload Solution"}
          </Button>
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: challengeStatement,
          }}
        ></Box>
      </Box>
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
      challengeCode: "the-knapsack-problem", // TODO: replace by slug
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
