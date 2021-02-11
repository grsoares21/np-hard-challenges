import runMiddleware from "../../lib/runMiddleware";
import authenticationMiddleware, {
  AuthenticatedRequest,
} from "../../lib/firebase/authenticationMiddleware";
import firestore from "../../lib/firebase/firestore";

export default async (req: AuthenticatedRequest, res: any) => {
  await runMiddleware(req, res, authenticationMiddleware);

  // TODO: use yup to validade body
  req.body = JSON.parse(req.body);
  if (!req.body.name || !req.body.email) {
    res.status(400);
    res.send("Please send both email and user name");
    return;
  }

  const usersCollection = firestore.collection("users");
  const userDoc = usersCollection.doc(req.user.uid);
  const userData = (await userDoc.get()).data();

  userDoc.set({ ...userData, name: req.body.name, email: req.body.email });

  res.send(200);
};
