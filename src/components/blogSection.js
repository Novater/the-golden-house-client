import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class BlogSection extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content
    };
  };

  componentDidMount() {

  };

  render() {
    return (
      <div class="blog-post" draggable >
        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
        <FontAwesomeIcon icon={['far', 'trash']} />
      </div>
    );
  }
}