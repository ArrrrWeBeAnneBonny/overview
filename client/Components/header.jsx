import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.header.errorOccured) {
      console.log('Not connected to reviews service');
      return (
        <div className='header'>
          <div className="recommend-percentage">
            <span className="icon fa fa-thumbs-up"></span> {Math.trunc(100 * this.props.header.percentRec)}% <span className="recommend-text">Recommend</span>
          </div>
          <a className='button upload-photo'>Upload </a>
          <a className='button save-listing'>Save to list </a>
          <a className='button share'>(share icon) </a>
        </div>
      )
    } else {
      return;
    }
  }
}

export default Header;