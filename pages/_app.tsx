import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import Login from "./login";
import Loading from "@/components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const [userLoggedIn, loading, error] = useAuthState(auth);

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
