// import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.viewHeader = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.isInView = this.isInView.bind(this);
  }

  componentDidMount() {
    console.log('header mounted');
    console.log('document ', document);

    document.addEventListener("scroll", this.isInView);

    const header = this.viewHeader.current;
    console.log('header ', header);
    const bottom = this.viewHeader.current.getBoundingClientRect().bottom;
    console.log('bottom ', bottom);

  }

  isInView() {
    console.log('checking if header is in view');
    // get how much pixels left to scrolling the header element
    // const top = this.viewHeader.getBoundingClientRect().top;
    const bottom = this.viewHeader.current.getBoundingClientRect().bottom;
    const stickyShouldHide = bottom >= 0;
    // console.log("bottom in viewport: ", bottom);
    // console.log("header in view? ", bottom >= 0);
    if (stickyShouldHide !== this.props.hide) {
      console.log('call set header status: ', stickyShouldHide, this.props.hide)
      this.props.setHeaderStatus(stickyShouldHide);
    }
  };

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
      <h1>
        {nameSansLastWord + ' '}
        <span className='last-word-check'>{lastWord}<span className='verified-site fa fa-check' /></span>
      </h1>
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
      <div className='two-thirds' ref={this.viewHeader}>
        <div className="breadcrumb">
          <li>
            <a className="underlined" href="https://www.hipcamp.com/en-US/discover/united-states">{this.props.location.country}</a>
          </li>
          <li>
            <a className="underlined" href={`https://www.hipcamp.com/en-US/discover/${this.props.location.state}`}>{this.props.location.state}</a>
          </li>
          <li>
            <a className="underlined" href={`https://www.hipcamp.com/en-US/discover/${this.props.location.state}`} style={{ display: 'none' }}>{this.props.siteName}</a>
          </li>
        </div>

        {this.props.location.verified ? this.verifiedSite() : <h1>{this.props.siteName}</h1>}


          {this.props.header.nearby
            ? this.showNearby()
            : <div className='nearby'><span className='nearby-strong'>Nearby: </span>... Coming Soon!</div>
          }


        <div className='header'>
          {// checking error in accessing review service
            !this.props.header.errorOccured
              ? this.showRecommendation()
              : <div className='empty' />
          }

          <div className='header-buttons'>
            <div className='upload'>
              <a className='button upload-photo'onClick={this.openModal}><span className='icon fa fa-camera'></span> Upload</a>
            </div>
            <a className='button save-listing' onClick={this.openModal}>Save to list<i className="fas fa-chevron-down chevron"></i></a>
            <a className='button share' onClick={this.openModal}><span className='icon hc-awesome-share-apple' /></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;