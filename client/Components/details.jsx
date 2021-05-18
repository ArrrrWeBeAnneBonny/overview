import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.details);

    return (
      <div id='details'>
        details go here
      </div>
    )
  }
}

export default Details;