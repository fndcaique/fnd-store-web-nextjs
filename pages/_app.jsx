import { Provider } from 'react-redux'
import RouterGuard from '../components/RouterGuard'
import { store } from '../store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={ store }>
      <RouterGuard>
        <Component { ...pageProps } />
      </RouterGuard>
    </Provider>
  )
}

export default MyApp
