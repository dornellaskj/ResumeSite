import React, {Component} from 'react';
import Header from '../../common/Header';
import PromiseContainer from './components/PromiseContainer';

class Promises extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <PromiseContainer />
            </div>
        );
    }
}

export default Promises;