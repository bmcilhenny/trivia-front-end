import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GameOver from './components/GameOver';
import StartGame from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(<Router basename={process.env.PUBLIC_URL}>< App /></Router>, document.getElementById('root'));
