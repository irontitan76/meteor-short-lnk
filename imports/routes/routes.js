import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Link from './../ui/Link';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

const browserHistory = createBrowserHistory();
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.push('/links');
  } else if ( isAuthenticatedPage && !isAuthenticated ) {
    browserHistory.push('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path='/' render={() => Meteor.userId() ? <Redirect to='/links' /> : <Login />}/>
      <Route path='/links'render={() => !Meteor.userId() ? <Redirect to='/' /> : <Link />}/>
      <Route path='/signup' render={() => Meteor.userId() ? <Redirect to='/links' /> : <Signup />}/>
      <Route path='*' component={NotFound} />
    </Switch>
  </Router>
);
