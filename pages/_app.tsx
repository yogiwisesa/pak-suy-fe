import '../styles/globals.scss';

import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { SWRConfig } from 'swr';

import axios from '../lib/axios';
import theme from '../styles/chakra-theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type props = any;

const App: React.FC<props> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (url) => axios.get(url).then((res) => res.data)
      }}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
