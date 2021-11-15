/* eslint-disable */

import React from 'react'
import _generate from '../functions/index'
import axios from 'axios'
import _ from 'lodash'
import LoadingSpinner from '../components/loadingspinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
const config = require('../config/index')
axios.defaults.withCredentials = true

export default class tableFunctions {
  static async getTableConfigs(tableName) {
    if (!tableName) {
      return {
        rowSelectOptions: '',
        headers: '',
        dataSource: '',
      }
    }

    const SERVER_URL = _generate.serverFunctions.getServerURL()
    const tableConfig = await axios.get(`${SERVER_URL}/table/${tableName}`)
    const { rowSelectOptions, headers } = tableConfig.data

    return {
      rowSelectOptions: JSON.parse(rowSelectOptions),
      headers: JSON.parse(headers),
    }
  }
  /**
   *
   * @param {*} param0
   * @param  {...any} keys
   * @returns
   */
  static createHeaderDataMapping({ title, format, keys }) {
    return {
      title,
      format,
      keys,
    }
  }

  /**
   * DEPRECATED
   * @param {*} param0
   * @returns
   */
  /**
   * @param {*} filterClass
   * @param {*} filters
   * @param {*} onClick
   * @returns Filters JSX
   */
  // static initializeTableFilters({
  //   title,
  //   filterClass,
  //   filters,
  //   onChange,
  //   defaultValues,
  //   filterStyle,
  // }) {
  //   if (filterStyle === 'checkbox') {
  //     return (
  //       <div className={filterClass}>
  //         <p style={{ width: '100%' }}>{`${title}: `}</p>
  //         {filters.map((el, idx) => (
  //           <div
  //             className="checkbox-filter"
  //             key={`${el.title}-${idx}`}
  //             id={`${el.title}-${idx}`}
  //           >
  //             <input
  //               className="form-check-input filter-checkbox"
  //               type="checkbox"
  //               name={title}
  //               value={el.title}
  //               id={`filter-${el.title}`}
  //               onChange={onChange}
  //               checked={!!el.selected}
  //             />
  //             <label
  //               className="form-check-label filter-label"
  //               for={`filter-${el.title}`}
  //             >
  //               {el.title}
  //             </label>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   }

  //   return (
  //     <div className={filterClass}>
  //       <p style={{ width: '100%' }}>{`${title}: `}</p>
  //       <select
  //         className="form-select"
  //         name={title}
  //         onChange={onChange}
  //         defaultValue={defaultValues[0].title}
  //         id={`${el.title}-${idx}`}
  //         key={`${el.title}-${idx}`}
  //       >
  //         {filters.map((el, idx) => (
  //           <option>{el.title}</option>
  //         ))}
  //       </select>
  //     </div>
  //   )
  // }

  /**
   * @param {*} headerClass
   * @param {*} headers
   * @param {*} onClick
   * @returns Headers object to pass into createTable
   */
  static initializeTableHeaders(headerClass, headers, onClick) {
    return {
      className: headerClass,
      headers,
      onClick,
    }
  }

