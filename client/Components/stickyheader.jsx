import React from 'react';

class StickyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.props.clickModal(e);
  }

  showRecommendation() {
    return (
      <div className="recommend-percentage">
        <span className="icon fa fa-thumbs-up"></span> {Math.trunc(100 * this.props.header.percentRec)}% <span className="recommend-text">Recommend</span>
      </div>
    )
  }


  showNearby() {
    return (
      <div className='nearby'>

      </div>
    )
  }

  render() {
    // console.log(this.props)
    return (
      <div id='sticky-overview' className='sticky-header sticky--show main'>
        <div className='two-thirds'>
          <h2 className='name'>{this.props.siteName}{this.props.location.verified && <span className='verified-site fa fa-check' />}</h2>

          <div className='sticky-header-button'>
            {// checking error in accessing review service
              !this.props.header.errorOccured
                ? this.showRecommendation()
                : <div className='empty' />
            }

            <div className='sticky-header-buttons'>
              <div className='upload'>
                <a className='button upload-photo' onClick={this.openModal}><span className='icon fa fa-camera'></span> Upload</a>
              </div>
              <a className='button save-listing' onClick={this.openModal}>Save to list<i className="fas fa-chevron-down chevron"></i></a>
              <a className='button share' onClick={this.openModal}><span className='icon hc-awesome-share-apple' /></a>
            </div>
          </div>
        </div>
        <div className='two-thirds'>
          <div className='sticky-header-nav-bar'>

          </div>
        </div>
      </div>
    )
  }
}

export default StickyHeader;