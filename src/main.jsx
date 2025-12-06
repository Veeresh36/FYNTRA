import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/index.css'
import Addtocart from './components/addtocart.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <Addtocart>
        <App/>
    </Addtocart>
)
