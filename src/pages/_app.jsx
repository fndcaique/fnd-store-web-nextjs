import { Provider } from 'react-redux';
import RouterGuard from '../components/RouterGuard';
import Layout from '../components/layout/layout';
import { store } from '../store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <RouterGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouterGuard>
      </Provider>
    </>
  );
}

export default MyApp;
