/* eslint-disable */

import React, { useEffect, useState } from 'react'
import _generate from '../../../functions/index'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import EditTableNavbar from './edittablenavbar'
import FilterValues from './edittablefilters'
const EDIT_TABLE_SUBTABS = require('../../../config').edittablesubtabs
const TABLE_HEADER_KEYS = require('../../../config').tableheaderkeys
const FILTER_STYLES = require('../../../config').filterStyles
const PLACEHOLDERS = require('../../../config').placeHolders
const POST_CONSTANTS = require('../../../constants/postConstants')
import store from '../../../store/store'

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
  // const EDIT_TABLE_SUBTABS = {
  //   HEADERS: 'Headers',
  //   DATA_SETUP: 'Data Setup',
  //   FINISH_EDIT: 'Finish Edit',
  // }

  // const TABLE_HEADER_KEYS = {
  //   TITLE: 'title',
  //   FORMAT: 'format',
  //   KEYS: 'keys',
  //   FILTERVALUES: 'filterValues',
  //   FILTERSTYLE: 'filterStyle',
  // }
  useEffect(() => {}, [headers])
  const [currentSelectedHeader, selectNewHeader] = useState(null)
  const [currentSelectedTab, selectNewTab] = useState(
    EDIT_TABLE_SUBTABS.HEADERS,
  )

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
      title: '',
      format: '',
      keys: [],
      filterValues: [
        { title: 'All', lookFor: '' },
        { title: 'filter-title', lookFor: '' },
      ],
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
        key === TABLE_HEADER_KEYS
          ? event.target.value.toString().split(',')
          : event.target.value

      copiedHeaders[thisIndex][key] =
        key === TABLE_HEADER_KEYS.FILTERVALUES
          ? JSON.parse(updateVal)
          : updateVal

      if (key === TABLE_HEADER_KEYS.FORMAT) {
        let keys = updateVal.match(/(?<=\{)(.*?)(?=\})/g)
        copiedHeaders[thisIndex][TABLE_HEADER_KEYS.KEYS] = keys
      }

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
          refreshRate: event.target.value,
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

  function addNewFilter(idx) {
    return (event) => {
      const thisIndex = idx
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })

      const newFilter = {
        title: 'Your-Title',
        lookFor: '',
        type: 'Rough',
      }

      copiedHeaders[thisIndex][TABLE_HEADER_KEYS.FILTERVALUES].push(newFilter)

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

  function editFilter(idx) {
    return ({ filterIndex, title, lookFor, type }) => {
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })
      copiedHeaders[idx][TABLE_HEADER_KEYS.FILTERVALUES][filterIndex].title =
        title
      copiedHeaders[idx][TABLE_HEADER_KEYS.FILTERVALUES][filterIndex].lookFor =
        lookFor
      copiedHeaders[idx][TABLE_HEADER_KEYS.FILTERVALUES][filterIndex].type =
        type
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

  function deleteFilter(idx) {
    return (filterIdx) => {
      const thisIndex = idx
      const copiedHeaders = headers.map((header) => {
        return { ...header }
      })

      return (event) => {
        copiedHeaders[thisIndex][TABLE_HEADER_KEYS.FILTERVALUES].splice(
          filterIdx,
          1,
        )

        const hasDefault = _.reduce(
          copiedHeaders[thisIndex][TABLE_HEADER_KEYS.FILTERVALUES],
          function (hasSelected, curr) {
            return hasSelected || !!curr.selected
          },
          false,
        )

        if (
          !hasDefault &&
          copiedHeaders[thisIndex][TABLE_HEADER_KEYS.FILTERVALUES].length > 0
        )
          copiedHeaders[thisIndex][
            TABLE_HEADER_KEYS.FILTERVALUES
          ][0].selected = true
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
  }

  console.log('headers', headers);
  switch (currentSelectedTab) {
    case EDIT_TABLE_SUBTABS.HEADERS: {
      return (
        <div className="table-editor-container">
          <EditTableNavbar
            elements={_.values(EDIT_TABLE_SUBTABS)}
            finishEdit={finishEdit}
            selectNewTab={selectNewTab}
            currentSelectedTab={currentSelectedTab}
          />
          <div className="table-editor-component">
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
                        if (key === TABLE_HEADER_KEYS.KEYS) return
                        return (
                          <div
                            key={`table-edit-col-${key}-${idx}-${idxHeader}`}
                            id={`table-edit-col-${key}-${idx}-${idxHeader}`}
                            className={`table-edit-col ${key}`}
                          >
                            <p>{`${key.toUpperCase()}:`}</p>
                            {key === TABLE_HEADER_KEYS.FILTERVALUES ? (
                              <FilterValues
                                content={header[key]}
                                addNewFilter={addNewFilter(idx)}
                                editFilter={editFilter(idx)}
                                deleteFilter={deleteFilter(idx)}
                              />
                            ) : key === TABLE_HEADER_KEYS.FILTERSTYLE ? (
                              <div
                                className="style-selections"
                                onChange={updateTableHeader(key, idx)}
                              >
                                {_.map(FILTER_STYLES, (style) => {
                                  return (
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <label htmlFor={`${idxHeader}-${style}`}>{style}</label>
                                      <input
                                        type="radio"
                                        name="filter-type-radio"
                                        auria-labelledby={`${idxHeader}-${style}`}
                                        value={style}
                                        id={`${idxHeader}-${style}`}
                                        className="form-check-input"
                                        defaultChecked={
                                          header[key].toString() === style
                                        }
                                      ></input>
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <textarea
                                spellCheck={false}
                                defaultValue={
                                  typeof header[key] === 'object'
                                    ? JSON.stringify(header[key], null, 2)
                                    : header[key].toString()
                                }
                                onBlur={updateTableHeader(key, idx)}
                                onClick={preventDefault}
                                placeholder={PLACEHOLDERS[key.toUpperCase()]}
                              ></textarea>
                            )}
                          </div>
                        )
                      })}
                      <div
                        className="collapse-header"
                        onClick={unsetCurrentColumn}
                      >
                        <p>{`Collapse`}</p>
                      </div>

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
                  dataSource[0] ||
                    `No data retrieved from endpoint. Check the data setup.`,
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
          <EditTableNavbar
            elements={_.values(EDIT_TABLE_SUBTABS)}
            finishEdit={finishEdit}
            selectNewTab={selectNewTab}
            currentSelectedTab={currentSelectedTab}
          />
          <div className="table-editor-component">
            <h4>{`Searchable:`}</h4>
            <div className="table-edit-row searchable">
              <input
                defaultValue={searchable}
                onBlur={updateSearchable}
                placeholder={PLACEHOLDERS.SEARCHABLE}
              ></input>
            </div>
            <hr />
            <div className="table-edit-row data-url">
              <h4>{`Data URL:`}</h4>
              <textarea
                defaultValue={dataUrl}
                onBlur={updateURL}
                placeholder={PLACEHOLDERS.DATA_URL}
              ></textarea>
            </div>
            <hr />
            <div className="table-edit-row pagination">
              <h4>{`Pagination:`}</h4>
              <textarea
                defaultValue={`${JSON.stringify(pagination, undefined, 2)}`}
                onBlur={updatePagination}
                placeholder={PLACEHOLDERS.PAGINATION}
              ></textarea>
            </div>
            <hr />
            <div className="table-edit-row refresh-rate">
              <h4>{`Refresh Rate:`}</h4>
              <textarea
                defaultValue={refreshRate}
                onBlur={updateRefreshRate}
                placeholder={PLACEHOLDERS.REFRESH_RATE}
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
                  dataSource[0] ||
                    `No data retrieved from endpoint. Check the data setup.`,
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
