import "../styles/globals.scss";
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { CepContextProvider } from "../hooks/useCEP";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CepContextProvider>
        <Component {...pageProps} />
      </CepContextProvider>
    </ChakraProvider>

  );
}
export default MyApp
