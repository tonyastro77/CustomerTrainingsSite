import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''}
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

      addCustomer = () => {
          const newCustomer = {
              firstname: this.state.firstname ,
              lastname: this.state.lastname ,
              streetaddress: this.state.streetaddress ,
              postcode: this.state.postcode ,
              city: this.state.city ,
              email: this.state.email ,
              phone: this.state.phone 
          }
          this.props.saveCustomer(newCustomer);
          this.handleClose();
      }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insert here all the details of the new customer. Click on 'Save' in order to save the new information or 'Cancel' if you change your mind.
            </DialogContentText>
            <TextField onChange={this.inputChanged} autoFocus margin="dense" name="firstname" label="First Name" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="lastname" label="Last Name" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="streetaddress" label="Street Address" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="postcode" label="Post Code" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="city" label="City" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="email" label="Email" fullWidth />
            <TextField onChange={this.inputChanged} margin="dense" name="phone" label="Phone" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={this.handleClickOpen} color="primary">Add Customer</Button>
      </div>
    );
  }
}

export default AddCustomer;