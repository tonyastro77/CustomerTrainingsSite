import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


 
class CalendarTrainings extends Component {
    constructor(props){
        super(props);
        this.state = ({trainings: [], events: [
          {
            start: '',
            end: '',
            title: ''
          }
        ]})
    };

    componentDidMount() {
    this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(jsondata => this.setState({trainings : jsondata.content}))
        .catch(err => console.error(err))
    }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);

    let allViews = Object.keys(this.state.trainings).map(i => this.state.trainings[i]);

    console.log(allViews );  

    return (
      <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    <i class="calendar alternate outline icon"></i>
                    Calendar
                </Typography>
            </Toolbar>
        </AppBar>
        <BigCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={allViews}
          startaccessor= {(event) => {return moment(event.date)}}
          titleaccessor= {(event) => {return event.activity}}
          style={{ height: "50vh" }}
        />
      </div>
    );
  }
}

export default CalendarTrainings;