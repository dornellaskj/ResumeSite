import React, { Component } from 'react';
import CharacterSheet from "./components/CharacterSheet";
const characterStore = require("./stores/characterStore");
let _character = characterStore.getCharacter();
import CharacterCreator from "./components/CreateChar";
import CharacterSelector from "./components/CharacterSelector";
import GoogleLogin from "./components/GoogleLogin";

export default class CharContainer extends Component {

	constructor(props) {
		super(props);
		this.getMarkup = this.getMarkup.bind(this);
		this.changeCharacter = this.changeCharacter.bind(this);
		this.reload = this.reload.bind(this);
	}
	changeCharacter(name) {
		localStorage.setItem('charSelection', name);
		_character = characterStore.getCharacter();
		this.setState({});
	}
	reload() {
		_character = characterStore.getCharacter();
		this.setState({});
	}
	getMarkup() {
		if(_character) {
			return <div><CharacterSelector changeCharater={this.changeCharacter}/> <CharacterSheet character={_character} /><GoogleLogin changeCharacter={this.reload}/></div>;
		} else {
			return <div><CharacterCreator /><GoogleLogin changeCharacter={this.reload} noChars={1}/></div>;
		}
	}
	render() {
		let returnMarkup = this.getMarkup();
		return (
			<div className="characterForm">
				{returnMarkup}
			</div>
		);
	}
}