import { Provider } from 'react-redux';
import RouterGuard from '../components/RouterGuard';
import { store } from '../store';
import '../styles/globals.scss';
import Header from './../components/layout/header';

function MyApp({ Component, pageProps }) {
  return (
    <>
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
