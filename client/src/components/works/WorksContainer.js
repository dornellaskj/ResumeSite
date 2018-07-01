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
                    <h2 className="resume-title">Projects</h2>
                </div>
                <div className="resume-container">
                    <a href="/charSheet/">
                        <h4 className="section-header">Star Wars D and D Character Sheet</h4>
                    </a>
                    <a href="/promises/">
                        <h4 className="section-header">Learn Javascript Promises</h4>
                    </a>
                    <a href="https://prezi.com/e8dgwxugqbpg/seo/" target="_blank">
                        <h4 className="section-header">SEO Presentation</h4>
                    </a>
                </div>
            </div>
        )
    }
}