import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "../../../../lib/runMiddleware";
import multer from "multer";
import kanpsackInstance from "./instance_1.json";

const upload = multer({ storage: multer.memoryStorage() });

export default async (req: any, res: any) => {
  await runMiddleware(req, res, upload.single("solution")).then(() => {});

  const solution = String(req.file.buffer).split("\n");

  let totalScore = 0;
  let currentSize = 0;

  for (let i = 0; i < solution.length; i++) {
    const { value, size } = kanpsackInstance.items[+solution[i]];

    currentSize += size;
    totalScore += value;

    if (currentSize > kanpsackInstance.knapsackSize) {
      res.send({
        score: 0,
        validSolution: false,
      });

      return;
    }
  }

  res.send({
    score: totalScore,
    validSolution: true,
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
