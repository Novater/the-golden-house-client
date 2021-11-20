/* eslint-disable */

import React, { Component } from 'react'
import _generate from '../../functions/index'
import TableFilters from './tablefilters'
import PageModal from '../modal'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'
import LoadingSpinner from '../loadingspinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import store from '../../store/store'
import { connect } from 'react-redux'

const POST_CONSTANTS = require('../../constants/postConstants')
const EDIT_CONSTANTS = require('../../constants/editConstants')

class Table extends Component {
  constructor(props) {
    super(props)
    const {
      headers,
      dataSource,
      adminDataSource,
      defaultSortKey,
      defaultSortDir,
      rowSelectOptions,
      editPermission,
    } = this.props

    const filterObj = {}
    headers.map((header) => {
      const { filterValues, filterStyle } = header

      if (filterValues && filterValues.length > 0) {
        if (
          !filterValues.reduce(
            (currVal, filter) => currVal || filter.selected,
            false,
          )
        ) {
          if (filterStyle !== 'checkbox') filterValues[0].selected = true
        }

        filterObj[header.title] = {
          rows: filterValues,
          filterStyle,
        }
      } else {
        filterObj[header.title] = {
          rows: [],
        }
      }
    })

    this.state = {
      records: dataSource,
      search: '',
      sortKey: defaultSortKey || '',
      sortDir: defaultSortDir || 1,
      pageRows: rowSelectOptions ? rowSelectOptions.selected : '',
      filters: filterObj,
      rowSelectOptions: rowSelectOptions,
      currPage: 1,
      loadingContent: false,
      showTableSaveModal: false,
      showTableCancelModal: false,
      approveLineIds: [],
      deleteLineIds: [],
      currIdSelected: '',
      tableSaving: false,
    }
  }

  componentDidMount() {
    if (this.state.records.length > 0) {
      this.sortTable(
        this.state.sortKey,
        this.state.sortDir || 1,
        this.state.records,
        true,
      )
    }
  }

  // This method will get the data from the database
  componentDidUpdate(prevProps) {
    const DATASOURCE_CHANGE = this.props.dataSource !== prevProps.dataSource
    const HEADER_CHANGE = this.props.headers !== prevProps.headers
    const ROWSELECT_CHANGE =
      this.props.rowSelectOptions !== prevProps.rowSelectOptions
    if (DATASOURCE_CHANGE || HEADER_CHANGE) {
      const filterObj = {}
      this.props.headers.map((header) => {
        const { filterValues, filterStyle } = header

        if (filterValues && filterValues.length > 0) {
          if (
            !filterValues.reduce(
              (currVal, filter) => currVal || filter.selected,
              false,
            )
          ) {
            if (filterStyle !== 'checkbox') filterValues[0].selected = true
          }

          filterObj[header.title] = {
            rows: filterValues,
            filterStyle,
          }
        } else {
          filterObj[header.title] = {
            rows: [],
          }
        }
      })
      this.setState({ filters: filterObj, records: [] })
      if (this.state.sortKey) {
        this.sortTable(
          this.state.sortKey,
          this.state.sortDir || 1,
          this.props.dataSource,
          true,
        )
      } else {
        this.setState({
          records: this.props.dataSource,
        })
      }
    }

    if (ROWSELECT_CHANGE) {
      console.log('row select change')
      this.setState({
        rowSelectOptions: this.props.rowSelectOptions,
        pageRows: this.props.rowSelectOptions
          ? this.props.rowSelectOptions.selected
          : '',
      })
    }

    // Update our edit sidebar if the table ever changes
    if (this.props.id === this.props.editorId) {
      store.dispatch({
        type: EDIT_CONSTANTS.UPDATE_SIDEBAR,
        payload: {
          data: {
            row: this.props.row,
            col: this.props.col,
            searchable: this.props.searchable,
            headers: this.props.headers,
            dataUrl: this.props.dataUrl,
            dataSource: this.props.dataSource,
            pagination: this.props.rowSelectOptions,
          },
        },
      })
    }
  }

  componentWillUnmount() {}

  editPost = ({
    row,
    col,
    searchable,
    headers,
    dataUrl,
    dataSource,
    pagination,
  }) => {
    return (event) => {
      store.dispatch({ type: EDIT_CONSTANTS.CLOSE_SIDEBAR })
      store.dispatch({
        type: EDIT_CONSTANTS.TOGGLE_EDIT_SIDEBAR,
        payload: {
          editorId: this.props.id,
          type: 'table',
          data: {
            row,
            col,
            searchable,
            headers,
            dataUrl,
            dataSource,
            pagination,
          },
        },
      })
    }
  }

