import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'
import _generate from '../functions/index'
import NewPost from '../components/newpostbutton'
import LoadingSpinner from '../components/loadingspinner'
import SampleDataGenerator from '../config/sampleData'
import { connect } from 'react-redux'
import store from '../store/store'
import _ from 'lodash'

const Table = React.lazy(() => import('../components/table/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))
const EDIT_CONSTANTS = require('../constants/editConstants')
axios.defaults.withCredentials = true
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
  editorId,
}) {
  const [records, setTableRecords] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [permissionList, setPermissionList] = useState(
    SampleDataGenerator.samplePermissions(),
  )

  const CONTENT_TYPES = SampleDataGenerator.sampleContentTypes()
  const buttonClasses = {
    deleteButtonClass: 'table-delete',
    approveButtonClass: 'table-approve',
    editButtonClass: 'table-edit',
  }

  function findArrayInObject(obj) {
    let stack = [obj]

    while (stack.length > 0) {
      const currObj = stack.shift()
      const keysInObj = _.keys(currObj)
      for (let i = 0; i < keysInObj.length; i += 1) {
        const key = keysInObj[i]
        if (_.isArray(currObj[key])) {
          return currObj[key]
        }
        stack.push(currObj[key])
      }
    }

    return []
  }

  function fetchContent({ useCache }) {
    return async () => {
      setLoading(true)
      try {
        switch (type) {
          case CONTENT_TYPES.TABLE: {
            const SERVER_URL = _generate.serverFunctions.getServerURL()

            let loadedData = []
            if (
              window.sessionStorage.getItem(data.dataSource) &&
              !isLoggedIn &&
              useCache
            ) {
              setTableRecords(
                JSON.parse(window.sessionStorage.getItem(data.dataSource)),
              )
            } else {
              const encodedURI = encodeURIComponent(data.dataSource)
              const dataSource = await axios.get(
                `${SERVER_URL}/api/${encodedURI}`,
              )
              loadedData = findArrayInObject(dataSource)
              if (loadedData.length > 0) {
                setTableRecords(loadedData)
                window.sessionStorage.setItem(
                  data.dataSource,
                  JSON.stringify(loadedData),
                )
                store.dispatch({
                  type: EDIT_CONSTANTS.UPDATE_SIDEBAR,
                  payload: {
                    data: {
                      row,
                      col,
                      searchable: data.searchable,
                      headers: data.headers,
                      dataUrl: data.dataSource,
                      dataSource: loadedData || [],
                      pagination: data.rowSelectOptions,
                    },
                  },
                })
              }
            }
          }
          case CONTENT_TYPES.POST:
          default:
            break
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setTableRecords([])
      }
    }
  }

  useEffect(() => {
    // Memory leak??
    if (data.dataSource) {
      fetchContent({ useCache: true })()
    }
  }, [data.dataSource])

  useEffect(() => {
    const refetchContent = setInterval(() => {
      if (data.dataSource && data.refreshRate && !isLoggedIn) {
        fetchContent({ useCache: false })()
      }
    }, data.refreshRate)

    return () => clearInterval(refetchContent)
  }, [])

  function createNewPost(event) {
    // CLOSE EDIT SIDEBAR
    store.dispatch({ type: EDIT_CONSTANTS.CLOSE_SIDEBAR })
    const direction = event.target.id.split('-')[0]
    const DIRECTION_MAP = {
      up: {
        row: row,
        col: 0,
        newRow: true,
      },
      down: {
        row: row + 1,
        col: 0,
        newRow: true,
      },
      left: {
        row: row,
        col: col,
      },
      right: {
        row: row,
        col: col + 1,
      },
    }
    store.dispatch({
      type: EDIT_CONSTANTS.TOGGLE_EDIT_SIDEBAR,
      payload: {
        editorId: `${data._id}-${direction}`,
        type: 'new-content',
        data: {
          direction: DIRECTION_MAP[direction],
          tab,
        },
      },
    })
  }

  async function lazyLoadTable() {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    let data = []
    if (this.props.dataSource) {
      const dataSource = await axios.get(`${this.props.dataSource}`)
      data = dataSource.data
    }
    return data
  }

  function handleDeleteRows(records) {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios.post(`${SERVER_URL}${this.props.dataSource}/delete`, {
      records: records,
    })
  }

  function handleApproveRows(records) {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    debugger
    axios.post(`${SERVER_URL}${this.props.dataSource}/approve`, {
      records: records,
    })
  }

  const showAddPost = inEditMode && !editorId

  switch (type) {
    case CONTENT_TYPES.POST:
      return (
        <div className="page-post">
          {showAddPost ? (
            <>
              <NewPost direction="up" id={data._id} onClick={createNewPost} />
              <NewPost direction="down" id={data._id} onClick={createNewPost} />
              <NewPost direction="left" id={data._id} onClick={createNewPost} />
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
              permissionList.post.indexOf(role) >= 0 && isLoggedIn && inEditMode
            }
            isLoading={isLoading}
          />
        </div>
      )
    case CONTENT_TYPES.TABLE:
      if (data.headers) {
        return (
          <div className="page-post">
            {showAddPost ? (
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
              key={`${data._id}-datatable`}
              id={`${data._id}-datatable`}
              defaultSortKey="Time"
              defaultSortDir={1}
              headers={data.headers}
              searchable={!!data.searchable}
              dataSource={records || []}
              dataUrl={data.dataSource}
              rowSelectOptions={data.rowSelectOptions}
              approveButtonClass={buttonClasses.approveButtonClass}
              approveRows={handleApproveRows}
              editPermission={false}
              adminPermission={
                permissionList.table.indexOf(role) >= 0 &&
                isLoggedIn &&
                inEditMode
              }
              isLoading={isLoading}
              refreshRate={data.refreshRate}
              // SAMPLE DATA CONFIG
              deleteButtonClass={buttonClasses.deleteButtonClass}
              deleteRows={handleDeleteRows}
              // headers={SampleDataGenerator.sampleTableHeader()}
              // dataSource={SampleDataGenerator.sampleTableData()}
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
    case CONTENT_TYPES.PLACEHOLDER:
      return (
        <Suspense key={`loading-${data._id}`} fallback={<LoadingSpinner />}>
          <div className="page-post">
            {inEditMode ? (
              <>
                <NewPost
                  direction="down"
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
              isDummy={true}
            />
          </div>
        </Suspense>
      )
    default:
      return null
  }
}

const mapState = (state) => ({
  isLoggedIn: state.auth.loggedIn,
  inEditMode: state.edit.inEditMode,
  tab: state.post.tab,
  editorId: state.edit.editorId,
})

export default connect(mapState)(PageSection)
