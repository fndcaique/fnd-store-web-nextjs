import { Provider } from 'react-redux';
import RouterGuard from '../components/RouterGuard';
import { store } from '../store';
import GlobalStyle from '../styles/global-style';
import Header from './../components/layout/header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <RouterGuard>
          <Header />
          <Component {...pageProps} />
        </RouterGuard>
      </Provider>
    </>
  );
}

export default MyApp;
