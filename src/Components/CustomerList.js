import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button'
import AddCustomer from './AddCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'semantic-ui-css/semantic.min.css';


class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = ({message: '', customers: [], open: false})
    }

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
        .catch(err => console.error(err))
    }

    deleteCustomer = (customer) => {
        if (window.confirm("Are you sure you want to delete this customer?")){
        fetch(customer, {method: 'DELETE'})
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Customer deleted'}))
        .catch(e => console.error(e))
        }
    }

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Customer saved successfully'}))
        .catch(e => console.error(e));
    }

    updateCustomer = (link, updatedCustomer) => {
        fetch(link, 
        {
            method: 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Changes saved successfully'}))
        .catch(e => console.error(e));
    }

    handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        const columnas = [
            {
                Header: 'First Name',
                accessor: 'firstname'
            },
            {
                Header: 'Last Name',
                accessor: 'lastname'
            },
            {
                Header: 'Street Address',
                accessor: 'streetaddress'
            },
            {
                Header: 'Post Code',
                accessor: 'postcode'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell : ({value, row}) => (
                 <EditCustomer updateCustomer={this.updateCustomer} link={value} customer={row}/>   
                )

            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell : ({value}) => (
                 <Button color="secondary" onClick={() => this.deleteCustomer(value)}>Delete</Button>   
                )

            }
        ]

        return (
        <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                <i class="user icon"></i>
                  Customers list
                </Typography>
              </Toolbar>
            </AppBar>
            <AddCustomer saveCustomer={this.saveCustomer}/>
            <ReactTable 
                filterable = {true}
                data = {this.state.customers}
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

export default CustomerList;
