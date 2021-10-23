import React, { Component } from 'react';

import axios from 'axios';

const TableEntry = (props) => (
  <tr>
    <td>{props.record.time}</td>
    <td>{props.record.alias}</td>
    <td>{Number(props.record.version)}</td>
    <td>{props.record.region}</td>
    <td>{props.record.link}</td>
    <td>{props.record.characters.toString()}</td>
    <td>{props.record.notes}</td>
  </tr>
);

export default class Table extends Component {
  constructor (props) {
    super(props);
    this.state = { records: [] }
  }

  // This method will get the data from the database
  componentDidMount() {
    axios
      .get(`${process.env.SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/record/`)
      .then((response) => {
        console.log(response);
        this.setState({ records: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tableList() {
    console.log('record', this.state.records);
    return this.state.records.map((thisRec) => {
      console.log('thisrec', thisRec);
      return (
        <TableEntry
          record={thisRec}
          key={thisRec._id}
        />
      );
    });
  }

  // This will display the table with all records

  render() {
    console.log('state', this.state);
    return (
      <div className='abyss-table'>
        <table className='table table-striped' style={{ marginTop: 20}} >
          <thead>
            <tr>
              <th>Time</th>
              <th>Alias</th>
              <th>Version</th>
              <th>Region</th>
              <th>Link</th>
              <th>Characters</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>{this.tableList()}</tbody>
        </table>
      </div>
    )
  }
}