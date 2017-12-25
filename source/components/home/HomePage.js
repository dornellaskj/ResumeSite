import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../common/Header';
import Skills from './Skills';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Skills />
      </div>
    );
  }
}

export default HomePage;
