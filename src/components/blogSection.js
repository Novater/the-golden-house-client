import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import _generate from '../functions/index';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class BlogSection extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      content: props.content,
      loadedTitle: props.title,
      loadedContent: props.content,
      isEdit: true,
      editMode: false,
      deleteMode: false
    };
  };

  componentDidMount = () => {
  };

  cancelSave = () => {
    this.setState({
      title: this.state.loadedTitle,
      content: this.state.loadedContent,
      editMode: false
    });
  }

  deleteBlogPost = () => {
    alert(`Trying to delete post ${this.state.id}`);
    const SERVER_URL = _generate.serverFunctions.getServerURL();

    axios
      .post(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/delete`,
      {
        id: this.state.id
      })
      .then((response) => {
        console.log(response);
        this.props.updatePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editBlogPost = () => {
    this.setState({ editMode: true });
  }

  getBlogEditMode = () => {
    return (
      <div className='blog-post' id={this.state.id}>
        <form className='blog-form' onSubmit={this.handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Title: </label>
            <div className='col-sm-10'>
              <input type='text' name='title' className='form-control' aria-describedby='titleHelp' placeholder='Enter Title' value={this.state.title} onChange={this.handleChange}></input>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Content: </label>
            <div className='col-sm-10'>
              <textarea name='content' className='form-control' aria-describedby='contentHelp' placeholder='Enter Content' value={this.state.content} onChange={this.handleChange}></textarea>
            </div>
          </div>
          <div className='form-group row button-group'>
            <button type='button' name='save' className='btn btn-dark' onClick={this.handleSubmit}>Save</button>
            <button type='button' name='cancel' className='btn btn-dark' onClick={this.handleSubmit}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  getBlogViewMode = () => {
    return (
      <div className='blog-post' id={this.state.id}>
        <div className='header'>
          <h4 dangerouslySetInnerHTML={{ __html: this.state.title }}></h4>
          {
            this.state.isEdit ? 
              <div className='edit'>
                <FontAwesomeIcon icon={faPen} onClick={this.editBlogPost} />
                <FontAwesomeIcon icon={faTrash} onClick={this.deleteBlogPost} />
              </div> 
              : ''
          }
        </div>
        <div className='content-area'>
          <p dangerouslySetInnerHTML={{ __html: this.state.content }}></p>
        </div>
      </div>
    );
  }

  handleSubmit = (event) => {
    const type = event.target.name;

    if (type === 'save') {
      this.saveBlogPost();
    }
    if (type === 'cancel') {
      this.cancelSave();
    }
  }

  handleChange = (event) => {
    const thisName = event.target.name.toLowerCase();

    switch (thisName) {
      case 'title': 
        this.setState({ title: event.target.value });
        break;
      case 'content':
        this.setState({ content: event.target.value });
        break;
      default: 
        break;
    }
  }

  saveBlogPost = () => {
    const SERVER_URL = _generate.serverFunctions.getServerURL();

    axios
    .post(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/update`,
    {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

    this.setState({ 
      loadedTitle: this.state.title,
      loadedContent: this.state.content,
      editMode: false
    });
  }

  render = () => {
    return (
      this.state.editMode ? this.getBlogEditMode() : this.getBlogViewMode()
    );
  }
}