import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            searchtext:''
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render(){
        const {searchtext} = this.state;
        
    return(
        <form className="form-wrapper-2 cf" action="/searchresults">
            <input type="text" name="searchtext" value={searchtext}  placeholder="Event Search..." onChange={this.onChange} required />
            <button type="submit">Search</button>
        </form>
    )};
}