import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import fire from './Config/Fire';
import CustomerList from './Components/CustomerList';
import Trainings from './Components/Trainings';
import Navigator from './Navigator';
import CalendarTrainings from './Components/CalendarTrainings';
import './App.css';
import './Navigator';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
}

logout(){
    fire.auth().signOut();
}

 render(){
  return(
    <div className="App">
      
      <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/trainings" render={() => <Trainings />} />
              <Route path="/calendar" render={() => <CalendarTrainings />} />
              <Route render={() => <h1>Page not found</h1>} />    
              <button onClick={this.logout}>Logout</button>
            </Switch>
          </div>        
        </BrowserRouter>   
    </div>
    
  );
 }
}
export default Home;