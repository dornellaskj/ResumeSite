import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Kevin D'Ornellas</h1>
        <nav >
          <a href="/">Home</a>
          <a href="/resume/">Resume</a>
          <a href="/works/">Works</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
    );
  }
}

export default Header;


