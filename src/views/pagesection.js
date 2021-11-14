import axios from 'axios'
import React, { Component, Suspense, useEffect, useState } from 'react'
import _generate from '../functions/index'
import NewPost from '../components/newpostbutton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from '../components/loadingspinner'
import SampleDataGenerator from '../config/sampleData'
import { connect } from 'react-redux'
import store from '../store/store'

const Table = React.lazy(() => import('../components/table/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))
const POST_CONSTANTS = require('../constants/postConstants')

// TODO: PERMISSIONS
// ADDING TABLE/OTHER CONTENT TYPES
// TABLE FUNCTIONS

function PageSection({
  type,
  data,
  role,
  row,
  col,
  tab,
  isLoggedIn,
  inEditMode,
}) {
  const [records, setTableRecords] = useState(null)
  const [permissionList, setPermissionList] = useState(
    SampleDataGenerator.samplePermissions(),
  )

  const CONTENT_TYPES = SampleDataGenerator.sampleContentTypes()
  const buttonClasses = {
    deleteButtonClass: 'table-delete',
    approveButtonClass: 'table-approve',
    editButtonClass: 'table-edit',
  }

  useEffect(() => {
    if (data.dataSource) {
      ;(async () => {
        // let SERVER_URL = _generate.serverFunctions.getServerURL()
        switch (type) {
          case CONTENT_TYPES.TABLE: {
            console.log(data.dataSource)
            const dataSource = await axios.get(`${data.dataSource}`)
            data = dataSource.data
            setTableRecords(data)
          }
          case CONTENT_TYPES.POST:
          default:
            break
        }
      })()
    }
  }, [data])

  function createNewPost(event) {
    const direction = event.target.id.split('-')[0]
    const newPost = {
      tite: 'Enter title here.',
      content: 'Enter content here.',
      row: 0,
      col: 0,
      tabname: tab,
      type: 'post',
    }
    switch (direction) {
      case 'up': {
        newPost.row = row
        newPost.col = 0
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: row,
            newRow: true,
            post: newPost,
          },
        })
      }
      case 'down': {
        newPost.row = row + 1
        newPost.col = 0
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: row + 1,
            newRow: true,
            post: newPost,
          },
        })
      }
      case 'left': {
        newPost.row = row
        newPost.col = col
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: row,
            col: col,
            post: newPost,
          },
        })
      }
      case 'right': {
        newPost.row = row
        newPost.col = col + 1
        return store.dispatch({
          type: POST_CONSTANTS.INSERT_POST,
          payload: {
            row: row,
            col: col + 1,
            post: newPost,
          },
        })
      }
      default:
        break
    }
  }

  async function lazyLoadTable() {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    let data = []
    if (this.props.dataSource) {
      const dataSource = await axios.get(
        `${this.props.dataSource}`,
      )
      data = dataSource.data
    }
    return data
  }

  function handleDeleteRows(records) {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios.post(`${SERVER_URL}${data.dataSource}/delete`, {
      records: records,
    })
  }

  function handleApproveRows(records) {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios.post(`${SERVER_URL}${data.dataSource}/approve`, {
      records: records,
    })
  }

  switch (type) {
    case CONTENT_TYPES.POST:
      return (
        <Suspense key={`loading-${data._id}`} fallback={<LoadingSpinner />}>
          <div className="page-post">
            {inEditMode ? (
              <>
                <NewPost direction="up" id={data._id} onClick={createNewPost} />
                <NewPost
                  direction="down"
                  id={data._id}
                  onClick={createNewPost}
                />
                <NewPost
                  direction="left"
                  id={data._id}
                  onClick={createNewPost}
                />
                <NewPost
                  direction="right"
                  id={data._id}
                  onClick={createNewPost}
                />
              </>
            ) : null}
            <BlogSection
              title={data.title}
              content={data.content}
              key={data._id}
              id={data._id}
              row={row}
              col={col}
              editPermission={
                permissionList.post.indexOf(role) >= 0 &&
                isLoggedIn &&
                inEditMode
              }
            />
          </div>
        </Suspense>
      )
    case CONTENT_TYPES.TABLE:
      if (data.headers) {
        return (
          <div className="page-post">
            {inEditMode ? (
              <>
                <NewPost direction="up" id={data._id} onClick={createNewPost} />
                <NewPost
                  direction="down"
                  id={data._id}
                  onClick={createNewPost}
                />
                <NewPost
                  direction="left"
                  id={data._id}
                  onClick={createNewPost}
                />
                <NewPost
                  direction="right"
                  id={data._id}
                  onClick={createNewPost}
                />
              </>
            ) : null}
            <Table
              row={row}
              col={col}
              key={`${data.tablename}-datatable`}
              defaultSortKey="Time"
              defaultSortDir={1}
              headers={data.headers}
              searchable={!!data.searchable}
              dataSource={records || []}
              dataUrl={data.dataSource}
              rowSelectOptions={JSON.parse(data.rowSelectOptions)}
              // SAMPLE DATA CONFIG
              // headers={SampleDataGenerator.sampleTableHeader()}
              // dataSource={SampleDataGenerator.sampleTableData()}
              approveButtonClass={buttonClasses.approveButtonClass}
              approveRows={handleApproveRows}
              // deleteButtonClass={buttonClasses.deleteButtonClass}
              // deleteRows={handleDeleteRows}
              editPermission={false}
              adminPermission={
                permissionList.table.indexOf(role) >= 0 &&
                isLoggedIn &&
                inEditMode
              }
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
          </div>
        )
      } else {
        return null
      }

    default:
      return null
  }
}

const mapState = (state) => ({
  isLoggedIn: state.auth.loggedIn,
  inEditMode: state.edit.inEditMode,
  tab: state.post.tab,
})

export default connect(mapState)(PageSection)
