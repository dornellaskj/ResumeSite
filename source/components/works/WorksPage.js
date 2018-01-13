import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../common/Header';
import WorksContainer from './WorksContainer';

class Works extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <WorksContainer />
      </div>
    );
  }
}

export default Works;