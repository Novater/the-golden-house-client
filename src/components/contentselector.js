/* eslint-disable */

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faTable } from '@fortawesome/free-solid-svg-icons'
import _generate from '../functions/index'
import store from '../store/store'

const POST_CONSTANTS = require('../constants/postConstants')
const EDIT_CONSTANTS = require('../constants/editConstants')
const config = require('../config/index')

export default function ContentSelector({ position, tab }) {
  function createTableComponent() {
    const defaultTable = {
      tablename: 'abyss',
      rowSelectOptions: {
        rows: ['10', '20', '50', '100'],
        selected: '100',
      },
      headers: [],
      row: position.row,
      col: position.col,
      tabname: tab,
      type: 'table',
      dataSource: '',
      searchable: true,
    }

    store.dispatch({
      type: POST_CONSTANTS.INSERT_POST,
      payload: {
        row: position.row,
        col: position.col,
        newRow: position.newRow,
        post: defaultTable,
      },
    })
    store.dispatch({
      type: EDIT_CONSTANTS.CLOSE_SIDEBAR,
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
    store.dispatch({
      type: EDIT_CONSTANTS.CLOSE_SIDEBAR,
    })
  }

  return (
    <div className="content-select-container">
      <h4>{'Select New Content Type'}</h4>
      <hr style={{ width: '100%' }} />
      <div className="content-select-row">
        <div className="content-select-type">
          <FontAwesomeIcon
            title="Create Blog Post"
            icon={faClipboard}
            onClick={createBlogComponent}
          />
          <p>Blog Post</p>
        </div>
        <div className="content-select-type">
          <FontAwesomeIcon
            title="Create Table"
            icon={faTable}
            onClick={createTableComponent}
          />
          <p>Table</p>
        </div>
      </div>
      <div className="content-select-row">
        <div>More content types coming soon...</div>
      </div>
    </div>
  )
}
