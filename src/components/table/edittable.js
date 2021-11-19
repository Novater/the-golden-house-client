/* eslint-disable */

import React, { useEffect, useState } from 'react'
import _generate from '../../functions/index'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const POST_CONSTANTS = require('../../constants/postConstants')
import store from '../../store/store'

export default function TableEditor({
  headers,
  searchable,
  dataUrl,
  row,
  col,
  finishEdit,
  pagination,
  dataSource,
}) {
  const TABLE_HEADER_KEYS = {
    TITLE: 'title',
    FORMAT: 'format',
    KEYS: 'keys',
    FILTERVALUES: 'filterValues',
    FILTERSTYLE: 'filterStyle',
  }

  useEffect(() => {}, [headers])
  const [currentSelected, selectNew] = useState(null)

  function deleteTableHeader(index) {
    return function (event) {
      event.stopPropagation()
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
          row,
          col,
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
          row,
          col,
        },
      })

      // clearTimeout(timeOutId)
    }
  }

  function setCurrentColumn(title, idx) {
    return function (event) {
      selectNew(getHeaderSerial(title, idx))
    }
  }

  function unsetCurrentColumn() {
    selectNew(null)
  }

  function getHeaderSerial(title, idx) {
    return `${idx}`
  }

  function preventDefault(event) {
    event.stopPropagation()
  }

  function updateURL(event) {
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          dataSource: event.target.value,
        },
        row,
        col,
      },
    })
  }

  function updatePagination(event) {
    console.log(JSON.parse(event.target.value))
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          rowSelectOptions: JSON.parse(event.target.value),
        },
        row,
        col,
      },
    })
  }

  function updateSearchable(event) {
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          searchable: event.target.value === 'true',
        },
        row,
        col,
      },
    })
  }
  return (
    <div className="table-editor-container">
      <div className="table-edit-close">
        <button onClick={finishEdit}>{'Finish Editing'}</button>
      </div>
      <div className="table-editor-component">
        <h4>{'Columns:'}</h4>
        {headers.map((header, idx) => {
          if (getHeaderSerial(header.title, idx) === currentSelected) {
            return (
              <div
                className="table-edit-row columns"
                key={`table-edit-row-${header.title}-${idx}`}
                id={`table-edit-row-${header.title}-${idx}`}
                onClick={unsetCurrentColumn}
              >
                {_.keys(header).map((key, idxHeader) => {
                  return (
                    <div
                      key={`table-edit-col-${key}-${idx}-${idxHeader}`}
                      id={`table-edit-col-${key}-${idx}-${idxHeader}`}
                      className={`table-edit-col ${key}`}
                    >
                      <p>{`${key.toUpperCase()}:`}</p>
                      <textarea
                        defaultValue={JSON.stringify(header[key], undefined, 2)}
                        onBlur={updateTableHeader(key, idx)}
                        onClick={preventDefault}
                      ></textarea>
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
          } else {
            const randomize = Math.random()
            return (
              <div
                className="table-edit-row-collapsed columns"
                id={`table-edit-col-${header.title}-${idx}-${randomize}`}
                key={`table-edit-col-${header.title}-${idx}-${randomize}`}
                onClick={setCurrentColumn(header.title, idx)}
              >
                <p className="table-edit-header">{`${header.title}`}</p>
                <FontAwesomeIcon
                  className="delete-table-header"
                  icon={faTrash}
                  onClick={deleteTableHeader(idx)}
                />
              </div>
            )
          }
        })}
        <div className="table-edit-row add-new">
          <button onClick={addTableHeader}>{'Add New Header'}</button>
        </div>
        <h4>{`Your Data Structure:`}</h4>
        <div className="table-edit-row data">
          <textarea
            className="edit-sample-data"
            value={JSON.stringify(dataSource[0], undefined, 2)}
          ></textarea>
        </div>
        <hr />
        <div className="table-edit-row searchable">
          <h4>{`Searchable:`}</h4>
          <input defaultValue={searchable} onBlur={updateSearchable}></input>
        </div>
        <hr />
        <div className="table-edit-row data-url">
          <h4>{`Data URL:`}</h4>
          <textarea defaultValue={dataUrl} onBlur={updateURL}></textarea>
        </div>
        <hr />
        <div className="table-edit-row pagination">
          <h4>{`Pagination:`}</h4>
          <textarea
            defaultValue={`${JSON.stringify(pagination, undefined, 2)}`}
            onBlur={updatePagination}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
