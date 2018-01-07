import React, {Component} from 'react';
import Header from '../common/Header';

class ResumePage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
        <div className="container">
            <Header />
            <div className="header-container">
                <h2 className="resume-title">Resume</h2>
            </div>
            <div className="resume-container">
                
                <h4 className="section-header">Overview</h4>
                <p>
                    I am a Senior Developer with over 14 years of experience in Technology. I started out as a Network Administrator in the Marine Corps.
                    I am an accomplished Network and Server Engineer; I am also a full stack developer; for the last two years, I have been working with a 
                    fortune 500 company that has entrusted me with their SEO health as well as continued development of their product. I am also experienced in unit testing, 
                    functional testing, and RESTful services. I am constantly expanding my knowledge; I pride myself on my versatility, and not just knowing how to solve a 
                    problem but also understanding why we need to solve it.
                </p>
                <h4 className="section-header">Key Career Experience</h4>
                <ul>
                    <li>Development and maintenance of web applications for large companies in the Automotive industry.</li>
                        <ul>
                            <li>Development work involved enhancements to existing elements or creation of new functionality.</li>
                            <li>Development efforts included use of SEO, AngularJS, Node JS, Java, and Dev Ops.</li>
                        </ul>
                    <li>AWS – Consultant has built full server setups including database, storage, load balancing, and SSL certificates, as well as facilitating a complete site relocation from Azure to AWS.</li>
                    <li>.NET – Consultant provided .NET development primarily for companies in the manufacturing and News space from 2014-2016 including building automated electronic payment systems.</li>
                    <li>Prior to 2014 consultant worked as a web developer for 4 years on stock market related sites.</li>
                </ul>
                <h4 className="section-header">Professional Experience</h4>
                <ul>
                    <li>RSI – Senior Consultant, Senior Programmer Analyst</li>
                    <li>Wall Colmony Corporation– IT/Developer</li>
                    <li>NewsCastic – Software Developer</li>
                    <li>Fusion Trading – Software Developer</li>
                    <li>United States Marine Corps – Network Administrator</li>
                </ul>
                <h4 className="section-header">Education</h4>
                <ul>
                    <li>NMSU – BS Information Communication Technology</li>
                    <li>CNM – AAS Computer Programming</li>
                </ul>
                <h4 className="section-header">Certifications </h4>
                <ul>
                    <li>A + Certification</li>
                </ul>
            </div>
        </div>
        );
    }
}

export default ResumePage;