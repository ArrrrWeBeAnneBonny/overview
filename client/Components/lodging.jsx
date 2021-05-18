import React from 'react';

class Lodging extends React.Component {
  constructor(props) {
    super(props);
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