import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebase";

import Login from "./login";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function App({ Component, pageProps }: AppProps) {
  const [userLoggedIn, loading, error] = useAuthState(auth);

  //record the user infor into the database in firebase by using setDoc(), useEffect()
  //Add a new document in collection "users"
  //useEffect() is used before rendering a component or loading a component
  useEffect(() => {
    const setUserInDatabase = async () => {
      try {
        await setDoc(
          doc(db, "users", userLoggedIn?.uid as string),
          {
            email: userLoggedIn?.email,
            lastSeen: serverTimestamp(),
            photoURL: userLoggedIn?.photoURL,
          },
          //just to update the user infor
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log("error when setting user infor into database", error);
      }
    };
    if (userLoggedIn) setUserInDatabase();
  }, [userLoggedIn]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (userLoggedIn) return <Component {...pageProps} />;
  return <Login />;
}
