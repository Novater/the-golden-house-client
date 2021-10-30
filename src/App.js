import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Page from './views/page';
import './stylesheets/index.scss';

require('dotenv').config();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isEditMode: false
    };
  }

  updateEditMode = () => {
    console.log('updating edit to', !this.state.isEdit);
    this.setState({
      isEdit: !this.state.isEdit,
      isEditMode: false
    });
  }
  render = () => {
    return (
      <div class='app-container'>
        <Navbar setEditMode={this.updateEditMode}/>
        <Route exact path='/'>
          <Page tabName='home' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
        <Route exact path='/about'>
          <Page tabName='about' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
        <Route path='/leaderboard'>
          <Page tabName='table' isEdit={this.state.isEdit} isEditMode={this.state.isEditMode}></Page>
        </Route>
      </div>
    );
  }
};