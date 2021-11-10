/* eslint-disable */

import axios from 'axios'
import React, { Component, Suspense } from 'react'
import _generate from '../functions/index'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingSpinner from '../components/loadingspinner'
import SampleDataGenerator from '../config/sampleData'
import state from '../store/store'
import { connect } from 'react-redux'
import { loadPosts, savePosts } from '../store/reducers/postSlice'
import store from '../store/store'

const Table = React.lazy(() => import('../components/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))
const POST_CONSTANTS = require('../constants/postConstants')

axios.defaults.withCredentials = true

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      records: [],
      adminRecords: [],
      rowSelectOptions: '',
      tableHeaders: '',
      tableFilters: '',
      tableEditPermission: false,
    }
  }

  /* eslint-enable */

  // This method will get the data from the database
  async componentDidMount() {
    store.dispatch({
      type: POST_CONSTANTS.SET_TAB,
      payload: { tab: this.props.tabName },
    })

    store.dispatch(loadPosts)

    let SERVER_URL = _generate.serverFunctions.getServerURL()
    let data = []
    let adminData = []
    if (this.props.dataSource) {
      const role = this.props.role
      const hasPermission = this.props.editTablePermissions.indexOf(role) >= 0
      this.setState({ tableEditPermission: hasPermission })
      if (hasPermission) {
        const dataSource = await axios.get(
          `${SERVER_URL}${this.props.dataSource}/admin`,
        )
        adminData = dataSource.data
      }

      const dataSource = await axios.get(
        `${SERVER_URL}${this.props.dataSource}`,
      )
      data = dataSource.data
    }

    this.setState({
      // posts: SampleDataGenerator.samplePostData(), // postData,
      records: data,
      adminRecords: adminData,
    })

    if (this.props.tableName) {
      const { rowSelectOptions, headers } =
        await _generate.tableFunctions.getTableConfigs(this.props.tableName)
      this.setState({
        rowSelectOptions,
        tableHeaders: headers,
      })
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.loggedIn !== this.props.loggedIn ||
      prevProps.inEditMode !== this.props.inEditMode
    ) {
      let data = []
      let adminData = []
      let SERVER_URL = _generate.serverFunctions.getServerURL()
      if (this.props.dataSource) {
        const role = this.props.role
        const hasPermission = this.props.editTablePermissions.indexOf(role) >= 0
        this.setState({ tableEditPermission: hasPermission })

        if (hasPermission) {
          const dataSource = await axios.get(
            `${SERVER_URL}${this.props.dataSource}/admin`,
          )
          adminData = dataSource.data
        }

        const dataSource = await axios.get(
          `${SERVER_URL}${this.props.dataSource}`,
        )
        data = dataSource.data
      }

      this.setState({
        records: data,
        adminRecords: adminData,
      })
    }
  }

  updatePosts = () => {
    console.log('updating posts')
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios
      .get(`${SERVER_URL}/post/${this.props.tab}`)
      .then((response) => {
        console.log(response)
        this.setState({
          posts: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  generatePage = (tabName, objFunc) => {
    let content = objFunc.generatePage(tabName)
    return <div className="pageContainer">{content}</div>
  }

  renderBackdrop = (image) => {
    if (!image) return null
    return (
      <LazyLoadImage
        src={image.default}
        className="banner-img"
        effect="opacity"
        alt="banner"
      />
    )
  }

  renderPosts() {
    return this.props.posts.length > 0 ? (
      this.props.posts.map((row, idxRow) => {
        return (
          <div className="blog-section">
            {row.map((post, idxCol) => {
              return (
                <Suspense key={post._id} fallback={<LoadingSpinner />}>
                  <BlogSection
                    title={post.title}
                    content={post.content}
                    index={post.index}
                    key={post._id}
                    id={post._id}
                    row={idxRow}
                    col={idxCol}
                    updatePosts={this.updatePosts}
                    tabName={this.props.tab}
                  />
                </Suspense>
              )
            })}
          </div>
        )
      })
    ) : this.props.inEditMode ? (
      <div className="blog-section">
        <Suspense key="" fallback={<LoadingSpinner />}>
          <BlogSection
            title="Looks like you don't have any posts on this page yet..."
            content=""
            index=""
            id=""
            key=""
            row={-1}
            col={-1}
            updatePosts={this.updatePosts}
            tabName={this.props.tab}
            isDummy={true}
          />
        </Suspense>
      </div>
    ) : (
      ''
    )
  }

  async lazyLoadTable() {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    let data = []
    if (this.props.dataSource) {
      const dataSource = await axios.get(
        `${SERVER_URL}${this.props.dataSource}`,
      )
      data = dataSource.data
    }

    return data
  }

  handleDeleteRows = (records) => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios.post(`${SERVER_URL}${this.props.dataSource}/delete`, {
      records: records,
    })
  }

  handleApproveRows = (records) => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios.post(`${SERVER_URL}${this.props.dataSource}/approve`, {
      records: records,
    })
  }

  // This will display the table with all records
  render() {
    const isTableTab = this.props.tableName ? true : false

    const buttonClasses = {
      deleteButtonClass: 'table-delete',
      approveButtonClass: 'table-approve',
      editButtonClass: 'table-edit',
    }

    return (
      <div className="pageContainer">
        {this.props.loggingOut ? (
          <>
            <div>Logging Out...</div>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <div className="leftContainer"></div>
            <div className="midContainer">
              <div className="blog-section">
                {_generate.createFunctions.createBackdrop(
                  this.props.backgroundImage,
                )}
                <div className="welcome-banner">
                  <h1>{this.props.title}</h1>
                </div>
              </div>
              {this.renderPosts()}
              {isTableTab ? (
                <Suspense fallback={<LoadingSpinner />}>
                  {this.state.tableHeaders ? (
                    <Table
                      key={`${this.props.title}-datatable`}
                      defaultSortKey="Time"
                      defaultSortDir={1}
                      headers={this.state.tableHeaders}
                      searchable={true}
                      dataSource={
                        this.props.inEditMode && this.state.tableEditPermission
                          ? this.state.adminRecords
                          : this.state.records
                      }
                      rowSelectOptions={this.state.rowSelectOptions}
                      editTablePermission={
                        this.props.inEditMode && this.state.tableEditPermission
                      }
                      approveButtonClass={buttonClasses.approveButtonClass}
                      approveRows={this.handleApproveRows}
                      deleteButtonClass={buttonClasses.deleteButtonClass}
                      deleteRows={this.handleDeleteRows}
                      // lazyLoadFn={this.lazyLoadTable.bind(this)}
                      // containerClass="table-container"
                      // tableClass="web-table"
                      // filterContainerClass="filter-container"
                      // searchContainerClass="search-container"
                      // headerClass="leaderboard-row"
                      // footerClass="table-footer"
                    />
                  ) : null}
                </Suspense>
              ) : (
                ''
              )}
            </div>
            <div className="rightContainer"></div>
          </>
        )}
      </div>
    )
  }
}

const mapState = (state) => ({
  role: state.auth.role,
  loggedIn: state.auth.loggedIn,
  loggingOut: state.auth.loggingOut,
  inEditMode: state.edit.inEditMode,
  posts: state.post.posts,
  savingPosts: state.post.savingPosts,
  loadingPosts: state.post.loadingPosts,
  tab: state.post.tab,
})

export default connect(mapState)(Page)
