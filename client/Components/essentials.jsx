import React from 'react';

class Essentials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.essentials);

    return (
      <div id='essentials'>
        essentials go here
      </div>
    )
  }
}

export default Essentials;