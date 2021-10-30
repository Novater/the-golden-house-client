import axios from 'axios';
import BlogSection from '../components/blogSection';
import React, { Component } from 'react';
import Table from '../components/table';
import _generate from '../functions/index';
import BannerImg from '../assets/banner-image-tgh-2.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
                  <a href='#'>Click here to join our discord server!</a>
                </div>
                : ''
              }

          </div>
          { 
            this.state.posts.length > 0 ? 
              this.state.posts.map(post => { 
                return (
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
                );
             }) : 
            this.state.isEdit ? 
              <BlogSection 
                title="Looks like you don't have any posts on this page yet..."
                content="" 
                index=""
                id="" 
                updatePosts={this.updatePosts}
                isEdit={this.state.isEdit}
                tabName={this.state.tabName}
              />
              : ''
          }
          {
            isTableTab ? <Table tableType='abyss'/> : ''
          }
        </div>
        <div className='rightContainer'>
        </div>
      </div>
    )
  }
};
