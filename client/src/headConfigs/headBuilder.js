import React, { Component } from 'react';

class Head extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			config: props.headJson
		};

		this.buildLinks = this.buildLinks.bind(this);
		this.buildMeta = this.buildMeta.bind(this);
	}

	buildLinks() {
		let linkArray = [];
		if (this.state.config.scss && this.state.config.scss.length > 0) {
			this.state.config.scss.forEach( linkIn => {
				if (linkIn.type) {
					linkArray.push(<link rel={linkIn.rel} type={linkIn.type} href={linkIn.href} />);
				} else {
					linkArray.push(<link rel={linkIn.rel} href={linkIn.href} />);
				}
				
			});
		}
		return linkArray;
	}
	buildMeta() {
		let metaArray = [];
		if(this.state.config.meta) {
			this.state.config.meta.forEach((metaIn) => {
				if(metaIn.name) {
					metaArray.push(<meta name={metaIn.name} content={metaIn.content} />)
				} else {
					metaArray.push(<meta name={metaIn.property} content={metaIn.content} />)
				}
			});
		}
		return metaArray;
	}

	render() {
		let metaTags = this.buildMeta();
		let links = this.buildLinks();
		return (
			<head>
				<title>{this.state.config.title}</title>
				{metaTags}
				{links}				
			</head>
		);
	}
}

export default Head;