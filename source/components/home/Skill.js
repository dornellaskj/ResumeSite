import React, {Component} from 'react';
import {Link} from 'react-router';

class Skill extends Component {
    constructor(props, context) {
        super(props, context);
        let powerStyle = {width: `${this.props.power}%`};
        this.state = {
            'powerStyle': powerStyle
        };
    }
    render() {
        return (
            <div className="skill-container">
                <label>{this.props.label}</label>
                <div className="meter-container">
                    <div className="meter-bg"></div>
                    <div className="meter-power" style={this.state.powerStyle}></div>
                </div>
            </div>
        );
    }
}

export default Skill;