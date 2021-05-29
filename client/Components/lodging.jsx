import React from 'react';

const types = ['hc-awesome-tent', 'hc-awesome-house', 'hc-awesome-tent', 'hc-awesome-tent', 'hc-awesome-house', 'hc-awesome-rv'];

const lodgingIcon = {
  parking: `hc-awesome-parking`,
  ADAaccess: `hc-awesome-wheelchair`
};
const lodgingTextTrue = {
  parking: `Park at listing`,
  ADAaccess: `ADA access`
}
const lodgingTextFalse = {
  parking: `No parking`,
  ADAaccess: `No ADA access`
}

class Lodging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      unavailable: []
    }
    this.initialize();
  }

  initialize() {
    for (let key in this.props.lodging) {
      typeof this.props.lodging[key] === 'boolean'
        && (this.props.lodging[key]
        ? this.state.available.push(key)
        : this.state.unavailable.push(key))
    }
    // console.log(this.state);
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

        {this.state.available.map((item, key) => {
          return (<div className='list' key={key}>
            <div className='icon'>
              <span className={`${lodgingIcon[item]}`} />
            </div>
            <div className='list-text available'>{lodgingTextTrue[item]}</div>
          </div>
          )
        })}

        {this.state.unavailable.map((item, key) => {
          return (<div className='list' key={key + this.state.available.length}>
            <div className='icon'>
              <div className='crossout' /><span className={`absent ${lodgingIcon[item]}`} />
            </div>
            <div className='list-text absent'>{lodgingTextFalse[item]}</div>
          </div>
          )
        })}

        <div className="more-details"><a data-toggle="modal" data-target="#modal-info-card-lodging-provided" href="#">Expand</a></div>
      </div>
    )
  }
}

export default Lodging;