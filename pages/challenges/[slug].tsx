import fs from "fs";
import { Box, Text, Spinner, Button, Fade, EASINGS } from "@chakra-ui/react";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import highlight from "remark-highlight.js";
import { useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import useAnimatedNumber from "../../hooks/useAnimateNumber";
import styled from '@emotion/styled'


const StatementBox = styled(Box)`
  h2 {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 5px;
  }

  ul {
    padding-left: 20px;
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  pre {
    margin: 10px;
    padding: 10px;
    background-color: #F0F0F0;
    white-space: pre-wrap;
  }

  .hljs-comment {
    color: green;
    opacity: 0.9;
  }

  .hljs-number {
    color: blue;
    opacity: 0.9;
  }
`;



const Challenges: React.FC<{
  challengeName: string;
  challengeStatement: string;
  challengeCode: string;
}> = ({ challengeName, challengeStatement, challengeCode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const [validSolution, setValidSolution] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const [animatedScore, setAnimatedScore] = useAnimatedNumber(0, {
    decimals: 0,
    duration: 5000,
    enterance: false,
    easing: "easeOutQuint",
  });

  const { user } = useContext(UserContext);

  const onChooseFile = () => {
    if (fileInputRef.current) {
      const body = new FormData();
      body.append("solution", fileInputRef.current.files[0]);
      body.append("challengeId", challengeCode);
 
      setLoading(true);
      user.getIdToken().then((token) => {
        console.log("calling upload solution");
        fetch(`/api/challenges/upload-solution`, {
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
              setValidSolution(false);
              setNewRecord(false);
            } else if (data.newRecord) {
              setValidSolution(true);
              setNewRecord(true);
            } else {
              setValidSolution(true);
              setNewRecord(false);
            }
            setAnimatedScore(data.score, false);
            setShowScore(true);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      });
    }
  };

  useEffect(() => {
    if (showScore) {
      const showScoreTimeout = setTimeout(() => {
        setShowScore(false);
        setAnimatedScore(0, true);
      }, 6500);

      return () => {
        clearTimeout(showScoreTimeout);
      };
    }
  }, [showScore]);

  return (
    <Box width="100%">      
      <Fade
        in={showScore}
        unmountOnExit={true}
        variants={{
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: EASINGS.easeOut,
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.25,
              ease: EASINGS.easeIn,
            },
          },
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="#FFF"
          zIndex="10"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={100}>
            {validSolution
              ? newRecord
                ? `Novo Recorde! ${animatedScore} pontos`
                : `${animatedScore} pontos`
              : "Solução invalida!"}
          </Text>
        </Box>
      </Fade>
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
        <Text as="h1" fontSize="2em" textAlign="center" fontWeight="bold" marginY="10px">
        {challengeName}
      </Text>
        <StatementBox
          dangerouslySetInnerHTML={{
            __html: challengeStatement,
          }}
        ></StatementBox>
      </Box>
    </Box>
  );
};

export default Challenges;

const challengesDirectory = join(process.cwd(), "challenges");

export async function getStaticProps({ params }) {
  const challengeData = matter(
    fs.readFileSync(
      join(challengesDirectory, params.slug, "statement.md"),
      "utf8"
    ), {

    }
  );

  const challengeStatement = (
    await remark()
      .use(html)
      .use(highlight)
      .process(challengeData.content ?? "")
  ).toString();

  return {
    props: {
      challengeName: challengeData.data.name,
      challengeCode: params.slug,
      challengeStatement,
    },
  };
}

export async function getStaticPaths() {
  const challengeFileNames = fs
    .readdirSync(challengesDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

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