  deletePost = () => {
    store.dispatch({
      type: POST_CONSTANTS.DELETE_POST,
      payload: {
        row: this.props.row,
        col: this.props.col,
      },
    })
  }

  checkFilterColumn = (headers, filters, rec) => {
    let add = true

    for (const header of headers) {
      if (
        filters[header.title] &&
        filters[header.title].rows &&
        filters[header.title].rows.length > 0
      ) {
        const { format } = header
        const { keys } = header

        let stringRep = format

        for (const key of keys) {
          stringRep = stringRep.replace(`{${key}}`, rec[key])
        }

        const thisFilter = filters[header.title].rows
        const selectedEl = thisFilter.filter((value) => value.selected)

        if (selectedEl.length === 0) continue

        let thisFilterLookupAMatch = false
        selectedEl.map((el) => {
          const { lookFor } = el

          if (stringRep.match(lookFor)) {
            thisFilterLookupAMatch = true
          }
        })

        if (!thisFilterLookupAMatch) {
          add = false
          break
        }
      }
    }

    return add
  }

  tableList = () => {
    const searchedRecords = []
    const { headers, rowClass } = this.props

    if (!this.state.records) return []

    this.state.records.map((thisRec) => {
      if (this.state.search) {
        if (
          JSON.stringify(thisRec)
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) >= 0
        ) {
          const appendRec = this.checkFilterColumn(
            headers,
            this.state.filters,
            thisRec,
          )

          if (appendRec) {
            searchedRecords.push({
              thisRec,
              trClass: rowClass || 'info-row',
            })
          }
        }
      } else {
        const appendRec = this.checkFilterColumn(
          headers,
          this.state.filters,
          thisRec,
        )
        if (appendRec) {
          searchedRecords.push({
            thisRec,
            trClass: rowClass || 'info-row',
          })
        }
      }
    })

