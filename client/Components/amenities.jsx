import React from 'react';

class Amenities extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.amenities);

    return (
      <div id='amenities'>
        amenities go here
      </div>
    )
  }
}

export default Amenities;