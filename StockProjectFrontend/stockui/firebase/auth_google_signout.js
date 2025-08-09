import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export async function signOutWithGoogle() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
