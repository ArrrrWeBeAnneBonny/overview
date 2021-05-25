import React from 'react';

const types = ['hc-awesome-tent', 'hc-awesome-house', 'hc-awesome-tent', 'hc-awesome-tent', 'hc-awesome-cabin', 'hc-awesome-rv']

class Lodging extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.lodging);
    return (
      <div className='card lodging'>
        <div className='title'>Lodging provided</div>
        <div className='list'>
          <div className='icon'><span className={types.length <= this.props.lodging.type ? types[0] : types[this.props.lodging.type]}></span></div>
          <div className='list-text'>{this.props.lodging.housing}</div>
        </div>
        <div className='list'>
          <div className='icon'><span className="hc-awesome-pin"></span></div>
          <div className='list-text'>{this.props.lodging.numberOfSites} sites</div>
        </div>
        <div className='list'>
          <div className='icon'><span className="hc-awesome-person"></span></div>
          <div className='list-text'>Up to {this.props.lodging.maxGuestsPerSite} guests per site</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.lodging.parking ? <div /> : <div className='crossout' />}
            <span className={this.props.lodging.parking ? `hc-awesome-parking` : `absent hc-awesome-parking`} />
          </div>
          <div className={this.props.lodging.parking ? `list-text` : `absent list-text`}>{this.props.lodging.parking ? `Park at listing` : `No parking at listing`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.lodging.ADAaccess ? <div /> : <div className='crossout' />}
            <span className={this.props.lodging.ADAaccess ? `hc-awesome-wheelchair` : `absent hc-awesome-wheelchair`} />
          </div>
          <div className={this.props.lodging.ADAaccess ? `list-text` : `absent list-text`}>{this.props.lodging.ADAaccess ? `ADA access` : `No ADA access`}</div>
        </div>
        <div className="more-details"><a data-toggle="modal" data-target="#modal-info-card-lodging-provided" href="#">More details</a></div>
      </div>
    )
  }
}

export default Lodging;