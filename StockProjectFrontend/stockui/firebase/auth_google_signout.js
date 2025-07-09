import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export async function signOutWithGoogle() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
