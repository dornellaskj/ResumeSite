import React, {Component} from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import Skill from './Skill';

class Skills extends Component {
    // static propTypes = {
    //     skills: PropTypes.shape([]).isRequired,
    // }
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.buildSkills = this.buildSkills.bind(this);
    }

    buildSkills() {
        let skillsRendered = [];
        const {skills} = this.props;
        if(skills) {
            skills.map( (skillRoot, index) => {
                let skillsRenderedInternal = [];
                skillsRendered.push(<div key={skillRoot.title} className="skill-header-container"><h4 key={skillRoot.title} className="skill-header">{skillRoot.title}</h4></div>);
                skillRoot.skills.map( (skill) => {
                    skillsRenderedInternal.push(
                        <Skill key={skill.label} label={skill.label} power={skill.power} message={skill.message} message2={skill.message2} />
                    );
                });
                skillsRendered.push(<div key={index} className="skill-group">{skillsRenderedInternal}</div>);
            });
        }
        return skillsRendered;
    }
    render() {
        return (
            <div className="skills-container">
                <h4 className="skill-instructions-header">(Click on a skill to learn more.)</h4>
                {this.buildSkills()}
            </div>
        );
    }
}

export default Skills;
