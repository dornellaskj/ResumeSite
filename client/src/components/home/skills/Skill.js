import React, {Component} from 'react';
import {Link} from 'react-router';
const pauseTime = 70;
class Skill extends Component {
    constructor(props, context) {
        super(props, context);
        let powerStyle = {width: `${this.props.power}%`};
        this.containerClass = "";
        this.state = {
            'powerStyle': powerStyle
        };
        this.typeMessage = this.typeMessage.bind(this);
        this.typeChar = this.typeChar.bind(this);
        this.displayMessage = '';
        this.beenClicked = 0;
    }
    

    typeMessage() {
        if(this.beenClicked == 0) {
            this.beenClicked++;
            this.message = this.props.message.split('');
            this.typeChar(0);
        }
    }

    typeChar(index) {
        this.displayMessage = this.displayMessage + this.message[index];
        if(index + 1 <= this.message.length) {
            if(this.message[index + 1] == ' ') {
                this.displayMessage = this.displayMessage + this.message[index + 1];
            }
            setTimeout(() => {
                this.setState({});
                this.typeChar(index + 1);                
            }, pauseTime);
        }
    }

    render() {
        return (
            <div className="skill-container" onClick={this.typeMessage}>
                <label>{this.props.label}</label>
                <div className="meter-container" title={this.props.tooltip} >
                    <div className="meter-bg"></div>
                    <div className="meter-power" style={this.state.powerStyle}>
                        <span>{this.props.tooltip}</span>
                    </div>
                </div>
                <div className="message-container">
                    {this.displayMessage}
                </div>
            </div>
        );
    }
}

export default Skill;