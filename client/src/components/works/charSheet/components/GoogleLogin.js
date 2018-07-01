let React = require("react");
let Component = React.Component;
let GoogleComponent = require("react-google-login-component");
let GoogleLogin = GoogleComponent.GoogleLogin;
let idToken;

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			idToken
		};
		this.responseGoogle = this.responseGoogle.bind(this);
		this.saveDataLocalStorage = this.saveDataLocalStorage.bind(this);
		
	}

	responseGoogle(googleUser) {
		idToken = googleUser.getAuthResponse().id_token;
		this.setState({
			idToken: idToken
		});
	}

	saveData() {
		let stringifiedChars = this.getDataLocalStorage();
		fetch('https://www.academicstudysolutions.com/Services/GoogleAuth.php/', {
			"async": true,
			"crossDomain": true,
			"method": "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"accessToken": idToken
			},
			body: stringifiedChars
		}).then((response) => {
			if (response.ok) {
				return response.text();
			}
		})
			.then((returnData) => {
				if (returnData.trim() == 'not a valid access token.') {
					idToken = undefined;
					this.setState({
						idToken: idToken
					});
					alert('your login has expired plese login again.');
				} else if (returnData.trim() == 'false') {
					alert('I\'m sorry there was an error your data was not saved to the server.');
				} else if (returnData.trim() == '1') {
					alert('Your characters have been saved successfully.');
				} else {
					alert(returnData.trim() + 'Something went wrong please check your internet connection.');
				}
			}).catch(e =>{
				alert(e);
			});
	}

	getData() {
		fetch('https://www.academicstudysolutions.com/Services/GoogleAuth.php/', {
			"async": true,
			method: 'GET',
			"crossDomain": true,
			headers: {
				'Accept': 'text',
				'Content-Type': 'text',
				"accessToken": idToken
			}
		}).then((response) => {
			if (response.ok) {
				return response.text();
			}
		}).then((returnData) => {
			returnData = this.decodeHtmlEntity(returnData.trim());
			let newString = returnData;
			try {
				let parsedData = JSON.parse(newString);
				this.saveDataLocalStorage(parsedData);
			} catch (e) {
				alert('sorry we had an issue retrieving your data.');
			}
		}).catch(e =>{
			alert(e);
		});
	}

	decodeHtmlEntity(str) {
		let newString = str.replace(/&#(\d+);/g, function (match, dec) {
			return '"';
		});
		return newString.split(';123567;**').join("'");
	}

	saveDataLocalStorage(data) {
		localStorage.setItem('charSelection', data.charSelection.charSelection);
		for (let i = 0; i < data.keys.length; i++) {
			localStorage.setItem(data.keys[i], JSON.stringify(data.characters[i]));
		}
		this.props.changeCharacter();
		alert('Data retrived');
	}

	getDataLocalStorage() {
		let fullObject;
		let characters = [],
			charSelection = "",
			keys = Object.keys(localStorage);
		let storedKeys = [];

		if (keys.length) {
			for (let i = 0; i < keys.length; i++) {
				if (keys[i] != 'charSelection') {
					try {
						characters.push(JSON.parse(localStorage.getItem(keys[i])));
						storedKeys.push(keys[i]);
					} catch(e) {
						this.error = e;
					}
				} else {
					charSelection = { "charSelection": localStorage.getItem(keys[i]) };
				}

			}
		}
		fullObject = { "characters": characters, "keys": storedKeys, charSelection };
		return JSON.stringify(fullObject).split("'").join(';123567;**');
	}

	render() {
		return (
			<div className="button-container">
				{idToken && <div className="save-button-container"><button className="addButton" onClick={e => this.getData()}>GET CHAR DATA</button>  {!this.props.noChars && <button className="addButton" onClick={e => this.saveData()}>SAVE CHAR DATA</button>}</div>}
				<div className="google-button">
					{!idToken && <GoogleLogin socialId="485516213096-tf621g1e32bht5h271d3ej3h42rc73b6.apps.googleusercontent.com"
						className="google-login"
						scope="profile"
						fetchBasicProfile={false}
						responseHandler={this.responseGoogle}
						buttonText="" />}
				</div>
			</div>
		);
	}
}

module.exports = App;