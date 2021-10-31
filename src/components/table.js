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
      sortKey: this.props.defaultSortKey,
      sortDir: this.props.defaultSortDir || 1,
      type: props.tableType,
      filter: this.props.rowSelectOptions ? this.props.rowSelectOptions.selected : '',
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
        if (this.state.sortKey) {
          this.sortTable(this.state.sortKey, this.state.sortDir || 1, response.data);
        } else {
          this.setState({
            records: response.data
          });
        }
        window.sessionStorage.setItem(this.state.type, JSON.stringify(this.state.records));
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      if (this.state.sortKey) {
        this.sortTable(this.state.sortKey, this.state.sortDir || 1, JSON.parse(storedData));
      } else {
        this.setState({
          records: JSON.parse(storedData)
        });
      }
    }
  }

  componentWillUnmount = () => {
  }

  tableList = () => {
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
  
  sortByKey = (event) => {
    const headerName = event.target.getAttribute('name');
    
    if (this.state.sortKey === headerName) {
      this.sortTable(headerName, this.state.sortDir * -1, [...this.state.records]);
    } else {
      this.sortTable(headerName, 1, [...this.state.records]);
    }
  }

  sortTable = (sortKey, sortDirection, records) => {
    let headerObj;
    const headers = this.props.headers;
    console.log(sortDirection);

    for (let i = 0; i < headers.length; i += 1) {
      if (headers[i].title === sortKey) headerObj = headers[i];
    }

    if (!headerObj) return;

    const format = headerObj.format;
    const keys = headerObj.keys;

    for (let i = 0; i < records.length; i += 1) {
      let stringRep = format;
      for (const key of keys) {
        stringRep = stringRep.replace(`{${key}}`, records[i][key]);
      }
      records[i].sortString = stringRep;
    }

    records.sort((a, b) => {
      if (a.sortString > b.sortString) return 1 * sortDirection;
      if (a.sortString === b.sortString) {
        return 0;
      }
      return -1 * sortDirection;
    });

    console.log(records);

    this.setState({
      records: records,
      sortDir: sortDirection,
      sortKey: sortKey
    });
  }

  updateRanks = () => {
    const copiedRecs = [...this.state.records];

    for (let i = 0; i < copiedRecs.length; i += 1) {
      copiedRecs[i].rank = i + 1;
    }
    console.log(copiedRecs);
    this.setState({
      records: copiedRecs
    });
  }

  // This will display the table with all records
  render = () => {
    console.log(this.state);
    console.log(this.props);
    let headers = this.props.headers;
    let filters = this.props.filters;
    let searchable = this.props.searchable;

    if (filters) {
      filters = _generate.tableFunctions.initializeTableFilters('table-filters btn-group mr-2', filters, this.filterTableByFloor);
    }
    if (headers) {
      headers = _generate.tableFunctions.initializeTableHeaders('leaderboard-row', headers, this.sortByKey);
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