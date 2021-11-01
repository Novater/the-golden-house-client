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
      pageRows: this.props.rowSelectOptions ? this.props.rowSelectOptions.selected : '',
      filter: this.props.defaultFilter,
      rowSelectOptions: props.rowSelectOptions,
      currPage: 1
    };
  }

  // This method will get the data from the database
  componentDidMount = () => {
    const storedData = window.sessionStorage.getItem(this.state.type);
    const SERVER_URL = _generate.serverFunctions.getServerURL();

    if (true) {
      axios
      .get(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/record/${this.props.dataSource}`)
      .then((response) => {
        if (this.state.sortKey) {
          this.sortTable(this.state.sortKey, this.state.sortDir || 1, response.data, true);
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
        this.sortTable(this.state.sortKey, this.state.sortDir || 1, JSON.parse(storedData), true);
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
    let searchedRecords = [];
    this.state.records.map((thisRec) => {
      if (this.state.search) {
        if (JSON.stringify(thisRec).toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0) {
          
          if (this.state.filter) {
            let headerObj;
            const headers = this.props.headers;
      
            for (let i = 0; i < headers.length; i += 1) {
              if (headers[i].title === this.props.filters.key) headerObj = headers[i];
            }
        
            if (!headerObj) return;
        
            const format = headerObj.format;
            const keys = headerObj.keys;
  
            let stringRep = format;

            for (const key of keys) {
              stringRep = stringRep.replace(`{${key}}`, thisRec[key]);
            }

            if (this.state.filter === stringRep) {
              searchedRecords.push(
                {
                  thisRec: thisRec,
                  trClass: 'info-row'
                }
              );
            }
          } else {
            searchedRecords.push(
              {
                thisRec: thisRec,
                trClass: 'info-row'
              }
            );
          }
        }
      } else {
        if (this.state.filter) {
          let headerObj;
          const headers = this.props.headers;
    
          for (let i = 0; i < headers.length; i += 1) {
            if (headers[i].title === this.props.filters.key) headerObj = headers[i];
          }
      
          if (!headerObj) return;
      
          const format = headerObj.format;
          const keys = headerObj.keys;

          let stringRep = format;
          
          for (const key of keys) {
            stringRep = stringRep.replace(`{${key}}`, thisRec[key]);
          }

          if (this.state.filter === stringRep) {
            searchedRecords.push(
              {
                thisRec: thisRec,
                trClass: 'info-row'
              }
            );
          }
        } else {
          searchedRecords.push(
            {
              thisRec: thisRec,
              trClass: 'info-row'
            }
          );
        }
      }
    });

    return searchedRecords;
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value, currPage: 1 });
  }

  filterTable = (event) => {
    const filter = event.target.value;
    console.log(this.props.filters);
    const filterIndex = this.props.filters.headers.indexOf(filter);
    const filterKey = this.props.filters.values[filterIndex];

    this.setState({
      filter: filterKey,
      currPage: 1
    });

    this.sortTable(this.props.defaultSortKey, this.props.defaultSortDir, [...this.state.records], true);
  }

  updateFilter = (event) => {
    this.setState({
      pageRows: event.target.value,
      currPage: 1,
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

  sortTable = (sortKey, sortDirection, records, ranking = false) => {
    let headerObj;
    const headers = this.props.headers;

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

    if (ranking) {
      records.map((record, idx) => {
        record.rank = idx + 1;
        return record;
      });
    }

    this.setState({
      records: records,
      sortDir: sortDirection,
      sortKey: sortKey
    });
  }

  updatePage = (event) => {
    let pageNum = event.target.getInnerHTML();

    if (pageNum.toLowerCase() === 'previous') {
      if (this.state.currPage > 1) this.setState({ currPage: --this.state.currPage });
    } else if (pageNum.toLowerCase() === 'next') {
      this.setState({ currPage: ++this.state.currPage });
    } else {
      this.setState({
        currPage: event.target.getInnerHTML()
      });
    }
  }

  // This will display the table with all records
  render = () => {
    let headers = this.props.headers;
    let filters = this.props.filters;
    let searchable = this.props.searchable;

    console.log('this.tableList', this.tableList());
    if (filters) {
      filters = _generate.tableFunctions.initializeTableFilters({
        title: filters.key,
        filterClass: 'table-filters',
        filters: filters,
        onChange: this.filterTable,
        defaultValue: this.props.defaultFilter
      });
    }
    if (headers) {
      headers = _generate.tableFunctions.initializeTableHeaders('leaderboard-row', headers, this.sortByKey);
    }
    
    let footerObj = {
      footerClass: 'table-footer',
      rowClass: 'numrows-select',
      rowOptions: this.state.rowSelectOptions,
      onRowUpdate: this.updateFilter,
      paginationFunc: this.updatePage
    };

    console.log(this.state);

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
        <div className='web-table'>
          {_generate.tableFunctions.createTable('table-wrapper', 'table table-hover', headers, this.tableList(), this.state.search, this.state.currPage, this.state.pageRows, footerObj, this.props.pagination )}
        </div>
      </div>
    );
  }
}