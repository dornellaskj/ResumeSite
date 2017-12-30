import React, { Component } from 'react'
import PropTypes from 'prop-types'
import skillData from './skillData.js';
import Skills from './Skills';
export default class SkillsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: skillData
        };
    }

  render() {
    return (
      <Skills skills={this.state.data} />
    )
  }
}
