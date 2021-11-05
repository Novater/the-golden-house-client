/* eslint-disable */

import React from 'react'
import _generate from '../functions/index'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
const config = require('../config/index')

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
    const { _id, rowSelectOptions, headers } = tableConfig.data

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
   * @param {*} filterClass
   * @param {*} filters
   * @param {*} onClick
   * @returns Filters JSX
   */
  static initializeTableFilters({
    title,
    filterClass,
    filters,
    onChange,
    defaultValues,
    filterStyle,
  }) {
    if (filterStyle === 'checkbox') {
      return (
        <div className={filterClass}>
          <p style={{ width: '100%' }}>{`${title}: `}</p>
          {filters.map((el, idx) => (
            <div className="checkbox-filter">
              <input
                className="form-check-input filter-checkbox"
                type="checkbox"
                name={title}
                value={el.title}
                id="filterCheckbox"
                onChange={onChange}
                checked={!!el.selected}
              />
              <label
                className="form-check-label filter-label"
                htmlFor="filterCheckbox"
              >
                {el.title}
              </label>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className={filterClass}>
        <p style={{ width: '100%' }}>{`${title}: `}</p>
        <select
          className="form-select"
          name={title}
          onChange={onChange}
          defaultValue={defaultValues[0].title}
        >
          {filters.map((el) => (
            <option>{el.title}</option>
          ))}
        </select>
      </div>
    )
  }

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
    search,
    currPage,
    rowFilter,
    footerObj,
    lazyLoad,
    loadNum,
    handleScroll,
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
          rowOptionEls.push(<option>{rowOption}</option>)
        }
        const numPages = rowOptions.selected
          ? Math.ceil(numRows / rowOptions.selected)
          : 1
        if (numPages > 1) {
          if (currPage > 1) {
            paginationEls.push(
              <li className="page-item">
                <a className="page-link" name={1} onClick={paginationFunc}>
                  &lt;&lt;
                </a>
              </li>,
            )
            paginationEls.push(
              <li className="page-item">
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
                <li className="page-item focused">
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
                <li className="page-item">
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
              <li className="page-item">
                <a className="page-link" name="Next" onClick={paginationFunc}>
                  &gt;
                </a>
              </li>,
            )
            paginationEls.push(
              <li className="page-item">
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

      return (
        <tr key={record._id} className={props.className || ''}>
          {headerKeyFormats.map((header) => {
            if (header.title === 'Rank') {
              return (
                <td>
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

    while ((numRows < rowFilter || !footerObj.rowOptions) && currRow < maxRows) {
      const row = rows[numRows]
      numRows += 1
      currRow += 1

      tableBuildRows.push(
        <TableEntry
          className={row.trClass}
          record={row.thisRec}
          key={row.thisRec._id}
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

    return (
      <div className={wrapperClassName}>
        <div className={tableClassName}>
          {headers ? (
            <table className={tableClassName} onWheel={handleScroll}>
              <thead>
                <tr className={headers.className} onClick={headers.onClick}>
                  {headers.headers.map((header) => (
                    <th name={header.title}>
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
        {footer}
      </div>
    )
  }
}
