import { NextApiRequest, NextApiResponse } from "next";
import challengeInputs from "../../../../challenges/challengeInputs";


export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { challengeId }
  } = req
  const challengeInput = challengeInputs[challengeId as string]();

  res.setHeader('Content-disposition', 'attachment; filename=input.txt');
  res.setHeader('Content-type', 'text/plain');
  res.setHeader('Content-length', challengeInput.length);
  res.send(challengeInput);

  return;
};