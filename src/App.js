import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CustomerList from './Components/CustomerList';
import Trainings from './Components/Trainings';
import './App.css';
import './Navigator';
import Navigator from './Navigator';



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/trainings" render={() => <Trainings />} />
              <Route render={() => <h1>Page not found</h1>} />    
            </Switch>
          </div>        
        </BrowserRouter>      
      </div>
    );
  }
}

export default App;
