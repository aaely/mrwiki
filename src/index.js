import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker, { unregister } from './serviceWorker';
import './CSS/StyleSheet1.css'

import "gestalt/dist/gestalt.css";

unregister();

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
