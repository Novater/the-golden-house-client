import axios from 'axios'
import React, { Component, Suspense, useEffect, useState } from 'react'
import _generate from '../functions/index'
import Backdrop from '../components/backdrop'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingSpinner from '../components/loadingspinner'
import SampleDataGenerator from '../config/sampleData'
import { connect } from 'react-redux'
import { loadPosts, savePosts } from '../store/reducers/postSlice'
import store from '../store/store'

const Table = React.lazy(() => import('../components/table/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))

export default function PageSection({ type, data, role, row, col }) {
  const [tableHeaders, setTableHeaders] = useState(SampleDataGenerator.sampleTableHeader())
  const [records, setTableRecords] = useState(SampleDataGenerator.sampleTableData())
  const [rowSelectOptions, setRowSelectOptions] = useState(null)

  const CONTENT_TYPES = SampleDataGenerator.sampleContentTypes()
  const buttonClasses = {
    deleteButtonClass: 'table-delete',
    approveButtonClass: 'table-approve',
    editButtonClass: 'table-edit',
  }

  useEffect(() => {
    switch (type) {
      case CONTENT_TYPES.TABLE:

      case CONTENT_TYPES.POST:
      default:
        break
    }
  })

  switch (type) {
    case CONTENT_TYPES.POST:
      return (
        <Suspense key={`loading-${data._id}`} fallback={<LoadingSpinner />}>
          <BlogSection
            title={data.title}
            content={data.content}
            key={data._id}
            id={data._id}
            row={row}
            col={col}
          />
        </Suspense>
      )
    case CONTENT_TYPES.TABLE:
      if (tableHeaders) {
        return (
          <Table
            key={`${data.tablename}-datatable`}
            defaultSortKey="Time"
            defaultSortDir={1}
            headers={tableHeaders}
            searchable={data.searchable}
            dataSource={records}
            rowSelectOptions={rowSelectOptions}
            editTablePermission={true}

            // SAMPLE DATA CONFIG
            // headers={SampleDataGenerator.sampleTableHeader()}
            // dataSource={SampleDataGenerator.sampleTableData()}
            // approveButtonClass={buttonClasses.approveButtonClass}
            // approveRows={this.handleApproveRows}
            // deleteButtonClass={buttonClasses.deleteButtonClass}
            // deleteRows={this.handleDeleteRows}
            // rowClass='test-row-class'
            // filterContainerClass='test-filter-container-class'
            // filterClass='test-filter'
            // headerClass='test-header'
            // lazyLoadFn={this.lazyLoadTable.bind(this)}
            // containerClass="table-container"
            // tableClass="web-table"
            // filterContainerClass="filter-container"
            // searchContainerClass="search-container"
            // headerClass="leaderboard-row"
            // footerClass="table-footer"
          />
        )
      } else {
        return null
      }

    default:
      return null
  }
}
