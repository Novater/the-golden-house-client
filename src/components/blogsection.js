import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';
import _generate from '../functions/index';
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
      isEdit: this.props.isEdit,
      isEditMode: false,
      showCreateModal: false,
      showDeleteModal: false
    };
  };

  componentDidMount = () => {
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.isEdit !== this.props.isEdit || prevProps.isEditMode !== this.props.isEditMode) {
      this.setState({
        isEdit: this.props.isEdit,
        isEditMode: this.props.isEditMode
      });
    }
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
              <input type='text' id={`title-${this.state.id}`} className='form-control' aria-describedby='titleHelp' placeholder='Enter Title' value={this.state.title} onChange={this.handleChange}></input>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Content: </label>
            <div className='col-sm-10'>
              <Editor
                value={this.state.content}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount code textcolor'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                  'bold italic forecolor backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | code | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                id={`content-${this.state.id}`}
                onEditorChange={this.handleEditorChange}
                apiKey='gtfc54ziqkg4zxfs7ygx30ddnkzks6abnkds81zs3h6p2ftm'
              />
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

  handleEditorChange = (content) => {
    this.setState({ content: content });
  }
  handleChange = (event) => {
    const thisName = event.target.id;
    console.log('handlechange');
    switch (thisName) {
      case thisName.match('title-.*').input: 
        this.setState({ title: event.target.value });
        break;
      case thisName.match('content-.*').input:
        this.setState({ content: event.target.getContent() });
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
