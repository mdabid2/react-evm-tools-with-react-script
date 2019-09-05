import React, { Component } from 'react';
import axios from 'axios';
export default class Thankyou extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:''
        }
        
    }

    componentDidMount(){
        console.log(this.props.events);
        axios.post(`/api/registration/mailer`,{
            name: this.props.name,
            email:this.props.email,
            events:this.props.events
        })
        .then(res => { 
            console.log(res)
        });
    };
    render(){
        return(
            <div className="col-md-8 center thankyou">
                <h3 >Thankyou For Registration</h3>
                <h5>Miss/Ms./Mrs.: {this.props.name}</h5>
                <p>An email has been sent to your email box for event details.</p>
            </div>
            
        )};
}