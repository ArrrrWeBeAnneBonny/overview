import React from 'react';

const amenityIcon = {
    potableWater: `hc-awesome-water`,
    kitchen: `hc-awesome-kitchen`,
    shower: `hc-awesome-shower`,
    picnicTable: `hc-awesome-picnic-table`,
    wifi: `hc-awesome-wifi`,
    bins: `hc-awesome-trash`
};

const amenityText = {
  potableWater: `potable water`,
  kitchen: `kitchen`,
  shower: `showers`,
  picnicTable: `picnic table`,
  wifi: `wifi`,
  bins: `bins`
};

class Amenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      unavailable: []
    }
    this.initialize();
    this.openModal = this.openModal.bind(this);
  }

  initialize() {
    for (let key in this.props.amenities) {
      this.props.amenities[key].available
      ? this.state.available.push(key)
      : this.state.unavailable.push(key)
    }
    // console.log(this.state)
  }

  openModal(e) {
    e.preventDefault();
    this.props.clickModal(e);
  }

  render() {
    // console.log(this.props.amenities);
    return (
      <div className='card amenities'>
        <div className='title'>Amenities</div>

        {this.state.available.map((item, key) => {
          return (<div className='list' key={key}>
          <div className='icon'>
            <span className={`${amenityIcon[item]}`} />
          </div>
          <div className='list-text available'>{`${amenityText[item]} allowed`}</div>
        </div>
        )})}

        {this.state.unavailable.map((item, key) => {
          return (<div className='list' key={key + this.state.available.length}>
          <div className='icon'>
            <div className='crossout' /><span className={`absent ${amenityIcon[item]}`} />
          </div>
          <div className='list-text absent'>{`No ${amenityText[item]}`}</div>
        </div>
        )})}

        <div className="more-details"><a data-toggle="modal" data-target="#modal-info-card-lodging-provided" onClick={this.openModal}>Expand</a></div>
      </div>
    )
  }
}

export default Amenities;