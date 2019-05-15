import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './Config/Fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';


class Navigator extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
}

logout(){
    fire.auth().signOut();
}
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/"><i class="home icon"></i>Exercise Plan Oy</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Customers</Link>{' '}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/trainings">Trainings</Link>{' '}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/calendar"><i class="calendar alternate outline icon"></i>Calendar</Link>{' '}
                  </li>
                  
              </ul>
              <form class="form-inline my-2 my-lg-0">>
                    <button class="btn btn-light my-2 my-sm-0" onClick={this.logout}><i class="sign out alternate icon"></i>Logout</button>
              </form>
          </div>
            
            
          </nav>     
      </div>
    );
  }
}

export default Navigator;
