import React, { Component } from 'react';
import CharacterSheet from "./components/CharacterSheet";
var characterStore = require("./stores/characterStore");
var _character = characterStore.getCharacter();

export default class CharContainer extends Component {
    
    constructor(props) {
        super(props);
        console.log('charsheet');
    }

    render() {
        return (
            <CharacterSheet  character={_character} />
        )
    }
}