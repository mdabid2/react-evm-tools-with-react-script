import React, { Component } from 'react';
import SearchEvents from "./search-events";
import {Link} from 'react-router-dom';
import UserList from "./userlist";
import axios from 'axios';

export default class SearchResults extends Component {

    mapHtml="";
    errorText="";
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        const searchtext=this.props.history.location.search;
        
        axios.post(`/api/searchresults${searchtext}`)
        .then(eventList => { 
            this.setState(
                {
                    data: eventList.data,
                }                
            )
        });
        
    };
    render(){
        
        const { data } = this.state;

        if(data.length) {
            this.errorText = "";
            this.mapHtml=data.map((element) => {
                return(
                    <li className="col-md-3" key={element._id}>
                        <h2>{element.eventname}</h2>
                        <div className="dis">{element.eventdetails}</div>
                        <p>{(element.eventdate).toString()} : {element.venue}</p>
                    </li>
                )
            });
        } else {
            this.errorText = "Sorry No Events Found";
        }
    return(
        <div className="row">
            <div className="col-md-8 gaps">
                <h1> Events: </h1>
                <SearchEvents />
            </div>
            <div className="col-md-4 gaps">
            <Link to="/eventsdashboard" className="logOut btn btn-primary">
                Back to Dashboard
            </Link>
            </div>
            <div className="col-md-12 gaps">
                <h2 className="bg-warning center">{this.errorText}</h2>
                <ul className="searchEventList">
                    {this.mapHtml}
                </ul>
            </div>
            <div className="col-md-12 gaps">
                <h2 className="">Register Users:</h2>
                { data && data.length ? <UserList data={data}/> : null }
            </div>
        </div>  
       
    )};
}
