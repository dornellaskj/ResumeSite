import React, {Component} from 'react';
import {Link} from 'react-router';
import skillData from './skills.json';
import Skill from './Skill';

class Skills extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        this.buildSkills = this.buildSkills.bind(this);
    }
    buildSkills() {
        let skillsRendered = [];
        skillData.map( (skill) => {
            skillsRendered.push(
                <Skill label={skill.label} power={skill.power} message={skill.message} />
            );
        });
        return skillsRendered;
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
