/* eslint-disable */

import React, { Component, useEffect } from 'react'
import _generate from '../../functions/index'
import TableFilters from './tablefilters'
import PageModal from '../modal'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'
import LoadingSpinner from '../loadingspinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
const POST_CONSTANTS = require('../../constants/postConstants')
import store from '../../store/store'

export default function TableEditor({
  headers,
  searchable,
  dataUrl,
  row,
  col,
}) {
  useEffect(() => {}, [headers])

  function deleteTableHeader(index) {
    return function () {
      const thisIndex = index
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })
      copiedHeaders.splice(thisIndex, 1)
      console.log(copiedHeaders)
      store.dispatch({
        type: POST_CONSTANTS.EDIT_POST,
        payload: {
          post: {
            headers: copiedHeaders,
          },
          row: row,
          col: col,
        },
      })
    }
  }

  function addTableHeader() {
    const copiedHeaders = [...headers]
    const defaultHeader = {
      title: 'New Header',
      format: '{keys}-{here}',
      keys: ['keys', 'here'],
      filterValues: [],
      filterStyle: 'dropdown',
    }
    copiedHeaders.push(defaultHeader)
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          headers: copiedHeaders,
        },
        row: row,
        col: col,
      },
    })
  }

  function updateTableHeader(key, index) {
    return function (event) {
      const thisIndex = index
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })
      let updateVal =
        key === 'keys'
          ? event.target.value.toString().split(',')
          : event.target.value
      // if (key === 'keys') event.target.value.join(',')
      copiedHeaders[thisIndex][key] = JSON.parse(updateVal)
      store.dispatch({
        type: POST_CONSTANTS.EDIT_POST,
        payload: {
          post: {
            headers: copiedHeaders,
          },
          row: row,
          col: col,
        },
      })

      // clearTimeout(timeOutId)
    }
  }

  return (
    <div className="table-editor-container">
      <div className="table-editor-component">
        <h4>Headers:</h4>
        {headers.map((header, idx) => {
          return (
            <div
              className="table-edit-row"
              key={`table-edit-row-${header.title}-${idx}`}
              id={`table-edit-row-${header.title}-${idx}`}
            >
              {_.keys(header).map((key) => {
                return (
                  <div key={`table-edit-col-${key}`} className="table-edit-col">
                    <p>{`${key.toUpperCase()}:`}</p>
                    <input
                      defaultValue={JSON.stringify(header[key])}
                      onBlur={updateTableHeader(key, idx)}
                    ></input>
                  </div>
                )
              })}
              <FontAwesomeIcon
                className="delete-table-header"
                icon={faTrash}
                onClick={deleteTableHeader(idx)}
              />
            </div>
          )
        })}
        <div className="table-edit-row">
          <button onClick={addTableHeader}>{'Add New Header'}</button>
        </div>
        <h4>{`Searchable: ${searchable}`}</h4>
        <h4>{`Data URL: ${dataUrl}`}</h4>
      </div>
    </div>
  )
}
