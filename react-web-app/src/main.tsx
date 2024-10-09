import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootswatch/dist/minty/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
