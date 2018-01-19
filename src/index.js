import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GameOver from './containers/GameOver'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render((<Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/gameover" component={GameOver} />
    </div>

  </Router>), document.getElementById('root'));
