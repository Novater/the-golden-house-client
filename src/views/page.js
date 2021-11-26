/* eslint-disable */

import axios from 'axios'
import React, { Component, Suspense } from 'react'
import _generate from '../functions/index'
import Backdrop from '../components/backdrop'
import PageSection from './pagesection'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingSpinner from '../components/loadingspinner'
import SampleDataGenerator from '../config/sampleData'
import { connect } from 'react-redux'
import { loadPosts, savePosts } from '../store/reducers/postSlice'
import store from '../store/store'
import { post } from 'jquery'

const Table = React.lazy(() => import('../components/table/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))
const POST_CONSTANTS = require('../constants/postConstants')
const EDIT_CONSTANTS = require('../constants/editConstants')

axios.defaults.withCredentials = true

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      adminRecords: [],
      rowSelectOptions: '',
      tableHeaders: '',
      tableFilters: '',
      tableEditPermission: false,
      title: this.props.title,
    }
  }

  /* eslint-enable */

  // This method will get the data from the database
  async componentDidMount() {
    store.dispatch({
      type: POST_CONSTANTS.SET_TAB,
      payload: { tab: this.props.tabName },
    })
    store.dispatch({
      type: EDIT_CONSTANTS.CLOSE_SIDEBAR,
    })

    store.dispatch(loadPosts)
  }

  async componentDidUpdate(prevProps) {
    // if (
    //   prevProps.loggedIn !== this.props.loggedIn ||
    //   prevProps.inEditMode !== this.props.inEditMode
    // ) {
    //   let data = []
    //   let adminData = []
    //   let SERVER_URL = _generate.serverFunctions.getServerURL()
    //   if (this.props.dataSource) {
    //     const role = this.props.role
    //     const hasPermission = this.props.editTablePermissions.indexOf(role) >= 0
    //     this.setState({ tableEditPermission: hasPermission })
    //     if (hasPermission) {
    //       const dataSource = await axios.get(
    //         `${SERVER_URL}${this.props.dataSource}/admin`,
    //       )
    //       adminData = dataSource.data
    //     }
    //     const dataSource = await axios.get(
    //       `${SERVER_URL}${this.props.dataSource}`,
    //     )
    //     data = dataSource.data
    //   }
    //   this.setState({
    //     records: data,
    //     adminRecords: adminData,
    //   })
    // }
  }

  generatePage = (tabName, objFunc) => {
    let content = objFunc.generatePage(tabName)
    return <div className="pageContainer">{content}</div>
  }

  renderPosts() {
    const placeHolderEl = {
      col: -1,
      row: -1,
      title: `Looks like you don't have any posts yet on this page...`,
      content: '',
      id: `placeholder-el-${this.props.tabName}`,
    }

    return this.props.posts.length > 0 ? (
      this.props.posts.map((row, idxRow) => {
        const rowKey = row.map((post) => post._id).join('-')
        return (
          <>
            <div className="blog-section" key={rowKey} id={rowKey}>
              {row.map((post, idxCol) => {
                return (
                  <PageSection
                    type={post.type}
                    data={post}
                    role={this.props.role}
                    row={idxRow}
                    col={idxCol}
                    key={post._id}
                  />
                )
              })}
            </div>
            {/* {idxRow !== this.props.posts.length - 1 && <hr className="blog-separator" style={{ width: '100%' }} />} */}
          </>
        )
      })
    ) : this.props.inEditMode ? (
      <div className="blog-section">
        <PageSection
          type={`placeholder`}
          role={this.props.role}
          row={-1}
          col={-1}
          key={`placeholder-el-${this.props.tabName}`}
          data={placeHolderEl}
        />
      </div>
    ) : (
      ''
    )
  }

  updateTitle = (event) => {
    this.setState({
      title: event.target.value,
    })
  }

  render() {
    const { loggingOut, inEditMode, showSideBar, backgroundImage } = this.props
    return (
      <div
        className={`pageContainer ${
          showSideBar && inEditMode ? `sidebar-page` : ``
        }`}
      >
        {loggingOut ? (
          <>
            {
              // NEED MORE DESCRIPTIVE MESSAGE & IMPLEMENT AUTO LOGOUT SESSION
            }
            <div>Logging Out...</div>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <div className="leftContainer"></div>
            <div className="midContainer">
              <div className="blog-section">
                <Backdrop image={backgroundImage} />
                <div className="banner">
                  {inEditMode ? (
                    <input
                      type="text"
                      value={this.state.title}
                      onChange={this.updateTitle}
                    ></input>
                  ) : (
                    <h1>{this.state.title}</h1>
                  )}
                </div>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                {this.renderPosts()}
              </Suspense>
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
  showSideBar: state.edit.showSideBar,
  posts: state.post.posts,
  savingPosts: state.post.savingPosts,
  loadingPosts: state.post.loadingPosts,
  tab: state.post.tab,
})

export default connect(mapState)(Page)
