/* eslint-disable */

import axios from 'axios'
import React, { Component, Suspense } from 'react'
import _generate from '../functions/index'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingSpinner from '../components/loadingspinner'

const Table = React.lazy(() => import('../components/table'))
const BlogSection = React.lazy(() => import('../components/blogsection'))
const config = require('../config/index')

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      isEdit: this.props.isEdit,
      isEditMode: this.props.isEditMode,
      records: [],
      rowSelectOptions: '',
      tableHeaders: '',
      tableFilters: '',
    }
  }

  /* eslint-enable */

  // This method will get the data from the database
  async componentDidMount() {
    this.setState({ tabName: this.props.tabName })

    let SERVER_URL = _generate.serverFunctions.getServerURL()
    const posts = await axios.get(`${SERVER_URL}/post/${this.props.tabName}`)
    const postData = posts.data

    let data = []

    if (this.props.dataSource) {
      const dataSource = await axios.get(
        `${SERVER_URL}${this.props.dataSource}`,
      )
      data = dataSource.data
    }

    this.setState({
      posts: postData,
      records: data,
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.isEdit !== this.props.isEdit ||
      prevProps.isEditMode !== this.props.isEditMode
    ) {
      this.setState({
        isEdit: this.props.isEdit,
        isEditMode: this.props.isEditMode,
      })
    }
  }

  updatePosts = () => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    axios
      .get(
        `${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/${
          this.props.tabName
        }`,
      )
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
    return this.state.posts.length > 0 ? (
      this.state.posts.map((post) => {
        return (
          <Suspense key={post._id} fallback={<LoadingSpinner />}>
            <BlogSection
              title={post.title}
              content={post.content}
              index={post.index}
              key={post._id}
              id={post._id}
              updatePosts={this.updatePosts}
              isEdit={this.state.isEdit}
              tabName={this.props.tabName}
            />
          </Suspense>
        )
      })
    ) : this.state.isEdit ? (
      <Suspense key="" fallback={<LoadingSpinner />}>
        <BlogSection
          title="Looks like you don't have any posts on this page yet..."
          content=""
          index=""
          id=""
          key=""
          updatePosts={this.updatePosts}
          isEdit={this.state.isEdit}
          tabName={this.props.tabName}
        />
      </Suspense>
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

  // handleCloseCreate = () => {
  //   this.setState({ showCreateModal: false })
  // }

  handleCloseDelete = () => {
    this.setState({ showTableRowDeleteModal: false })
  }

  handleDeleteRow = (event) => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    console.log(event.target.id)
    const docId = event.target.id.split('_')[1]
    console.log('docid', docId)
    axios.post(`${SERVER_URL}${this.props.dataSource}/delete/:${docId}`)
  }

  handleApproveRow = (event) => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    console.log(event.target.id)
    const docId = event.target.id.split('_')[1]
    console.log('docid', docId)
    // axios.post(`${SERVER_URL}${this.props.dataSource}/delete/:${docId}`)
  }

  handleEditRow = (event) => {
    let SERVER_URL = _generate.serverFunctions.getServerURL()
    console.log(event.target.id)
    const docId = event.target.id.split('_')[1]
    console.log('docid', docId)
    // axios.post(`${SERVER_URL}${this.props.dataSource}/delete/:${docId}`)
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
        <div className="leftContainer"></div>
        <div className="midContainer">
          <div className="blog-section">
            {this.renderBackdrop(this.props.backgroundImage)}
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
                  dataSource={this.state.records}
                  rowSelectOptions={this.state.rowSelectOptions}
                  editTablePermission={true}
                  deleteButtonClass={buttonClasses.deleteButtonClass}
                  approveButtonClass={buttonClasses.approveButtonClass}
                  editButtonClass={buttonClasses.editButtonClass}
                  deleteRowOnClick={this.handleDeleteRow}
                  editRowOnClick={this.handleEditRow}
                  approveRowOnClick={this.handleApproveRow}
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
      </div>
    )
  }
}
