import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import auth from'../utils/auth';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props);
        auth.setSession('isAuthenticated',true); //Buy Pass to loging
        this.state={
            email:'',
            password:'',
            userError:''
        }
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ userError:'' });
        const {email, password } = this.state;

        axios.post('/api/login', {email, password })
        .then((result) => {

            if(result.data.success){
                auth.setSession('isAuthenticated',true);  
                this.props.history.push("/eventsdashboard");
                
            } else {
                this.setState({ userError:result.data.message });
            }
        })
        .catch(error => {
            console.log(error.response)
        });  
    };
    render(){
        const {email, password } = this.state;
        
    return(
        <div className="row">

            <div className="loginFrom col-md-4">
            <h3>Login to your account</h3>
            <p className="text-danger">{this.state.userError}</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={email}  placeholder="Email" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} placeholder="Password" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <hr />
                {auth.getSession('isAuthenticated')
                ?<div className="form-group">
                    <h6>You are already logged in</h6>
                    <Link to="/eventsdashboard" className="btn btn-primary">View Event Dashboard</Link>
                </div>
                :<div className="form-group">
                    <h6>Not Registered yet, Register Now</h6>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </div>
                }
                
                
            </form>
            </div>
        </div>   
    )};
}
