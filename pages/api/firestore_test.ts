import { NextApiRequest, NextApiResponse } from "next";
import firestore from "../../lib/firestore";

export default (_: NextApiRequest, res: NextApiResponse) => {
  firestore
    .collection("users")
    .get()
    .then((result) => {
      res.json({ data: result.docs.map((d) => d.data()) });
    })
    .catch((error) => res.json({ error }));
};
