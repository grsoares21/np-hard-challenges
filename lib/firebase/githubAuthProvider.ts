import firebase from "firebase";

const provider = new firebase.auth.GithubAuthProvider();

provider.addScope("read:user");
provider.addScope("user:email");

export default provider;
