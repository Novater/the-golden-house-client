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
      filter: ''
    };
  }

  // This method will get the data from the database
  componentDidMount = () => {

    // lets not cache for now 
    //const storedData = window.localStorage.getItem(this.state.type);

    if (true) {
      axios
      .get(`${process.env.SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/record`)
      .then((response) => {
        console.log(response);
        this.setState({ 
          records: response.data,
          search: ''
        });
        // window.localStorage.setItem(this.state.type, JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      // this.setState({
      //   records: JSON.parse(storedData),
      //   search: ''
      // });
    }
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
    const floor = event.target.name;

    this.setState({
      search: floor
    });
  }

  // This will display the table with all records
  render = () => {

    let headers = ['Rank', 'Version', 'Floor', 'Time', 'Alias', 'Region', 'Link', 'Characters', 'Notes'];
    let filters = ['12-1-1', '12-1-2', '12-2-1', '12-2-2', '12-3-1', '12-3-2', '12-1', '12-2', '12-3'];

    filters = _generate.tableFunctions.initializeTableFilters('table-filters btn-group mr-2', filters, this.filterTableByFloor);
    headers = _generate.tableFunctions.initializeTableHeaders('leaderboard-row', headers, () => { alert('hello')});

    return (
      <div className='table-container'>
        <div className='search-container'>
          <input type='text' id='table-search' onKeyUp={this.updateSearch} placeholder='Search Table...' />
        </div>
        <div className='filter-container'>
          {filters}
        </div>
        <div className='abyss-table'>
          {_generate.tableFunctions.createTable('table table-hover', headers, this.tableList(), this.state.search)}
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}