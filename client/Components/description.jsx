import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <span className="star-host-badge" ><i className="fa fa-star"></i></span>
          <div className='owner-name'>
            <div className='medium'>Hosted by </div>
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