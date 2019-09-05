import React, { Component } from 'react';
import axios from 'axios';

export default class UserList extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            data:this.props.data
        }
    };
    componentDidMount() {
        const eventidObj=this.state.data.map((element)=>{
            return element._id
        }); 
        axios.get(`/api/searchresults/${eventidObj}`)
        .then(eventList => { 
            this.setState(
                {...eventList}
            )
        });
    };    
    render(){
        const { data } = this.state;
        const mapHtml=data.map((element) => { 
            return(
                <tr key={element._id}>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.number}</td>
                </tr>
            )
        });
        return(
            <div className="events">
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody> 
                    {mapHtml}
                </tbody> 
                </table>
            </div>
          
        );
    }
}