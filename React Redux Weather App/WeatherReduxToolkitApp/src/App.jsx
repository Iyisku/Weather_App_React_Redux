import './index.css'
import Weather from './Component/weather'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'

function App() {
  return (
    <>
    <Provider store={store}>
    <Weather/>
    </Provider>
    <h1>hello</h1>
     
    </>
  )
}

export default App
