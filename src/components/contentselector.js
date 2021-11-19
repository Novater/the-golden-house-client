/* eslint-disable */

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentEditor from './contenteditor'
import _generate from '../functions/index'
import store from '../store/store'
import table from './table/table'

const POST_CONSTANTS = require('../constants/postConstants')
const config = require('../config/index')

export default function ContentSelector({ position, tab }) {
  function createTableComponent() {
    const newPost = {
      tablename: 'abyss',
      rowSelectOptions: {
        rows: ['10', '20', '50', '100'],
        selected: '100',
      },
      headers: [],
      row: position.row,
      col: position.kcol,
      tabname: tab,
      type: 'table',
      dataSource: 'https://calm-plains-52439.herokuapp.com/record/import',
      searchable: true,
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
  function createBlogComponent() {
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
      <button onClick={createTableComponent}>Add table</button>
      <button onClick={createBlogComponent}>Add post</button>
    </div>
  )
}
