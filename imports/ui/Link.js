import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Link extends Component {
  constructor() {
    super()
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
};
