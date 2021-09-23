import "../styles/globals.scss";
import type { AppProps } from 'next/app'
import { CepContextProvider } from "../hooks/useCEP";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CepContextProvider>
      <Component {...pageProps} />
    </CepContextProvider>

  );
}
export default MyApp
