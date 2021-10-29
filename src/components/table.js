import React, { Component } from 'react';
import _generate from '../functions/index';
import axios from 'axios';

export default class Table extends Component {
  constructor (props) {
    super(props);
    this.state = { records: [], search: '', type: props.tableType }
  }

  // This method will get the data from the database
  componentDidMount = () => {
    axios
      .get(`${process.env.SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/record`)
      .then((response) => {
        console.log(response);
        this.setState({ 
          records: response.data,
          search: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount = () => {
  }

  tableList = () => {
    this.state.records.sort((a, b) => {
      if (a.time > b.time) return 1;
      return -1;
    });

    return this.state.records.map((thisRec) => {
      return (
        {
          thisRec: thisRec,
          trClass: 'abyss-info-row'
        }
      );
    });
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  filterTableByFloor = (event) => {
    console.log(event);
    const floor = event.target;
    alert('Filter by floor', floor);
  }

  // This will display the table with all records
  render = () => {
    console.log('state', this.state);

    let headers = ['Version', 'Time', 'Alias', 'Region', 'Link', 'Characters', 'Notes'];
    let filters = ['12-1-1', '12-1-2', '12-2-1', '12-2-2', '12-3-1', '12-3-2', '12-1', '12-2', '12-3'];

    filters = _generate.tableFunctions.initializeTableFilters('table-filters', filters, this.filterTableByFloor);
    headers = _generate.tableFunctions.initializeTableHeaders('leaderboard-row', headers, () => { alert('hello')});

    return (
      <div className='table-container'>
        <input type='text' id='table-search' onKeyUp={this.updateSearch} placeholder='Search Table...' />
        {filters}
        <div className='abyss-table'>
          {_generate.tableFunctions.createTable('table table-hover', headers, this.tableList(), this.state.search)}
        </div>
      </div>
    );
  }
}