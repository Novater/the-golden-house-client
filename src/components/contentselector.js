/* eslint-disable */

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentEditor from './contenteditor'
import _generate from '../functions/index'
import store from '../store/store'

const POST_CONSTANTS = require('../constants/postConstants')
const config = require('../config/index')

export default function ContentSelector({ position, tab }) {
  function createContent() {
    const newPost = {
      tite: 'Enter title here.',
      content: 'Enter content here.',
      row: position.row,
      col: position.col,
      tabname: tab,
      type: 'post',
    }

    store.dispatch({
      type: POST_CONSTANTS.INSERT_POST,
      payload: {
        row: position.row,
        col: position.col,
        newRow: position.newRow,
        post: newPost,
      },
    })
  }

  return (
    <div className="content-select-container">
      <h4>{'Select New Content Type'}</h4>
      {`Add new content at position ${position.row} ${position.col}`}
      <button>Add table</button>
      <button onClick={createContent}>Add post</button>
    </div>
  )
}
