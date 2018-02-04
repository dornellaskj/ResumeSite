import React, { Component } from 'react'

export default class SkillRow extends Component {
    changeHandler(e, key) {
        if(typeof this.props.change === 'function'){
            this.props.change(e, key, this.props.index);
        }
    };
    calcTotal() {
        return Math.floor(parseInt(this.props.level)/2) + parseInt(this.props.modifier) + parseInt(this.props.trained) + parseInt(this.props.focus) + parseInt(this.props.misc);
    };
    render(){
        this.state = {};
        this.state.total = this.calcTotal();
        return(
            <div className="row">
                <label className="control-label col-xs-2" htmlFor="name">{this.props.name}: </label>
                <div className="col-xs-2">
                    <input type="text" className="form-control" value={this.state.total} />
                </div>
                <div className="col-xs-2">
                    <input type="text" className="form-control" value={this.props.modifier}/>
                </div>
                <div className="col-xs-2">
                    <input type="text" className="form-control" onChange={e => this.changeHandler(e.target.value, "trained")} value={this.props.trained} />
                </div>
                <div className="col-xs-2">
                    <input type="text" className="form-control" onChange={e => this.changeHandler(e.target.value, "skillFocus")} value={this.props.focus} />
                </div>                
                <div className="col-xs-2">
                    <input type="text" className="form-control" onChange={e => this.changeHandler(e.target.value, "misc")} value={this.props.misc} />
                </div>
            </div>
        )
    }
}