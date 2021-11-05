/* eslint-disable */

import React, { Component } from 'react'
import _generate from '../functions/index'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'

export default class Table extends Component {
  constructor(props) {
    super(props)

    const filterObj = {}
    this.props.headers.map((header) => {
      const { filterValues, filterStyle } = header

      if (filterValues) {
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
      records: this.props.dataSource,
      search: '',
      sortKey: this.props.defaultSortKey || '',
      sortDir: this.props.defaultSortDir || 1,
      pageRows: this.props.rowSelectOptions
        ? this.props.rowSelectOptions.selected
        : '',
      filters: filterObj,
      rowSelectOptions: this.props.rowSelectOptions,
      currPage: 1,
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
    if (this.props.dataSource !== prevProps.dataSource) {
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
  }

  componentWillUnmount() {}

  checkFilterColumn = (headers, filters, rec) => {
    let add = true

    for (const header of headers) {
      if (filters[header.title].rows && filters[header.title].rows.length > 0) {
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
    const { headers } = this.props

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
              trClass: 'info-row',
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
            trClass: 'info-row',
          })
        }
      }
    })

    return searchedRecords
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
    // const filterIndex = this.props.filters.headers.indexOf(filter);
    // const filterKey = this.props.filters.values[filterIndex];

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

    if (!headerObj) return

    const { format } = headerObj
    const { keys } = headerObj

    for (let i = 0; i < records.length; i += 1) {
      let stringRep = format
      for (const key of keys) {
        stringRep = stringRep.replace(`{${key}}`, records[i][key])
      }
      records[i].sortString = stringRep
    }

    records.sort((a, b) => {
      if (a.sortString > b.sortString) return 1 * sortDirection
      if (a.sortString === b.sortString) {
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

  handleScroll = (event) => {
    if (event.currentTarget.getBoundingClientRect().bottom <= event.currentTarget.parentNode.getBoundingClientRect().bottom)
    this.loadMore()
  }

  loadMore = () => {
  }

  // This will display the table with all records
  render() {
    let { headers } = this.props
    const { searchable } = this.props

    const generatedFilters = []

    Object.keys(this.state.filters).map((key) => {
      const filterObj = this.state.filters[key]
      const filterForDefault = filterObj.rows.filter(
        (filter) => filter.selected,
      )

      if (filterObj.rows && filterObj.rows.length > 0) {
        generatedFilters.push(
          _generate.tableFunctions.initializeTableFilters({
            title: key,
            filterClass: 'table-filters',
            filters: filterObj.rows,
            onChange: this.filterTable,
            defaultValues: filterForDefault,
            filterStyle: filterObj.filterStyle,
          }),
        )
      }
    })

    if (headers) {
      headers = _generate.tableFunctions.initializeTableHeaders(
        'leaderboard-row',
        headers,
        this.sortByKey,
      )
    }

    const footerObj = {
      footerClass: 'table-footer',
      rowClass: 'numrows-select',
      rowOptions: this.state.rowSelectOptions,
      onRowUpdate: this.updateFilter,
      paginationFunc: this.updatePage,
    }

    return (
      <div className="table-container">
        <div className="filter-container">{generatedFilters}</div>
        {searchable ? (
          <div className="search-container">
            <input
              type="text"
              id="table-search"
              onKeyUp={this.updateSearch}
              placeholder="Search Table..."
            />
          </div>
        ) : (
          ''
        )}
        <div className="web-table">
          {_generate.tableFunctions.createTable(
            'table-wrapper',
            'table table-hover',
            headers,
            this.tableList(),
            this.state.search,
            this.state.currPage,
            this.state.pageRows,
            footerObj,
            this.props.lazyLoad,
            this.props.loadNum,
            this.handleScroll
          )}
        </div>
      </div>
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
