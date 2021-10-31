import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Page from './views/page';
import './stylesheets/index.scss';
import _generate from './functions/index';

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
          <Page tabName='home' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
        <Route exact path='/about'>
          <Page tabName='about' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
        <Route path='/leaderboard'>
          <Page tabName='table' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
        {
          _generate.createFunctions.createModal(this.state.isEdit ? 'Leave Edit Mode?' : 'Enter Edit Mode?', this.state.isEdit ? 'Are you sure you want to leave edit mode?' : 'Are you sure you want to enter edit mode?', this.state.showEditModal, this.changeEditMode, this.closeModal)
        }
      </div>
    );
  }
};