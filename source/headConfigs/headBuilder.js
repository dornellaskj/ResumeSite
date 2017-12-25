import React, {Component} from 'react';

class Head extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            config: props.headJson
        };

        this.buildCSS = this.buildCSS.bind(this);
    }

    buildCSS() {
        if (this.state.config.scss && this.state.config.scss.length > 0) {
            
        }
    }
    
    render() {
        return (
            <head>
                <title>{this.state.config.title}</title>
            </head>
        );
    }
}

export default Head;