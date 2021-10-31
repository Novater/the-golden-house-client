import React, { Component } from 'react';
import _generate from '../functions/index';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

export default class Table extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      records: [],
      search: '',
      type: props.tableType,
      filter: props.rowSelectOptions ? props.rowSelectOptions.selected : '',
      rowSelectOptions: props.rowSelectOptions,
      currRowIndex: 0
    };
  }

  // This method will get the data from the database
  componentDidMount = () => {

    const storedData = window.sessionStorage.getItem(this.state.type);

    if (!storedData) {
      axios
      .get(`${process.env.SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/record`)
      .then((response) => {
        console.log(response);
        this.setState({ 
          records: response.data,
          search: ''
        });
        window.sessionStorage.setItem(this.state.type, JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({
        records: JSON.parse(storedData),
        search: ''
      });
    }
  }

  componentWillUnmount = () => {
  }

  tableList = () => {
    const copiedRecords = [...this.state.records];
    copiedRecords.sort((a, b) => {
      if (a.time > b.time) return 1;
      if (a.time === b.time) return 0;
      return -1;
    });

    return copiedRecords.map((thisRec) => {
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
    const floor = event.target.name;

    this.setState({
      search: floor
    });
  }

  updateFilter = (event) => {
    this.setState({
      filter: event.target.value,
      rowSelectOptions: {
        ...this.state.rowSelectOptions,
        selected: event.target.value
      }
    });
  }
  
  // This will display the table with all records
  render = () => {

    let headers = this.props.headers;
    let filters = this.props.filters;
    let searchable = this.props.searchable;

    if (filters) {
      filters = _generate.tableFunctions.initializeTableFilters('table-filters btn-group mr-2', filters, this.filterTableByFloor);
    }
    if (headers) {
      headers = _generate.tableFunctions.initializeTableHeaders('leaderboard-row', headers, () => { alert('hello')});
    }
    
    let footerObj = {
      footerClass: 'table-footer',
      rowClass: 'numrows-select',
      rowOptions: this.state.rowSelectOptions,
      onRowUpdate: this.updateFilter
    };

    return (
      <div className='table-container'>
        {
          searchable ? 
          <div className='search-container'>
            <input type='text' id='table-search' onKeyUp={this.updateSearch} placeholder='Search Table...' />
          </div> : ''
        }
        <div className='filter-container'>
          {filters}
        </div>
        <div className='abyss-table'>
          {_generate.tableFunctions.createTable('table table-hover', headers, this.tableList(), this.state.search, this.state.currRowIndex, this.state.filter, footerObj )}
        </div>
      </div>
    );
  }
}