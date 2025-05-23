import { useEffect } from "react";
import "../styles/global.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetch("/api/init");
  }, []);

  return <Component {...pageProps} />;
}
