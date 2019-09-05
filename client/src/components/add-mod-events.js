import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddEvent extends Component {

    constructor(props){
        super(props);
        this.state={
            eventname:'',
            venue:'',
            eventdetails:'',
            eventdate:'',
            totalseat:''
        }
        this.editEvent=this.props.editEvent;
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    componentDidMount() {
        const eventID=(this.props.history.location.pathname).split('/');
        if(this.editEvent) {
            axios.get(`/api/editevent/${eventID[2]}`)
            .then(myEvents => { 
                this.setState(
                    {...myEvents.data}
                );
            });
        }
    };
    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ userError:'' });
        
        const {eventname, venue, eventdetails, eventdate,totalseat } = this.state;
        
        if(!this.editEvent) {
            axios.post('/api/addevent', {eventname, venue, eventdetails, eventdate, totalseat })
            .then((result) => {
                if(result.data.success){  
                    this.props.history.push("/eventsdashboard");
                } else {
                    this.setState({ userError:result.data.message });
                }
            })
            .catch(error => {
                console.log(error.response)
            });  
        } else {
            const eventID=(this.props.history.location.pathname).split('/');
            axios.put(`/api/editevent/${eventID[2]}`, {venue, eventdetails})
            .then((result) => {
                if(result.data.success){  
                    this.props.history.push("/eventsdashboard");
                } else {
                    this.setState({ userError:result.data.message });
                }
            })
            .catch(error => {
                console.log(error.response)
            });  
        }
        
    };
    render(){
    const {eventname, venue, eventdetails, eventdate, totalseat } = this.state;
    
    return(
        
        <div className="row">

            <div className="addEvent col-md-4">
            <h3>{this.props.title}</h3>
            <p className="text-danger">{this.state.userError}</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input type="text" className="form-control" id="eventName" placeholder="Event Name" name="eventname" value={eventname} onChange={this.onChange} required readOnly={this.props.readOnly}/>
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <input type="text" className="form-control" id="venue" placeholder="venue" name="venue" value={venue} onChange={this.onChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="eventDetails">Event Details</label>
                    <textarea className="form-control" rows="3" id="eventDetails" placeholder="Event Details" name="eventdetails" value={eventdetails} onChange={this.onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="totalseat">Total Seats</label>
                    <input type="text" className="form-control" id="totalseat" placeholder="Total Seats" name="totalseat" value={totalseat} onChange={this.onChange} required readOnly={this.props.readOnly}/>
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input type="date" className="form-control" id="eventDate" placeholder="Event Date" name="eventdate" value={eventdate} onChange={this.onChange} required readOnly={this.props.readOnly}/>
                </div>
                
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/eventsdashboard" className="btn btn-primary">Cancel</Link>
                </div>
            </form>
            </div>
        </div>
    )};
}

export default AddEvent;