    return searchedRecords
  }

  handleCloseCancel = () => {
    this.setState({ showTableCancelModal: false })
  }

  handleCloseSave = () => {
    this.setState({ showTableSaveModal: false })
  }

  onClickCancel = () => {
    this.setState({ showTableCancelModal: true })
  }

  onClickSave = () => {
    this.setState({ showTableSaveModal: true })
  }

  deleteLine = (event) => {
    const buttonId = event.target.id
    const targetId = buttonId.substring(buttonId.indexOf('_') + 1)

    this.setState((prevState) => {
      let copiedApproveLines = [...prevState.approveLineIds]
      let copiedDeleteLines = [...prevState.deleteLineIds]

      if (copiedDeleteLines.indexOf(targetId) >= 0) {
        const newDeleteLines = _.filter(
          copiedDeleteLines,
          (el) => el != targetId,
        )
        return {
          deleteLineIds: newDeleteLines,
          approveLineIds: copiedApproveLines,
        }
      }

      _.remove(copiedDeleteLines, (el) => el == targetId)
      _.remove(copiedApproveLines, (el) => el == targetId)
      return {
        deleteLineIds: [...copiedDeleteLines, targetId],
        approveLineIds: copiedApproveLines,
      }
    })
  }

  approveLine = (event) => {
    const buttonId = event.target.id
    const targetId = buttonId.substring(buttonId.indexOf('_') + 1)
    this.setState((prevState) => {
      let copiedDeleteLines = [...prevState.deleteLineIds]
      let copiedApproveLines = [...prevState.approveLineIds]

      if (copiedApproveLines.indexOf(targetId) >= 0) {
        const newApproveLines = _.filter(
          copiedApproveLines,
          (el) => el != targetId,
        )
        return {
          deleteLineIds: copiedDeleteLines,
          approveLineIds: newApproveLines,
        }
      }

      _.remove(copiedDeleteLines, (el) => el == targetId)
      _.remove(copiedApproveLines, (el) => el == targetId)
      return {
        deleteLineIds: copiedDeleteLines,
        approveLineIds: [...copiedApproveLines, targetId],
      }
    })
  }

  saveTableUpdates = async () => {
    this.setState({ tableSaving: true })
    if (this.props.approveRows) {
      await this.props.approveRows(
        _.filter(
          this.state.records,
          (record) => this.state.approveLineIds.indexOf(record._id) >= 0,
        ),
      )
    }
    if (this.props.deleteRows) {
      await this.props.deleteRows(
        _.filter(
          this.state.records,
          (record) => this.state.deleteLineIds.indexOf(record._id) >= 0,
        ),
      )
    }

    const newRecords = _.filter(this.state.records, (record) => {
      return (
        this.state.approveLineIds.indexOf(record._id) < 0 &&
        this.state.deleteLineIds.indexOf(record._id) < 0
      )
    })

    this.setState({
      approveLineIds: [],
      deleteLineIds: [],
      showTableSaveModal: false,
      tableSaving: false,
      records: newRecords,
    })
  }

  cancelTableUpdates = () => {
    this.setState({
      approveLineIds: [],
      deleteLineIds: [],
      showTableCancelModal: false,
    })
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value, currPage: 1 })
  }

  filterTable = (event) => {
    const filterFrom = event.target.name
    const filterBy = event.target.value
    const filterArr = this.state.filters[filterFrom].rows.map((filterEl) => {
      const { filterStyle } = this.state.filters[filterFrom]

      if (filterEl.title === filterBy) {
        const thisEl =
          filterStyle === 'checkbox'
            ? { ...filterEl, selected: event.target.checked }
            : { ...filterEl, selected: true }
        return thisEl
      }
      const thisEl =
        filterStyle === 'checkbox' ? filterEl : { ...filterEl, selected: false }
      return thisEl
    })

    const copiedFilters = { ...this.state.filters }
    copiedFilters[filterFrom].rows = filterArr

    this.setState({
      filters: copiedFilters,
      currPage: 1,
    })

    this.sortTable(
      this.props.defaultSortKey,
      this.props.defaultSortDir,
      [...this.state.records],
      true,
      copiedFilters,
    )
  }

  updateFilter = (event) => {
    this.setState({
      pageRows: event.target.value,
      currPage: 1,
      rowSelectOptions: {
        ...this.state.rowSelectOptions,
        selected: event.target.value,
      },
    })
  }

  sortByKey = (event) => {
    const headerName = event.target.getAttribute('name')

    if (this.state.sortKey === headerName) {
      this.sortTable(headerName, this.state.sortDir * -1, [
        ...this.state.records,
      ])
    } else {
      this.sortTable(headerName, 1, [...this.state.records])
    }
  }

  sortTable = (
    sortKey,
    sortDirection,
    records = [],
    ranking = false,
    filters = null,
  ) => {
    let headerObj
    const { headers } = this.props

    for (let i = 0; i < headers.length; i += 1) {
      if (headers[i].title === sortKey) headerObj = headers[i]
    }

    if (!headerObj) {
      this.setState({
        records,
      })
      return
    }

    const { format } = headerObj
    const { keys } = headerObj

    for (let i = 0; i < records.length; i += 1) {
      let stringRep = format
      for (const key of keys) {
        stringRep = stringRep.replace(`{${key}}`, records[i][key])
      }
      records[i].sortVal = isNaN(stringRep) ? stringRep : Number(stringRep)
    }

    records.sort((a, b) => {
      if (!isNaN(b.sortVal) || !isNaN(a.sortVal)) {
        if (isNaN(a.sortVal)) return -1 * sortDirection
        if (isNaN(b.sortVal)) return 1 * sortDirection

        if (a.sortVal === b.sortVal) {
          if (a.rank > b.rank) return 1 * sortDirection
          return 0
        }
        return (b.sortVal - a.sortVal) * sortDirection
      }

      if (a.sortVal > b.sortVal) return 1 * sortDirection
      if (a.sortVal === b.sortVal) {
        if (a.rank > b.rank) return 1
        return 0
      }
      return -1 * sortDirection
    })

    if (ranking) {
      let rank = 1
      records.map((record) => {
        const appendRec = this.checkFilterColumn(
          this.props.headers,
          filters || this.state.filters,
          record,
        )
        if (appendRec) {
          record.rank = rank++
        }
      })
    }

    this.setState({
      records,
      sortDir: sortDirection,
      sortKey,
    })
  }

  updatePage = (event) => {
    const pageNum = event.target.name

    if (pageNum.toLowerCase() === 'previous') {
      if (this.state.currPage > 1)
        this.setState({ currPage: --this.state.currPage })
    } else if (pageNum.toLowerCase() === 'next') {
      this.setState({ currPage: ++this.state.currPage })
    } else {
      this.setState({
        currPage: event.target.name,
      })
    }
  }

  async handleScroll(event) {
    if (
      event.currentTarget.getBoundingClientRect().bottom <=
        event.currentTarget.parentNode.getBoundingClientRect().bottom &&
      !this.state.loadingContent &&
      this.props.lazyLoadFn
    ) {
      this.setState({ loadingContent: true })
      const newData = await this.props.lazyLoadFn()
      this.setState({
        records: [...this.state.records].concat(newData),
      })
      // if (this.state.sortKey) {
      //   this.sortTable(
      //     this.state.sortKey,
      //     this.state.sortDir || 1,
      //     [...this.state.records].concat(newData),
      //     true,
      //   )
      // } else {
      //   this.setState({
      //     records: [...this.state.records].concat(newData),
      //   })
      // }
      this.setState({ loadingContent: false })
    }
  }

  // This will display the table with all records
  render() {
    let {
      searchable,
      deleteButtonClass,
      approveButtonClass,
      lazyLoadFn,
      approveRows,
      deleteRows,
      editPermission,
      adminPermission,
      footerClass,
      containerClass,
      tableClass,
      headerClass,
      filterContainerClass,
      filterClass,
      searchContainerClass,
      searchClass,
      headers,
      row,
      col,
      dataUrl,
      dataSource,
      showSideBar,
      editorId,
      id,
    } = this.props
    let {
      filters,
      rowSelectOptions,
      search,
      currPage,
      pageRows,
      loadingContent,
      showTableSaveModal,
      showTableCancelModal,
      approveLineIds,
      deleteLineIds,
      tableSaving,
    } = this.state

    const generatedFilters = []

    Object.keys(filters).map((key) => {
      const filterObj = filters[key]
      const filterForDefault = filterObj.rows.filter(
        (filter) => filter.selected,
      )

      if (filterObj.rows && filterObj.rows.length > 0) {
        generatedFilters.push(
          <TableFilters
            title={key}
            key={`filter-${key}`}
            id={`filter-${key}`}
            filterClass={filterClass || 'table-filters'}
            filters={filterObj.rows}
            onChange={this.filterTable}
            defaultValues={filterForDefault}
            filterStyle={filterObj.filterStyle}
          />,
        )
      }
    })

    if (headers) {
      headers = _generate.tableFunctions.initializeTableHeaders(
        headerClass || 'table-header-row',
        headers,
        this.sortByKey,
      )
    }

    const footerObj = !lazyLoadFn
      ? {
          footerClass: footerClass || 'table-footer',
          rowClass: 'numrows-select',
          rowOptions: rowSelectOptions,
          onRowUpdate: this.updateFilter,
          paginationFunc: this.updatePage,
        }
      : {}

    return (
      <>
        <div className={containerClass || 'table-container'}>
          {adminPermission && editorId !== id ? (
            <div className="edit">
              <FontAwesomeIcon
                icon={faPen}
                onClick={this.editPost({
                  row,
                  col,
                  searchable,
                  headers: this.props.headers,
                  dataUrl,
                  dataSource,
                  pagination: rowSelectOptions,
                })}
              />
              <FontAwesomeIcon icon={faTrash} onClick={this.deletePost} />
            </div>
          ) : null}
          <div className={filterContainerClass || 'filter-container'}>
            {generatedFilters}
          </div>
          {searchable ? (
            <div className={searchContainerClass || 'search-container'}>
              <input
                type="text"
                id="table-search"
                onKeyUp={this.updateSearch}
                placeholder="Search Table..."
                className={searchClass}
              />
            </div>
          ) : (
            ''
          )}
          {tableSaving ? (
            <LoadingSpinner />
          ) : (
            <div className={tableClass || 'web-table'}>
              {_generate.tableFunctions.createTable(
                'table-wrapper',
                'table table-hover',
                headers,
                this.tableList(),
                editPermission,
                search,
                currPage,
                !lazyLoadFn ? pageRows : null,
                footerObj,
                this.handleScroll.bind(this),
                loadingContent,
                deleteButtonClass,
                approveButtonClass,
                deleteRows ? this.deleteLine : null,
                approveRows ? this.approveLine : null,
                deleteRows ? deleteLineIds : [],
                approveRows ? approveLineIds : [],
                this.onClickSave,
                this.onClickCancel,
              )}
            </div>
          )}

          {approveRows ? (
            <PageModal
              title={'Save Updates'}
              content={'Are you sure you want to save these updates?'}
              showState={showTableSaveModal}
              saveFunc={this.saveTableUpdates}
              closeFunc={this.handleCloseSave}
            />
          ) : null}
          <PageModal
            title={'Cancel Updates'}
            content={'Cancel your updates?'}
            showState={showTableCancelModal}
            saveFunc={this.cancelTableUpdates}
            closeFunc={this.handleCloseCancel}
          />
        </div>
      </>
    )
  }
}

Table.propTypes = {
  dataSource: PropTypes.array,
  headers: PropTypes.array.isRequired,
  defaultSortKey: PropTypes.string,
  defaultSortDir: PropTypes.number,
  rowSelectOptions: PropTypes.object.isRequired,
}

const mapState = (state) => ({
  showSideBar: state.edit.showSideBar,
  editorId: state.edit.editorId,
})

export default connect(mapState)(Table)
