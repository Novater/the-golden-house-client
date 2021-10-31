import axios from 'axios';
import React, { Component, Suspense } from 'react';
import _generate from '../functions/index';
import BannerImg from '../assets/banner-image-tgh-2.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Table = React.lazy(() => import('../components/table'));
const BlogSection = React.lazy(() => import ('../components/blogSection'));

export default class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabName: '',
      posts: [],
      isEdit: this.props.isEdit,
      isEditMode: this.props.isEditMode
    };
  }

  // This method will get the data from the database
  componentDidMount = () => {
    this.setState({ tabName: this.props.tabName });

    let SERVER_URL = _generate.serverFunctions.getServerURL();
    axios
    .get(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/${this.props.tabName}`)
    .then((response) => {
      console.log(response);
      this.setState({ 
        posts: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillReceiveProps = (props) => {
    console.log('receiving props', props);
    this.setState({ 
      isEdit: props.isEdit,
      isEditMode: props.isEditMode
    });
  }

  updatePosts = () => {
    let SERVER_URL = _generate.serverFunctions.getServerURL();
    console.log('updating posts');
    axios
    .get(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post/${this.state.tabName}`)
    .then((response) => {
      console.log(response);
      this.setState({ 
        posts: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });    
  }

  generatePage = (tabName, objFunc) => {
    let content = objFunc.generatePage(tabName);
    return (
      <div className='pageContainer'>
        {content}
      </div>
    );
  }

  // This will display the table with all records
  render = () => {
    const isTableTab = this.state.tabName === 'table';
    const isHomeTab = this.state.tabName === 'home';

    let rowSelectOptions = { rows: [25, 50, 100], selected: 100 };
    let abyssHeaders = ['Rank', 'Version', 'Floor', 'Time', 'Alias', 'Region', 'Characters', 'Notes'];
    let abyssFilters = ['12-1-1', '12-1-2', '12-2-1', '12-2-2', '12-3-1', '12-3-2', '12-1', '12-2', '12-3'];

    return (
      <div className='pageContainer'>
        <div className='leftContainer'>
        </div>
        <div className='midContainer'>
          <div className='blog-section'>
            <LazyLoadImage
              src= { BannerImg }
              className='banner-img'
              effect='opacity'
              alt='banner'
            />
              {
                isHomeTab ? 
                <div className='welcome-banner'>
                  <h1>Welcome to the Golden House</h1>
                </div>
                : ''
              }

          </div>
          { 
            this.state.posts.length > 0 ? 
              this.state.posts.map(post => { 
                return (
                  <Suspense fallback={<div>Loading...</div>}>
                    <BlogSection 
                      title={post.title} 
                      content={post.content} 
                      index={post.index} 
                      key={post._id} 
                      id={post._id} 
                      updatePosts={this.updatePosts} 
                      isEdit={this.state.isEdit}
                      tabName={this.state.tabName}
                    />
                  </Suspense>
                );
             }) : 
            this.state.isEdit ?
              <Suspense fallback={<div>Loading...</div>}>
                <BlogSection 
                  title="Looks like you don't have any posts on this page yet..."
                  content="" 
                  index=""
                  id="" 
                  updatePosts={this.updatePosts}
                  isEdit={this.state.isEdit}
                  tabName={this.state.tabName}
                />
              </Suspense> 
              : ''
          }
          {
            isTableTab ?
              <Suspense fallback={<div>Loading...</div>}>
                <Table 
                  tableType='abyss'
                  headers={abyssHeaders}
                  filters={abyssFilters}
                  searchable={true}
                  rowSelectOptions={rowSelectOptions}
                  pagination={true}
                />
              </Suspense>
              : ''
          }
        </div>
        <div className='rightContainer'>
        </div>
      </div>
    )
  }
};
