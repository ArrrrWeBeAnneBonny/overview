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

  verifiedSite() {
    let words = this.props.siteName.split(' ');
    const lastWord = words.pop();
    const nameSansLastWord = words.join(' ');
    return (
      <h2 className='name'>
        {nameSansLastWord + ' '}
        <span className='last-word-check'>{lastWord}<span className='verified-site fa fa-check' /></span>
      </h2>
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
      <div className='sticky-header hide'>
        <div className='two-thirds'>
          {this.props.location.verified ? this.verifiedSite() : <h2 className='name'>{this.props.siteName}</h2>}



          <div className='sticky-header-buttom'>
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
      </div>
    )
  }
}

export default StickyHeader;