import React, {Component} from 'react';
import {Link} from 'react-router';
import skillData from './skillData.js';
import Skill from './Skill';

class Skills extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.skillData = skillData;
        this.buildSkills = this.buildSkills.bind(this);
    }
    buildSkills() {
        let skillsRendered = [];
        if(this.skillData) {
            this.skillData.map( (skill) => {
                skillsRendered.push(
                    <Skill key={skill.label} label={skill.label} power={skill.power} message={skill.message} message2={skill.message2} />
                );
            });
            return skillsRendered;
        }
    }
    render() {
        return (
            <div className="skills-container">
                <h3>Skills</h3>
                {this.buildSkills()}
            </div>
        );
    }
}

export default Skills;
