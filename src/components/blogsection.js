/* eslint-disable */

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { userSelector } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentEditor from './contenteditor'
import _generate from '../functions/index'
import store from '../store/store'

const POST_CONSTANTS = require('../constants/postConstants')
const config = require('../config/index')

class BlogSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      loadedTitle: this.props.title,
      loadedContent: this.props.content,
      isEditing: this.props.isEditing,
      createFromId: null,
      showCreateModal: false,
      showDeleteModal: false,
    }
  }

  componentDidMount() {}

  cancelSave = () => {
    this.setState((prevState) => ({
      title: prevState.loadedTitle,
      content: prevState.loadedContent,
      isEditing: false,
    }))
  }

  createNewPost = (event) => {
    const direction = event.target.id.split('-')[0]
    const newPost = {
      tite: 'Enter title here.',
      content: 'Enter content here.',
      row: 0,
      col: 0,
      tabname: this.props.tab,
    }
    switch (direction) {
      case 'up': {
        newPost.row = this.props.row
        newPost.col = 0
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: this.props.row,
            newRow: true,
            post: newPost,
          },
        })
      }
      case 'down': {
        newPost.row = this.props.row + 1
        newPost.col = 0
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: this.props.row + 1,
            newRow: true,
            post: newPost,
          },
        })
      }
      case 'left': {
        newPost.row = this.props.row
        newPost.col = this.props.col
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: this.props.row,
            col: this.props.col,
            post: newPost,
          },
        })
      }
      case 'right': {
        newPost.row = this.props.row
        newPost.col = this.props.col + 1
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: this.props.row,
            col: this.props.col + 1,
            post: newPost,
          },
        })
      }
      default:
        break
    }
  }

  deleteBlogPost = () => {
    store.dispatch({
      type: POST_CONSTANTS.DELETE_POST,
      payload: {
        row: this.props.row,
        col: this.props.col,
      },
    })
  }

  editBlogPost = () => {
    this.setState({ isEditing: true })
  }

  getBlogEditMode = () => {
    return (
      <div className="blog-post" id={this.state.id}>
        <form className="blog-form" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-12 blog-title">
              <input
                type="text"
                id={`title-${this.state.id}`}
                aria-describedby="titleHelp"
                placeholder="Enter Title"
                value={this.state.title}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <ContentEditor
                onChange={this.handleEditorChange}
                content={this.state.content}
                id={this.state.id}
              />
            </div>
          </div>
          <div className="form-group row button-group">
            <button
              type="button"
              name="save"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              name="cancel"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  getBlogViewMode = () => {
    return (
      <div className="blog-post" id={this.state.id}>
        {this.props.inEditMode && !this.props.isDummy ? (
          <div
            className="new-post-above"
            id={`up-${this.state.id}`}
            onClick={this.createNewPost}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        ) : (
          ''
        )}
        <div className="header">
          <h4
            dangerouslySetInnerHTML={{
              __html: _generate.cleanHTML.clean(
                this.state.title,
                config.allowedTags,
                config.allowedAttr,
              ),
            }}
          ></h4>
          {this.props.inEditMode && !this.props.isDummy ? (
            <div className="edit">
              <FontAwesomeIcon icon={faPen} onClick={this.editBlogPost} />
              <FontAwesomeIcon icon={faTrash} onClick={this.deleteBlogPost} />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="content-area">
          {this.props.inEditMode && !this.props.isDummy ? (
            <div
              className="new-post-left"
              id={`left-${this.state.id}`}
              onClick={this.createNewPost}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          ) : null}
          <p
            dangerouslySetInnerHTML={{
              __html: _generate.cleanHTML.clean(
                this.state.content,
                config.allowedTags,
                config.allowedAttr,
              ),
            }}
          ></p>
          {this.props.inEditMode && !this.props.isDummy ? (
            <div
              className="new-post-right"
              id={`right-${this.state.id}`}
              onClick={this.createNewPost}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          ) : null}
        </div>
        {this.props.inEditMode ? (
          <div
            className="new-post-below"
            id={`down-${this.state.id}`}
            onClick={this.createNewPost}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        ) : (
          ''
        )}
        {_generate.createFunctions.createModal(
          'Confirm',
          'Create a new post?',
          this.state.showCreateModal,
          this.confirmCreate,
          this.handleCloseCreate,
        )}
        {_generate.createFunctions.createModal(
          'Confirm',
          'Are you sure you want to delete this post?',
          this.state.showDeleteModal,
          this.confirmDelete,
          this.handleCloseDelete,
        )}
      </div>
    )
  }

  handleSubmit = (event) => {
    const type = event.target.name

    if (type === 'save') {
      this.saveBlogPost()
    }
    if (type === 'cancel') {
      this.cancelSave()
    }
  }

  handleEditorChange = (content) => {
    this.setState({ content })
  }

  handleChange = (event) => {
    const thisName = event.target.id

    switch (thisName) {
      case thisName.match('title-.*').input:
        this.setState({ title: event.target.value })
        break
      case thisName.match('content-.*').input:
        this.setState({ content: event.target.getContent() })
        break
      default:
        break
    }
  }

  saveBlogPost = () => {
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          title: this.state.title,
          content: this.state.content,
        },
        row: this.props.row,
        col: this.props.col,
      },
    })

    this.setState({
      isEditing: false,
    })
  }

  render() {
    return this.state.isEditing
      ? this.getBlogEditMode()
      : this.getBlogViewMode()
  }
}

BlogSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  index: PropTypes.string,
  tabName: PropTypes.string.isRequired,
  updatePosts: PropTypes.func,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
  showEditModal: state.edit.showEditModal,
  loggedIn: state.auth.loggedIn,
  tab: state.post.tab,
})

export default connect(mapState)(BlogSection)
