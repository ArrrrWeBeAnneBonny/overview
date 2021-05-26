import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.header.errorOccured) {
      return (
        <div className='header'>
          <div className="recommend-percentage">
            <span className="icon fa fa-thumbs-up"></span> {Math.trunc(100 * this.props.header.percentRec)}% <span className="recommend-text">Recommend</span>
          </div>
          <div className='header-buttons'>
            <div className='upload'>
              <a className='button upload-photo'><span className='icon fa fa-camera'></span> Upload</a>
            </div>
            <a className='button save-listing'>Save to list<i className="fas fa-chevron-down chevron"></i></a>
            <a className='button share'><span className='icon hc-awesome-share-apple'/></a>
          </div>
        </div>
      )
    } else {
      console.log('Not connected to reviews service');
      return (
        <div className='header'>
          <div className='header-buttons'>
            <div className='upload'>
              <a className='button upload-photo'><span className='icon fa fa-camera'></span> Upload</a>
            </div>
            <a className='button save-listing'>Save to list<i className="fas fa-chevron-down chevron"></i></a>
            <a className='button share'><span className='icon hc-awesome-share-apple'/></a>
          </div>
        </div>
      )
    }
  }
}

export default Header;