import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar';
import Page from './components/page';
import './stylesheets/index.scss';

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path='/'>
        <Page tabName='home'></Page>
      </Route>
      <Route exact path='/about'>
        <Page tabName='about'></Page>
      </Route>
      <Route path='/leaderboard'>
        <Page tabName='table'>
        </Page>
      </Route>
      <Route path='/dps'>
        <Page tabName='table'>
        </Page>
      </Route>
      <Route path='/contests'>
        <Page tabName='about'>
        </Page>
      </Route>
      <Route path='/partners'>
        <Page tabName='about'>
        </Page>
      </Route>
    </div>
  )
}

export default App;