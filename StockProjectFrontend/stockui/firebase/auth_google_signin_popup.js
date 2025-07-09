import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("GoogleAuthProvider initialized successfully:", result);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("Credential:", credential);
    const token = credential.accessToken;
    console.log("Access Token:", token);
    const user = result.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error initializing GoogleAuthProvider:", error);
  }
}
