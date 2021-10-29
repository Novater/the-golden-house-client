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
    // TODO: implement what needs to do when the page loads
    this.setState({ tabName: this.props.tabName });

    let SERVER_URL = _generate.serverFunctions.getServerURL();
    console.log('SERVER_URL', SERVER_URL);
    axios
    .get(`${SERVER_URL || 'https://calm-plains-52439.herokuapp.com'}/post`)
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
    console.log('state', this.state);
    const isTableTab = this.state.tabName === 'table';
    const isHomeTab = this.state.tabName === 'home';
    const isAboutTab = this.state.tabName === 'about';

    return (
      <div className='pageContainer droppable'>
        {isHomeTab ?
          <div className='blog-section'>
            <div className='banner-img'>
            </div>
            <h3>Welcome to the Golden House!</h3>
            <a href='#'>Click here to join our discord server!</a>
          </div>
          : ''}
        { this.state.posts.map(post => { return (<BlogSection title={post.title} content={post.content}/>) })}
        {
          isTableTab ? <Table tableType='abyss'/> : ''
        }
      </div>
    )
  }
};
