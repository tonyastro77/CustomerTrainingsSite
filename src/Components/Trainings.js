import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import moment from 'moment';


class Trainings extends Component {
    constructor(props){
        super(props);
        this.state = ({training: []})
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
            }
        ]

        return (
        <div>
            <h1>Trainings</h1>
            <ReactTable 
                filterable = {true}
                data = {this.state.training}
                columns = {columnas}
            />
        </div>
        );
    }
}

export default Trainings;
