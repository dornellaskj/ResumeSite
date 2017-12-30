import React, {Component} from 'react';
import {Link} from 'react-router';
import Typing from 'react-typing-animation'

class Skill extends Component {
    constructor(props, context) {
        super(props, context);
        let powerStyle = {width: `${this.props.power}%`};
        this.containerClass = "";
        this.state = {
            'powerStyle': powerStyle
        };
        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage() {
        this.AnimatedTypingComponent =
            <Typing>
                <span>{this.props.message}</span>
                <span> {this.props.message2}</span>
            </Typing>;
        this.setState({});
    }

    render() {
        return (
            <div className="skill-container" onClick={this.displayMessage}>
                <label>{this.props.label}</label>
                <div className="meter-container" >
                    <div className="meter-bg"></div>
                    <div className="meter-power" style={this.state.powerStyle}></div>
                </div>
                <div className="message-container">
                    {this.AnimatedTypingComponent}
                </div>
            </div>
        );
    }
}

export default Skill;