import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import _generate from '../functions/index';
import axios from 'axios';

export default class BlogSection extends Component {
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.id,
      title: props.title,
      content: props.content,
      loadedTitle: props.title,
      loadedContent: props.content,
      isEdit: this.props.isEdit,
      isEditMode: false,
      showCreateModal: false,
      showDeleteModal: false
    };
  };

  componentDidMount = () => {
  };

  componentWillReceiveProps = (props) => {
    this.setState({
      isEdit: props.isEdit,
      isEditMode: props.isEditMode
    });
  }

  cancelSave = () => {
    this.setState({
      title: this.state.loadedTitle,
      content: this.state.loadedContent,
      isEditMode: false
    });
  }

  createNewPost = () => {
    this.setState({ showCreateModal: true });
  }

  confirmCreate = () => {
    const SERVER_URL = _generate.serverFunctions.getServerURL();

    axios
      .post(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/create`,
      {
        index: this.props.index,
        tabname: this.props.tabName
      })
      .then((response) => {
        console.log(response);
        this.props.updatePosts();
        this.setState({ showCreateModal: false });
      })
      .catch((err) => {
        console.log(err);
      });    
  }

  deleteBlogPost = () => {
    this.setState({ showDeleteModal: true });
  }

  confirmDelete = () => {
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

  handleCloseCreate = () => {
    this.setState({ showCreateModal: false });
  }

  handleCloseDelete = () => {
    this.setState({ showDeleteModal: false });
  }
  editBlogPost = () => {
    this.setState({ isEditMode: true });
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
        {
          this.state.isEdit ? 
            <div className='new-post-above' onClick={this.createNewPost}><FontAwesomeIcon icon={faPlus} /></div>
            : ''
        }
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
        {
          this.state.isEdit ? 
            <div className='new-post-below' onClick={this.createNewPost}><FontAwesomeIcon icon={faPlus} /></div>
            : ''
        }
        {
          _generate.createFunctions.createModal('Confirm', 'Create a new post?', this.state.showCreateModal, this.confirmCreate, this.handleCloseCreate)
        }
        {
          _generate.createFunctions.createModal('Confirm', 'Are you sure you want to delete this post?', this.state.showDeleteModal, this.confirmDelete, this.handleCloseDelete)
        }
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
      isEditMode: false
    });
  }

  render = () => {
    return (
      this.state.isEditMode ? this.getBlogEditMode() : this.getBlogViewMode()
    );
  }
}