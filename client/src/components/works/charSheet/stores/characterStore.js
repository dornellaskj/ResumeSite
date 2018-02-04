var savedCharacter = require('./character.json');
function CharacterStore() {
    var character;
    if(localStorage.getItem("sagaChar")){
        character = JSON.parse(localStorage.getItem("sagaChar"));
    } else {
        localStorage.setItem("sagaChar", JSON.stringify(savedCharacter));
        character = savedCharacter;
    }
    

    function getCharacter() {
        return character;
    }

    return {
        getCharacter: getCharacter
    }
}

module.exports = CharacterStore();