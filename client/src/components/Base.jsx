import React from 'react';
import {Link, IndexLink} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Base extends React.Component {
  /**
  * Render the component
  **/
  render() {
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <IndexLink to="/">Propriétaire</IndexLink>
          </div>

          <div className="top-bar-right">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>

        </div>

        { /* child component will be rendered here */ }
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>

      </div>
    );
  }
}

export default Base;
