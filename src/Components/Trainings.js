import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button'
import moment from 'moment';
import AddTraining from './AddTraining'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import 'semantic-ui-css/semantic.min.css';


class Trainings extends Component {
    constructor(props){
        super(props);
        this.state = ({message: '', training: []})
    }

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(jsondata => this.setState({training: jsondata}))
        .catch(err => console.error(err))
    }

    deleteTraining = (training) => {
        if (window.confirm("Are you sure you want to delete this training?")){
        fetch('https://customerrest.herokuapp.com/api/trainings/' + training, {method: 'DELETE'})
        .then(res => this.loadTrainings())
        .then(res => this.setState({open: true, message: 'Training deleted'}))
        .catch(e => console.error(e))
        }
    }

    saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => this.loadTrainings())
        .then(res => this.setState({open: true, message: 'Training saved successfully'}))
        .catch(e => console.error(e));
    }

    handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        const columnas = [
            {   id : 'date',
                Header: 'Date',
                accessor: d => {
                    return moment(d.date).format("YYYY-M-D")
                }
            },
            {
                Header: 'Duration',
                accessor: 'duration'
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },
            {
                Header: 'Customer´s name',
                accessor: 'customer.firstname'
            },
            {
                Header: 'Customer´s surname',
                accessor: 'customer.lastname'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'id',
                Cell : ({value}) => (
                 <Button color="secondary" onClick={() => this.deleteTraining(value)}>Delete</Button>   
                )
            }
        ]

        return (
        <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                <i class="heartbeat icon"></i>
                  Trainings list
                </Typography>
              </Toolbar>
            </AppBar>
            <AddTraining saveTraining={this.saveTraining}/>
            <ReactTable 
                filterable = {true}
                data = {this.state.training}
                columns = {columnas}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={4000}
                onClose={this.handleClose}
                message={this.state.message}
            />
        </div>
        );
    }
}

export default Trainings;
