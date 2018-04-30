import React, { Component } from 'react';

export default class CharacterSelector extends Component {
	constructor(props) {
		super(props);
		this.characters = [];
		this.renderOptions = this.renderOptions.bind(this);
		this.getCharatorsArray = this.getCharatorsArray.bind(this);
		this.changeCharacter = this.props.changeCharater;
		this.getCharatorsArray();
	}
	getCharatorsArray() {
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			try {
				const item = JSON.parse(localStorage.getItem(key));
				if(item.header && item.header.name && item.header.name.length) {
					this.characters.push(item.header.name);
				}
			} catch(e) {
				let error = e;
			}
		}
	}

	renderOptions(chars) {
		let options = [];
		this.characters.forEach (char => {
			if (char == localStorage.getItem('charSelection')) {
				options.push(
					<option value={char} selected>{char}</option>
				);
			} else {
				options.push(
					<option value={char} >{char}</option>
				);
			}
		});
		return options;
	}

	render() {
		let optionsRendered = this.renderOptions(this.characters);
		return (
			<div className="selector-container">
				<label className="seletor-label">Select your character: </label>
				<select id="character-selector" className="form-control" onChange={e => this.changeCharacter(e.target.value)}>
					{optionsRendered}
				</select>
			</div>
		);
	}
}