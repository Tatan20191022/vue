import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './routes/home'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
serviceWorker.unregister();
