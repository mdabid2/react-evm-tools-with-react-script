import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AdminUsers extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            users:[]
        }
    };
    approvedUser = (index) => {
        confirmAlert({
            title: 'Approve the Users',
            message: 'Are you sure want to Apporve the user: \n\n'+this.state.users[index].username,
            buttons: [
                {
                    label: 'YES',
                    onClick: () => {
                        const id = this.state.users[index]._id;
                        const apporved=true;
                        axios.put(`/api/adminusers/${id}`,{apporved})
                        .then(datalist => { 
                            if(datalist.data.success){
                                axios.get(`/api/adminusers/`)
                                .then(userList => { 
                                    this.setState(
                                        {users:userList.data}
                                    )
                                });
                            }
                        });
                    }
                },
                {
                    label: 'NO',
                    onClick: () => {
                        return false;
                    }
                }
            ]
          })
    }
    componentDidMount() {  
        axios.get(`/api/adminusers/`)
        .then(userList => { 
            this.setState(
                {users:userList.data}
            )
        });
    };    
    render(){
        const { users } = this.state;
        const mapHtml=users.map((user,index) => { 
            return(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                    {
                        user.apporved
                        ? "YES"
                        :<button className="eyeopen" title="Approved" onClick={() => this.approvedUser(index)} />
                    }
                    </td>
                </tr>
            )
        });
        return(
            <div className="events">
                <h2 className="">Admin Users:</h2>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Approved</th>
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