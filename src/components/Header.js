import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  render() {
    const { darkMode } = this.state;
    return (
      <div>
        Header
        Dark mode?
        { ' ' }
        { darkMode ? 'yes' : 'no' }
      </div>
    );
  }
}

export default Header;
