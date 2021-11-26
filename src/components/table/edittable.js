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
  refreshRate,
}) {
  const EDIT_TABLE_SUBTABS = {
    HEADERS: 'Headers',
    DATA_SETUP: 'Data Setup',
    FINISH_EDIT: 'Finish Edit',
  }

  const TABLE_HEADER_KEYS = {
    TITLE: 'title',
    FORMAT: 'format',
    KEYS: 'keys',
    FILTERVALUES: 'filterValues',
    FILTERSTYLE: 'filterStyle',
  }

  useEffect(() => {}, [headers])
  const [currentSelectedHeader, selectNewHeader] = useState(null)
  const [currentSelectedTab, selectNewTab] = useState(
    EDIT_TABLE_SUBTABS.HEADERS,
  )

  function setSubTab(event) {
    console.log(event.target.innerText)
    selectNewTab(event.target.innerText)
  }
  function EditTableNavbar({ elements, currentSelected }) {
    return (
      <nav className={`edit-table-nav`}>
        {elements.map((element) => {
          if (element === EDIT_TABLE_SUBTABS.FINISH_EDIT) {
            return (
              <div
                className={`table-subtab ${
                  element === currentSelectedTab ? `selected` : ``
                }`}
                onClick={finishEdit}
                key={`edit-table-navbar-${element}`}
              >
                {element}
              </div>
            )
          }
          return (
            <div
              className={`table-subtab ${
                element === currentSelectedTab ? `selected` : ``
              }`}
              onClick={setSubTab}
              key={`edit-table-navbar-${element}`}
            >
              {element}
            </div>
          )
        })}
      </nav>
    )
  }

  function deleteTableHeader(index) {
    return function (event) {
      event.stopPropagation()
      const thisIndex = index
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })
      copiedHeaders.splice(thisIndex, 1)
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
      selectNewHeader(getHeaderSerial(title, idx))
    }
  }

  function unsetCurrentColumn() {
    selectNewHeader(null)
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

  function updateRefreshRate(event) {
    store.dispatch({
      type: POST_CONSTANTS.EDIT_POST,
      payload: {
        post: {
          refreshRate: JSON.parse(event.target.value),
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

  switch (currentSelectedTab) {
    case EDIT_TABLE_SUBTABS.HEADERS: {
      return (
        <div className="table-editor-container">
          <EditTableNavbar elements={_.values(EDIT_TABLE_SUBTABS)} />
          <div className="table-editor-component">
            <h4>{'Columns:'}</h4>
            <div className="table-headers">
              {headers.map((header, idx) => {
                if (
                  getHeaderSerial(header.title, idx) === currentSelectedHeader
                ) {
                  return (
                    <div
                      className="table-edit-row columns"
                      key={`table-edit-row-${header.title}-${idx}`}
                      id={`table-edit-row-${header.title}-${idx}`}
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
                              defaultValue={JSON.stringify(
                                header[key],
                                undefined,
                                2,
                              )}
                              onBlur={updateTableHeader(key, idx)}
                              onClick={preventDefault}
                            ></textarea>
                          </div>
                        )
                      })}
                      <div
                        className="collapse-header"
                        onClick={unsetCurrentColumn}
                      />
                      <FontAwesomeIcon
                        className="delete-table-header"
                        icon={faTrash}
                        onClick={deleteTableHeader(idx)}
                      />
                    </div>
                  )
                } else {
                  if (!currentSelectedHeader) {
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
                }
              })}
              {!currentSelectedHeader && (
                <div className="table-edit-row add-new">
                  <div className="add-new-btn" onClick={addTableHeader}></div>
                </div>
              )}
            </div>
            <h4>{`Data Structure:`}</h4>
            <div className="table-edit-row data">
              <textarea
                readOnly={true}
                className="edit-sample-data"
                value={JSON.stringify(
                  dataSource[0] || `No data retrieved from endpoint. Check the data setup.`,
                  undefined,
                  2,
                )}
              ></textarea>
            </div>
          </div>
        </div>
      )
    }
    case EDIT_TABLE_SUBTABS.DATA_SETUP: {
      return (
        <div className="table-editor-container">
          <EditTableNavbar elements={_.values(EDIT_TABLE_SUBTABS)} />
          <div className="table-editor-component">
            <h4>{`Searchable:`}</h4>
            <div className="table-edit-row searchable">
              <input
                defaultValue={searchable}
                onBlur={updateSearchable}
              ></input>
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
            <div className="table-edit-row refresh-rate">
              <h4>{`Refresh Rate:`}</h4>
              <textarea
                defaultValue={refreshRate}
                onBlur={updateRefreshRate}
              ></textarea>
            </div>
          </div>
        </div>
      )
    }

    default: {
      return (
        <div className="table-editor-container">
          <div className="table-editor-component">
            <h4>{'Columns:'}</h4>
            <div className="table-headers">
              {headers.map((header, idx) => {
                if (
                  getHeaderSerial(header.title, idx) === currentSelectedHeader
                ) {
                  return (
                    <div
                      className="table-edit-row columns"
                      key={`table-edit-row-${header.title}-${idx}`}
                      id={`table-edit-row-${header.title}-${idx}`}
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
                              defaultValue={JSON.stringify(
                                header[key],
                                undefined,
                                2,
                              )}
                              onBlur={updateTableHeader(key, idx)}
                              onClick={preventDefault}
                            ></textarea>
                          </div>
                        )
                      })}
                      <div
                        className="collapse-header"
                        onClick={unsetCurrentColumn}
                      />
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
                <div className="add-new-btn" onClick={addTableHeader}></div>
              </div>
            </div>
            <h4>{`Your Data Structure:`}</h4>
            <div className="table-edit-row data">
              <textarea
                readOnly={true}
                className="edit-sample-data"
                value={JSON.stringify(
                  dataSource[0] || `No data retrieved from endpoint. Check the data setup.`,
                  undefined,
                  2,
                )}
              ></textarea>
            </div>
            <hr />
            <div className="table-edit-row searchable">
              <h4>{`Searchable:`}</h4>
              <input
                defaultValue={searchable}
                onBlur={updateSearchable}
              ></input>
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
            <div className="table-edit-row refresh-rate">
              <h4>{`Refresh Rate:`}</h4>
              <textarea
                defaultValue={refreshRate}
                onBlur={updateRefreshRate}
              ></textarea>
            </div>
          </div>
        </div>
      )
    }
  }
}
