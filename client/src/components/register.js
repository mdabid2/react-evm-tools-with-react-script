import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          username: '',
          email: '',
          password:'',
          superadmin:'',
          userError:''
        };
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ userError:'' });
        const { name, username, email, password, superadmin } = this.state;
        axios.post('/api/register', { name, username, email, password, superadmin })
        .then((result) => {
            if(result.data.success){
                this.props.history.push("/");
            } else {
                this.setState({ userError:result.data.message });
            }
        })
        .catch(error => {
            console.log(error.response)
        });
       
    };
    render() {
        const { name, username, email, password,superadmin } = this.state;
    return(
        <div className="row">

            <div className="registerFrom col-md-4">
            <h3>Register your account</h3>
            <p className="text-danger">{this.state.userError}</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input type="text" className="form-control" id="Name" name="name" value={name} placeholder="Name" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" className="form-control" id="userName" name="username" value={username} placeholder="User Name" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={email} placeholder="Email" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} placeholder="Password" onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="superAdmin">Super Admin Key</label>
                    <input type="password" className="form-control" id="superAdmin" name="superadmin" value={superadmin} placeholder="Add Key..." onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-primary">Cancel</Link>
                </div>
                
            </form>
            </div>
        </div>
    )};
}

export default Register;