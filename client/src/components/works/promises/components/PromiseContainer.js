import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import promises from '../../../../headConfigs/promises';
import pageData from './promiseData';

export default class PromiseContainer extends Component {

	constructor(props) {
		super(props);
		this.state={};
		this.state.code = pageData[0].code;
		this.state.codeRun = this.state.code.replace(/console.log/g, "this.consoleLog");
		this.state.title = pageData[0].title;
		this.state.overview = pageData[0].overview;
		this.state.index = 0;
		this.logs = "";
		this.state.logs = "";
		this.updateCode = this.updateCode.bind(this);
		this.runCode = this.runCode.bind(this);
		this.consoleLog = this.consoleLog.bind(this);
		this.next = this.next.bind(this);
	}

	updateCode(newCode) {
		this.setState({
			code: newCode,
			codeRun: newCode.replace(/console.log/g, "this.consoleLog")
		});
	}

	next() {
		let index = this.state.index + 1;
		this.setState({
			title: pageData[index].title,
			overview: pageData[index].overview,
			index: index
		});
		this.updateCode(pageData[index].code);
	}

	runCode() {
		console.log(this.state.code);
		this.logs = "";
		setTimeout(eval(this.state.codeRun), 100);
	}

	consoleLog(log, log2) {
		this.logs += log;
		if(log2) {
			this.logs += " " + log2; 
		}
		this.logs += "\n";
		this.setState({});
	}

	render() {
		const options = {
			lineNumbers: true,
			mode: 'javascript',
			readOnly: false
		};
		return (
			<div>
				<div className="header-container">
						<h2 className="resume-title">Javascript Promises</h2>
				</div>
				<div className="resume-container">
						<p>Quick Overview:</p>
						<p>{this.state.overview}</p>

						<h3 className="promise-header">{this.state.title}</h3>
						<button className="next-button" onClick={this.next}>next</button>
						<textarea  className="text-area" notranslate onChange={e =>this.updateCode(e.target.value)} value={this.state.code}/>
						<button className="run-button" onClick={this.runCode}>Run It!</button>
						<textarea className="text-area2" value={this.logs}/>
				</div>
			</div>
		);
	}
}