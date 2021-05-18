import React from 'react';

class Description extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='owner-description'>
        <div className='owner'>
          <div className='owner-photo'>
          <img src={this.props.owner.imageUrl}></img>
          </div>
          <div className='owner-name'>
            <b>Hosted by</b>
            {this.props.owner.name}
          </div>
        </div>
        <div className='description'>
          {this.props.description}
        </div>
      </div>
    )
  }
}

export default Description;