import React, { Component } from 'react';
import ThankYouPage from './thank-you-page';
import axios from 'axios';

export default class RegisterInEvents extends Component {
  
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            number:'',
            eventid:'',
            eventname:'',
            venue:'',
            eventdetails:'',
            availableseat:'',
            eventdate:'',
            userError:'',
            thankyouPage:false
        }
    }
    componentDidMount() {
        const eventId=(this.props.history.location.pathname).split('/');
        axios.get(`/api/userregistration/getevents${eventId[2]}`)
        .then(myEvents => { 
            this.setState(
                {...myEvents.data}
            );
            this.setState(
                {eventid:eventId[2]}
            );
        });
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ userError:'' });
        const {name,email, number, eventid,availableseat } = this.state;
        if(availableseat){
        axios.post('/api/userregistration/users', {name, email, number, eventid })
            .then((result) => {
                if(!result.data.success){
                    this.setState({
                        userError:result.data.message
                    });
                } else {
                    this.setState({
                        thankyouPage:true,
                        availableseat:(availableseat-1)
                     });
                     const eventId=(this.props.history.location.pathname).split('/');
                     const availableseatres=this.state.availableseat;
                     axios.put(`/api/udateavailableseat/${eventId[2]}`, {availableseatres})
                         .then((result) => {
                             if(!result.data.success){  
                                 this.setState({ userError:result.data.message });
                             }
                         })
                         .catch(error => {
                             console.log(error.response)
                         });    
                }      
            })
            .catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                userError:"Sorry! Seat Has Been Full"
            });
        }
    };
    render(){
        const {name, email, number, thankyouPage } = this.state;
        const { eventname, venue, eventdetails, eventdate, availableseat} = this.state;

       
    return(
        <div className="userRegistration">
            <div className="row">
                <div className="gaps center margin-auto col-md-8">
                    <h2>Event: {eventname}</h2>
                    <p><strong>Event Date & Location: {eventdate} & {venue}</strong></p>
                    <p>Event Description: {eventdetails}</p>
                    <span className="availableseat">Available Seats: {availableseat}</span>

                    <hr />
                </div>
            </div>
            <div className="row">
            { !thankyouPage && availableseat ? 

            <div className="registerFrom col-md-4">  
                <p className="text-danger">{this.state.userError}</p>
                <h3>Please Register In Events</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="Name">Name</label>
                        <input type="text" className="form-control" id="Name" placeholder="Name" name="name" value={name}  placeholder="name" onChange={this.onChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" name="email" value={email}  placeholder="Email" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" placeholder="Contact Number" name="number" value={number} maxLength={10} placeholder="number" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div> 
            </form>
            </div>
            : null }
            { thankyouPage && name  ? <ThankYouPage name={name} email={email} events={[eventname, venue, eventdetails, eventdate]}/> : null }
            </div>
        </div>
    )};
};
