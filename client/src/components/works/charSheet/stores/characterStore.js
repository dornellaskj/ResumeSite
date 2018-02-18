const savedCharacter = require('./character.json');
function CharacterStore() {
	let character;

	function getSelectedChar(key) {
		if(localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key));
		} else {
			return null;
		}
	}

	function getCharacter() {
		let character = getSelectedChar(localStorage.getItem('charSelection'));
		return character;
	}

	return {
		getCharacter: getCharacter
	};
}

module.exports = CharacterStore();