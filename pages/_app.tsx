import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

import Login from "./login";

export default function App({ Component, pageProps }: AppProps) {
  const [userLoggedIn, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
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
