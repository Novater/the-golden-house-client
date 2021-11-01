import React, { Component } from 'react';

export default class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
  };

  render = () => {
    return (
      <div className='spinner-container'>
        <div className="spinner-border text-light" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
}