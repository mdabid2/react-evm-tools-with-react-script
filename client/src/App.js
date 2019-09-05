import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.css';
import Login from './components/login';
import Register from './components/register';
import EventsDashboard from './components/events-dashbord';
import AddModEvent from './components/add-mod-events';
import UserRegistration from './components/user-registration';
import ErrorPage from './components/error-page';
import PrivateRoute from './utils/privateroute';
import SearchResults from './components/search-results';
import AdminDashboard from './components/admin-users-dashbord';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <header className="App-header center">
            <Link to="/eventsdashboard" className="">
              <img className="App-logo" src="/assets/img/sapient-logo.png" />
            </Link>
            
            <h1 className="App-title">Event Management Tools</h1>
          </header>
          <section className="main" role="main">
            <Switch>
              <Route exact path="/" component={Login}  />
              <Route path="/register" component={Register} />
              <Route path="/userregistration" component={UserRegistration} />
              <PrivateRoute
                path="/eventsdashboard"
                component={EventsDashboard}
              />
              <PrivateRoute
                path="/admindashboard"
                component={AdminDashboard}
              />
              <PrivateRoute
                path="/addevent"
                title={"Add New Events"}
                readOnly={false}
                component={AddModEvent}
              />
              <PrivateRoute
                path="/editevent"
                title={"Edit the Events"}
                editEvent={true}
                readOnly={true}
                component={AddModEvent}
              />
              <PrivateRoute
                path="/searchresults"
                component={SearchResults}
              />
              <Route component={ErrorPage} />
            </Switch>
          </section>
          <footer className="App-footer center">
          <p>copyright © 2018</p>
          </footer>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
