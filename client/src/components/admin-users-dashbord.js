import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AdminUserList from "./adminuserlist";
import axios from 'axios';

export default class AdminUserDashboard extends Component {
    render(){
    return(
        <div className="row">
            <div className="col-md-12 gaps">
                <div className="col-md-12 center gaps">
                    <Link to="/eventsdashboard" className="btn btn-primary">Back to Dashboard</Link>
                </div>
            </div>
           
            <div className="col-md-12 gaps"><AdminUserList /></div>
        </div>
        
    )};
}
