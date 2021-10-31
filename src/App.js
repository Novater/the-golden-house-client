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

  render = () => {
    return (
      <div className='app-container'>
        <Navbar setEditMode={this.updateEditMode} isEdit={this.state.isEdit} />
        <Route exact path='/'>
          <Page 
            title='Welcome to the Golden House'
            tabName='home'
            isEdit={this.state.isEdit}
            isEditMode={this.state.isEditMode}
            backgroundImage={BannerImg}
          />
        </Route>
        <Route exact path='/about'>
          <Page
            title='About Us'
            tabName='about'
            isEdit={this.state.isEdit}
            isEditMode={this.state.isEditMode}
            backgroundImage={BannerImg}
          />
        </Route>
        <Route exact path='/leaderboard'>
          <Page
            tabName='table'
            isEdit={this.state.isEdit}
            isEditMode={this.state.isEditMode}
            backgroundImage={BannerImg}
          />
        </Route>
        {
          _generate.createFunctions.createModal(this.state.isEdit ? 'Leave Edit Mode?' : 'Enter Edit Mode?', this.state.isEdit ? 'Are you sure you want to leave edit mode?' : 'Are you sure you want to enter edit mode?', this.state.showEditModal, this.changeEditMode, this.closeModal)
        }
      </div>
    );
  }
};