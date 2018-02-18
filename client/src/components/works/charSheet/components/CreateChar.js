import React, { Component } from 'react';
let swDefaultChar = require('../stores/character.json');

export default class CreateChar extends Component {
	constructor(props) {
		super(props);
		this.createCharacter = this.createCharacter.bind(this);
		this.setCharCreateType = this.setCharCreateType.bind(this);
		this.setCharacterCreateName = this.setCharacterCreateName.bind(this);
		this.characterCreateType = "sagaChar";
	}
	
	setCharCreateType(chartype) {
		this.characterCreateType = chartype;
	}

	setCharacterCreateName(name) {
		this.characterCreateName = name;
	}

	createCharacter(type, name) {
		if (!localStorage.getItem(name)) {
			switch (type) {
			case "sagaChar":
				let charData = swDefaultChar;
				charData.header.name = name;
				localStorage.setItem(name, JSON.stringify(charData));
				localStorage.setItem('charSelection', name);
				window.location.href = './';
				break;
			}
		} else {
			alert('Please use a name that you have not already used.');
		}
	}


	render() {
		return (
			<div id="create-char-area">
				<div className="row row-margin">
					<div className="col-md-12">
						<label className="headline-label condition" htmlFor="name">Create A Character</label>
					</div>
				</div>
				<div className="row row-margin">
					<div className="col-md-2">
						<label className="control-label" htmlFor="name"> Character Type:</label>
					</div>
					<div className="col-md-2">
						<select id="character-type-selection" className="control-label" onChange={e => this.setCharCreateType(e.target.value)}>
							<option value="sagaChar" selected>Saga Character</option>
							<option value="sagaVehicle">Saga Vehicle</option>
							<option value="dunChar">Dungeon Character</option>
						</select>
					</div>
					<div className="col-md-2">
						<label className="control-label" htmlFor="name"> Character Name:</label>
					</div>
					<div className="col-md-3">
						<input type="text" className="character-name-creation form-control" onChange={e => this.setCharacterCreateName(e.target.value)}/>
					</div>
					<div className="col-md-2">
						<button className="addButton" onClick={e => this.createCharacter(this.characterCreateType, this.characterCreateName)}>Create Character</button>
					</div>
				</div>
			</div>
		);
	}
}