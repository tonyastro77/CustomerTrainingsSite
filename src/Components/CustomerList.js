import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'


class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = ({customers: []})
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
            }
        ]

        return (
        <div>
            <h1>Customers</h1>
            <ReactTable 
                filterable = {true}
                data = {this.state.customers}
                columns = {columnas}
            />
        </div>
        );
    }
}

export default CustomerList;
