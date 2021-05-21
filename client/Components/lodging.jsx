import React from 'react';

class Lodging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.lodging.type,
      numberOfSites: this.props.lodging.numberOfSites,
      maxGuestsPerSite: this.props.lodging.maxGuestsPerSite,
      parking: this.props.lodging.parking,
      ADAaccess: this.props.lodging.ADAaccess
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='card lodging'>
        <div className='title'>Lodging provided</div>
        <div className='list'>
          <div className='icon'><span className="hc-awesome-house"></span></div>
          <div className='list-text'>{this.state.type}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.state.numberOfSites} sites</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>Up to {this.state.maxGuestsPerSite} guests per site</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.state.parking ? `Park at listing` : `No parking at listing`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.state.ADAaccess ? `ADA access` : `No ADA access`}</div>
        </div>
      </div>
    )
  }
}

export default Lodging;