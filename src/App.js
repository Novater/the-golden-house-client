import { React, Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Page from './views/page';
import './stylesheets/index.scss';
import _generate from './functions/index';
import BannerImg from './assets/banner-image-tgh-2.png';

require('dotenv').config();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isEditMode: false,
      showEditModal: false
    };
  }

  updateEditMode = () => {
    this.setState({ showEditModal: true })
  }

  changeEditMode = () => {
    this.setState({
      showEditModal: false,
      isEdit: !this.state.isEdit,
      isEditMode: false
    });
  }

  closeModal = () => {
    this.setState({ showEditModal: false });
  }

  createPage = (path, { title, tabName, backgroundImage, tableName }) => {
    return (
      <Route exact path={path}>
        <Page
          title={title}
          tabName={tabName}
          isEdit={this.state.isEdit}
          isEditMode={this.state.isEditMode}
          backgroundImage={backgroundImage}
          tableName={tableName}
        />
      </Route>
    )
  }

  render = () => {
    return (
      <div className='app-container'>
        <Navbar
          setEditMode={this.updateEditMode}
          isEdit={this.state.isEdit}
          title='The Golden House'
        />
        {
          this.createPage('/', {
            title: 'Welcome to the Golden House',
            tabName: 'home',
            backgroundImage: BannerImg
          })
        }
        {
          this.createPage('/about', {
            title: 'About Us',
            tabName: 'about',
            backgroundImage: BannerImg
          })
        }
        {
          this.createPage('/speedrun/leaderboard', {
            tabName: 'speedrun-leaderboard',
            tableName: 'abyss',
            backgroundImage: BannerImg
          })
        }
        {
          this.createPage('/contests', {
            title: 'Contests',
            tabName: 'contests',
            backgroundImage: BannerImg
          })          
        }
        {
          this.createPage('/partners', {
            title: 'Partners',
            tabName: 'partners',
            backgroundImage: BannerImg
          })          
        }
        {
          _generate.createFunctions.createModal(this.state.isEdit ? 'Leave Edit Mode?' : 'Enter Edit Mode?', this.state.isEdit ? 'Are you sure you want to leave edit mode?' : 'Are you sure you want to enter edit mode?', this.state.showEditModal, this.changeEditMode, this.closeModal)
        }
      </div>
    );
  }
};