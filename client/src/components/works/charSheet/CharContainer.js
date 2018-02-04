import React, { Component } from 'react'

export default class WorksContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div className="header-container">
                    <h2 className="resume-title">Star Wars D and D Character Sheet</h2>
                </div>
                <div className="resume-container">
                    <h4 className="section-header"></h4>
                </div>
            </div>
        )
    }
}