  /**
   * @param {*} tableClassName
   * @param {*} headers
   * @param {*} rows
   * @param {*} search
   * @description The columns of the table are defined by the headers
   * @returns Table JSX
   */
  static createTable(
    wrapperClassName,
    tableClassName,
    headers,
    rows,
    hasEditPermission,
    search,
    currPage,
    rowFilter,
    footerObj,
    handleScroll,
    loadingContent,
    deleteButtonClass,
    approveButtonClass,
    deleteOnClick,
    approveOnClick,
    deleteLineIds,
    approveLineIds,
    onClickSave,
    onClickCancel,
  ) {
    function initializeTableFooters({
      footerClass,
      rowOptions,
      rowClass,
      onRowUpdate,
      paginationClass,
      paginationValues,
      paginationFunc,
      numRows,
    }) {
      const rowOptionEls = []
      const paginationEls = []

      if (rowOptions) {
        for (const rowOption of rowOptions.rows) {
          rowOptionEls.push(
            <option key={`${rowOption}-pagesize`} id={`${rowOption}-pagesize`}>
              {rowOption}
            </option>,
          )
        }
        const numPages = rowOptions.selected
          ? Math.ceil(numRows / rowOptions.selected)
          : 1
        if (numPages > 1) {
          if (currPage > 1) {
            paginationEls.push(
              <li className="page-item" key="page-1">
                <a className="page-link" name={1} onClick={paginationFunc}>
                  &lt;&lt;
                </a>
              </li>,
            )
            paginationEls.push(
              <li className="page-item" key="page-prev">
                <a
                  className="page-link"
                  name="Previous"
                  onClick={paginationFunc}
                >
                  &lt;
                </a>
              </li>,
            )
          }

          for (let i = 0; i < numPages; i += 1) {
            if (i + 1 == currPage) {
              paginationEls.push(
                <li className="page-item focused" key={`page-focus-${i + 1}`}>
                  <a
                    className="page-link"
                    name={i + 1}
                    onClick={paginationFunc}
                  >
                    {i + 1}
                  </a>
                </li>,
              )
            } else {
              paginationEls.push(
                <li className="page-item" key={`page-${i + 1}`}>
                  <a
                    className="page-link"
                    name={i + 1}
                    onClick={paginationFunc}
                  >
                    {i + 1}
                  </a>
                </li>,
              )
            }
          }
          if (currPage < numPages) {
            paginationEls.push(
              <li className="page-item" key={`page-next`}>
                <a className="page-link" name="Next" onClick={paginationFunc}>
                  &gt;
                </a>
              </li>,
            )
            paginationEls.push(
              <li className="page-item" key={`page-last`}>
                <a
                  className="page-link"
                  name={numPages}
                  onClick={paginationFunc}
                >
                  &gt;&gt;
                </a>
              </li>,
            )
          }
        }
      }

      return (
        <div className={footerClass}>
          {rowOptions ? (
            <div className={rowClass}>
              <p>Rows Displayed: </p>
              <select
                className="form-select"
                onChange={onRowUpdate}
                defaultValue={rowOptions.selected}
              >
                {rowOptionEls}
              </select>
            </div>
          ) : null}

          <nav aria-label="Page navigation example">
            <ul className="pagination">{paginationEls}</ul>
          </nav>
        </div>
      )
    }

    const tableBuildRows = []

    function TableEntry(props) {
      const { record } = props
      const headerKeyFormats = headers.headers
      const deletedClass =
        deleteLineIds.indexOf(props.record._id) >= 0 ? 'deleted-el' : ''
      const approvedClass =
        approveLineIds.indexOf(props.record._id) >= 0 ? 'approved-el' : ''
      const rowClasses = [props.className, deletedClass, approvedClass].join(
        ' ',
      )
      return (
        <tr key={record._id} id={record._id} className={rowClasses}>
          {hasEditPermission && approveOnClick ? (
            <td key={`a_${record._id}`}>
              <button
                className={approveButtonClass || 'approve-button'}
                type="button"
                id={`a_${record._id}`}
                onClick={approveOnClick}
              >
                {approvedClass ? '\u2015' : '✓'}
              </button>
            </td>
          ) : null}
          {hasEditPermission && deleteOnClick ? (
            <td key={`d_${record._id}`}>
              <button
                className={deleteButtonClass || 'delete-button'}
                type="button"
                id={`d_${record._id}`}
                onClick={deleteOnClick}
              >
                {deletedClass ? '\u2015' : 'X'}
              </button>
            </td>
          ) : null}
          {headerKeyFormats.map((header) => {
            if (header.title === 'Rank') {
              return (
                <td key={`rank-${record.rank}`}>
                  <div
                    key={`${header.title}-${record._id}`}
                    className="rank-col"
                    id={`rank-${record.rank}`}
                  >
                    {record.rank}
                  </div>
                </td>
              )
            }

            let { format } = header
            const { keys } = header

            for (const key of keys) {
              format = format.replace(`{${key}}`, record[key] || '')
            }

            return (
              <td
                key={`${header.title}-${record._id}`}
                dangerouslySetInnerHTML={{
                  __html: _generate.cleanHTML.clean(
                    format.toString(),
                    config.allowedTags,
                    config.allowedAttr,
                  ),
                }}
              ></td>
            )
          })}
        </tr>
      )
    }

    const maxRows = rows.length
    rows = rows.slice((currPage - 1) * rowFilter)
    let currRow = (currPage - 1) * rowFilter
    let numRows = 0

    while (
      (numRows < rowFilter || !footerObj.rowOptions) &&
      currRow < maxRows
    ) {
      const row = rows[numRows]
      numRows += 1
      currRow += 1
      tableBuildRows.push(
        <TableEntry
          className={row.trClass}
          record={row.thisRec}
          key={row.thisRec._id}
          id={row.thisRec._id}
        />,
      )
    }

    const footer = initializeTableFooters({
      footerClass: footerObj.footerClass,
      rowOptions: footerObj.rowOptions,
      rowClass: footerObj.rowClass,
      onRowUpdate: footerObj.onRowUpdate,
      paginationClass: footerObj.paginationClass,
      paginationValues: footerObj.paginationValues,
      paginationFunc: footerObj.paginationFunc,
      numRows: maxRows,
    })

    console.log('headers', headers)
    return (
      <div className={wrapperClassName}>
        <div className={tableClassName}>
          {headers ? (
            <table className={tableClassName} onWheel={handleScroll}>
              <thead>
                <tr className={headers.className} onClick={headers.onClick}>
                  {hasEditPermission && approveOnClick ? (
                    <th name="Approve">Approve</th>
                  ) : null}
                  {hasEditPermission && deleteOnClick ? (
                    <th name="Delete">Delete</th>
                  ) : null}
                  {headers.headers.map((header, idx) => (
                    <th
                      name={header.title}
                      key={`${header.title}-${idx}`}
                      id={`${header.title}-${idx}`}
                    >
                      {header.title}
                      {/* <div>
                        <FontAwesomeIcon
                          title="Toggle Sort Up"
                          icon={faSortUp}
                        />
                        <FontAwesomeIcon
                          title="Toggle Sort Down"
                          icon={faSortDown}
                        />
                      </div> */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{tableBuildRows}</tbody>
            </table>
          ) : null}
        </div>
        {hasEditPermission ? (
          <div className="admin-editing">
            <button
              type="button"
              className="save-button"
              name="Save"
              onClick={onClickSave}
            >
              Save
            </button>
            <button
              type="button"
              className="save-button"
              name="Cancel"
              onClick={onClickCancel}
            >
              Cancel
            </button>
          </div>
        ) : null}
        {loadingContent ? <LoadingSpinner className="table-spinner" /> : null}
        {headers.headers.length > 0 ? footer : null}
      </div>
    )
  }
}
