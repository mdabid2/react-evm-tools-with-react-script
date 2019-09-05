import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Events from './events';
import auth from'../utils/auth';
import SearchEvents from "./search-events";

export default class EventsDashboard extends Component {
    
    removeSession = () => {    
        auth.setSession('isAuthenticated',false);
        this.props.history.push("/");
    }
    render(){
    return(
        <div className="row">
            <div className="col-md-8 gaps">
                <SearchEvents />
            </div>
            <div className="col-md-4 gaps">
                
                <button className="logOut btn btn-primary" onClick={this.removeSession}>Log Out</button>
            </div>
            <div className="col-md-12  gaps">
                <Link to="/admindashboard" className="btn logOut btn-primary">Admin Dashboard</Link>
                <Link to="/addevent" className="btn btn-primary">Add New Events</Link>
            </div>
            <div className="col-md-12 gaps"><Events/></div>
        </div>
        
    )};
}
