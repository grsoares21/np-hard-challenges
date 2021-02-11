import runMiddleware from "../../lib/runMiddleware";
import authenticationMiddleware, {
  AuthenticatedRequest,
} from "../../lib/firebase/authenticationMiddleware";

export default async (req: AuthenticatedRequest, res: any) => {
  await runMiddleware(req, res, authenticationMiddleware);

  res.json({
    name: req.user.name,
    email: req.user.email,
    totalScore: req.user.totalScore,
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
