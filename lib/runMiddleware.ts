import { NextApiRequest, NextApiResponse } from "next";

export default function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result?: any) => void
  ) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
