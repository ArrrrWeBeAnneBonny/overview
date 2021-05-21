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
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.potableWater ? `Potable water available` : `No potable water`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.picnicTable ? `Picnic table available` : `No picnic table`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.bins ? `Bins available` : `No bins`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.shower ? `Showers available` : `No showers`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.wifi ? `Wifi available` : `No wifi`}</div>
        </div>
        <div className='list'>
          <div className='icon'></div>
          <div className='list-text'>{this.props.amenities.kitchen ? `Kitchen available` : `No kitchen`}</div>
        </div>
      </div>
    )
  }
}

export default Amenities;