import React, { Component } from 'react';

class Head extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			config: props.headJson
		};

		this.buildCSS = this.buildCSS.bind(this);
		this.buildMeta = this.buildMeta.bind(this);
	}

	buildCSS() {
		if (this.state.config.scss && this.state.config.scss.length > 0) {
		}
	}
	buildMeta() {
		let metaArray = [];
		if(this.state.config.meta) {
			this.state.config.meta.forEach((metaIn) => {
				metaArray.push(<meta name={metaIn.name} content={metaIn.content} />)
			});
		}
		return metaArray;
	}

	render() {
		let metaTags = this.buildMeta();
		return (
			<head>
				<title>{this.state.config.title}</title>
				{metaTags}
				<link rel="stylesheet" type="text/css" href="/index.css" />
			</head>
		);
	}
}

export default Head;