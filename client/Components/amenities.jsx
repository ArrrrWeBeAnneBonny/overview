import React from 'react';

class Amenities extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.amenities);
    return (
      <div className='card amenities'>
        <div className='title'>Amenities</div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.potableWater.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.potableWater.available ? `hc-awesome-water` : `absent hc-awesome-water`} />
          </div>
          <div className='list-text'>{this.props.amenities.potableWater.available ? `Potable water available` : `No potable water`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.picnicTable.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.picnicTable.available ? `hc-awesome-picnic-table` : `absent hc-awesome-picnic-table`} />
          </div>
          <div className='list-text'>{this.props.amenities.picnicTable.available ? `Picnic table available` : `No picnic table`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.bins.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.bins.available ? `hc-awesome-trash` : `absent hc-awesome-trash`} />
          </div>
          <div className='list-text'>{this.props.amenities.bins.available ? `Bins available` : `No bins`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.shower.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.shower.available ? `hc-awesome-shower` : `absent hc-awesome-shower`} />
          </div>
          <div className='list-text'>{this.props.amenities.shower.available ? `Showers available` : `No showers`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.wifi.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.wifi.available ? `hc-awesome-wifi` : `absent hc-awesome-wifi`} />
          </div>
          <div className='list-text'>{this.props.amenities.wifi.available ? `Wifi available` : `No wifi`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.amenities.kitchen.available ? <div /> : <div className='crossout' />}<span className={this.props.amenities.kitchen.available ? `hc-awesome-kitchen` : `absent hc-awesome-kitchen`} />
          </div>
          <div className='list-text'>{this.props.amenities.kitchen.available ? `Kitchen available` : `No kitchen`}</div>
        </div>
        <div className="more-details"><a data-toggle="modal" data-target="#modal-info-card-lodging-provided" href="#">More details</a></div>
      </div>
    )
  }
}

export default Amenities;