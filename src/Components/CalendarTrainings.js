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
        this.state = ({trainings: [], events: []})
    };

    componentDidMount() {
    this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(Response => Response.json())
        .then(data => {
            let evts = data.content;
            for (let i = 0; i < evts.length; i++) {
                evts[i].start = moment(evts[i].date).toDate();
                evts[i].end = moment(evts[i].date).toDate();
                evts[i].title = evts[i].activity;
                this.state.trainings.push(evts[i])
            }
            this.setState({
              trainings: evts,
                prevEvents: evts
            })
        })
        .then(() => {
          this.setState({
            events: [...this.state.trainings]
        })  
      }).catch(err => console.error(err));
    }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);

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
          events={this.state.events}
          style={{ height: "50vh" }}
        />
      </div>
    );
  }
}

export default CalendarTrainings;