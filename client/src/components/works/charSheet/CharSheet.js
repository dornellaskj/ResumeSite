import React, {Component} from 'react';
import Header from '../../common/Header';
import CharContainer from './CharContainer';

class Works extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <CharContainer />
            </div>
        );
    }
}

export default Works;