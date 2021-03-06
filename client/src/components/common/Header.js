import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Kevin D'Ornellas</h1>
        <nav>
        <input type="checkbox" id="checkbox_toggle"/>
          <div className="nav-container">
            <a href="/">Home</a>
            <a href="/resume/">Resume</a>
            <a href="/works/">Works</a>
          </div>
          <label htmlFor="checkbox_toggle" className="hamburger">
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
          </label>
        </nav>
      </header>
    );
  }
}

export default Header;


