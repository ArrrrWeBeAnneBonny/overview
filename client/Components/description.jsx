import React from 'react';

class Description extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='description'>
        {this.props.description}
      </div>
    )
  }
}

export default Description;