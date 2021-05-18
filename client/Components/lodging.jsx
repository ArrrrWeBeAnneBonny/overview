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
    console.log(this.props.lodging)

    return (
      <div className='card lodging'>

      </div>
    )
  }
}

export default Lodging;