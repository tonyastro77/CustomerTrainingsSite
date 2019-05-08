import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});


class AddTraining extends Component {
  constructor(props) {
      super(props);
      this.state = {open: false, customerList: [], date: '', duration: '', activity: '', selectedOption: 'https://customerrest.herokuapp.com/api/customers/4'}
  }

  handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    inputChanged = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleChange = name => event => {
      this.setState({ [name]: Number(event.target.value) });
    };

    handleChanged = (event) => {
      const selectedOption = event.target.value
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }
    
    componentDidMount() {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(jsondata => this.setState({customerList: jsondata.content}))
      .catch(err => console.error(err))
  }

    addTraining = () => {
        const newTraining = {
            date: this.state.date ,
            duration: this.state.duration ,
            activity: this.state.activity ,
            customer: this.state.selectedOption

        }
        this.props.saveTraining(newTraining);
        this.handleClose();
    }

render() {
  const {classes} = this.props;
  console.log(this.state.customerList );
  
  const {selectedOption} = this.state;
  var customerRetrieval = () => this.state.customerList.map((c,i) => 
    (<option key={i} value={c.links[1].href}>{c.lastname + ', ' + c.firstname}</option>)
    )
  return (
    <div>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
              <DialogContentText>
                Choose the details of the training. Click on 'Save' in order to save the new training or 'Cancel' otherwise.
              </DialogContentText>
              <FormControl className={classes.formControl}>
                <TextField onChange={this.inputChanged} type="date" margin="dense" name="date" label="Date" defaultValue="2019-05-08" fullWidth />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="duration-simple">Duration</InputLabel>
                <Select value={this.state.duration} onChange={this.handleChange('duration')} input={<Input id="duration-simple"/>}>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                  <option value={35}>35</option>
                  <option value={40}>40</option>
                  <option value={45}>45</option>
                  <option value={50}>50</option>
                  <option value={60}>60</option>
                  <option value={70}>70</option>
                  <option value={80}>80</option>
                  <option value={90}>90</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="activity-simple">Activity</InputLabel>
                <Select value={this.state.activity} onChange={this.inputChanged} name="activity" input={<Input id="activity-simple"/>}>
                  <option value={"Fitness"}>Fitness</option>
                  <option value={"Gym training"}>Gym training</option>                   
                  <option value={"Jogging"}>Jogging</option>
                  <option value={"Spinning"}>Spinning</option>
                  <option value={"Zumba"}>Zumba</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="customer-native-simple">Customer</InputLabel>
                  <Select value={this.state.selectedOption} onChange={this.handleChanged} name='customer' input={<Input id="customer-native-simple"/>}>
                   {customerRetrieval()}
                  </Select>
              </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={this.handleClickOpen} color="primary">Add Training</Button>
    </div>
  );
}
}


export default withStyles(styles)(AddTraining);