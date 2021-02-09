import firebase from "firebase/app";
import "firebase/auth";

const provider = new firebase.auth.GithubAuthProvider();

provider.addScope("read:user");
provider.addScope("user:email");

export default provider;
