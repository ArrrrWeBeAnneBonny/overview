import React from 'react';

class StickyHeader extends React.Component {
  constructor(props) {
    super(props);
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
      <div className='sticky-header sticky--show'>
        <div className='main'>
          <div className='info'>
            <h2 className='name'>{this.props.siteName}{this.props.location.verified && <span className='verified-site fa fa-check' />}</h2>

            <div className='sticky-header-recs'>
              {// checking error in accessing review service
                !this.props.header.errorOccured
                  ? this.showRecommendation()
                  : <div className='empty' />
              }
            </div>
          </div>
          <div className='sticky-header-buttons'>
            <a className='share' onClick={this.props.clickModal}><span className='fab hc-awesome-facebook-messenger' /></a>
            <a className='share' onClick={this.props.clickModal}><span className='fab fa-pinterest' /></a>
            <a className='share' onClick={this.props.clickModal}><span className='fab hc-awesome-share-apple' /></a>

            <div className='button save-listing' onClick={this.props.clickModal}>Save to list<i className="fas fa-chevron-down chevron"></i></div>
          </div>
        </div>
          <div className='main'>
            <ul className='sticky-header-nav-bar'>
              <li className="sticky-nav" onClick={this.props.clickModal}><span>Overview </span></li>
              <li className="sticky-nav" onClick={this.props.clickModal}><span>Reviews </span></li>
              <li className="sticky-nav" onClick={this.props.clickModal}><span>Location </span></li>
              <li className="sticky-nav" onClick={this.props.clickModal}><span>Campers also viewed </span></li>
            </ul>
          </div>
      </div>
    )
  }
}

export default StickyHeader;