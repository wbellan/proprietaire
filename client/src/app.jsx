import React from 'react';
import ReactDom from 'react-dom';
import {browserHistory, Router} from 'react-router';
import routes from './config/routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDom.render((<Router history={browserHistory} routes={routes} />), document.getElementById('react-app'));
