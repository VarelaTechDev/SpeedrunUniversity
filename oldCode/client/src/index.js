// > public/index.html is our mini HTML page that contains div id ='root'
// ? We call it from here and call App that we import from './App'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'


ReactDOM.render(<App/>, document.getElementById('root'))
