import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../common/Header';
import SkillsContainer from './skills/SkillsContainer';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <SkillsContainer />
      </div>
    );
  }
}

export default HomePage;
