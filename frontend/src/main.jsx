import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import ContextApi from './hooks/ContextApi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextApi>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextApi>
)
