import axios from 'axios';
import BlogSection from '../components/blogSection';
import React, { Component } from 'react';
import Table from '../components/table';
import _generate from '../functions/index';

export default class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabName: '',
      posts: []
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

  updatePosts = () => {
    let SERVER_URL = _generate.serverFunctions.getServerURL();
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

  generateTablePage = () => {

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
          {
            isHomeTab ?
              <div className='blog-section'>
                <div className='banner-img'>
                </div>
                <h3>Welcome to the Golden House!</h3>
                <a href='#'>Click here to join our discord server!</a>
              </div>
              : ''
          }
          { 
            this.state.posts.map(post => { return (<BlogSection title={post.title} content={post.content} key={post._id} id={post._id} updatePosts={this.updatePosts} />) })}
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
