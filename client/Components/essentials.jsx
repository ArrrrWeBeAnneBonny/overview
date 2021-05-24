import React from 'react';

class Essentials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.essentials);
    return (
      <div className='card essentials'>
        <div className='title'>Essentials</div>
        <div className='list'>
          <div className='icon'>
            {this.props.essentials.campfires ? <div /> : <div className='crossout' />}<span className={this.props.essentials.campfires ? `hc-awesome-fire` : `absent hc-awesome-fire`} />
          </div>
          <div className='list-text'>{this.props.essentials.campfires ? `Campfires allowed` : `No campfires`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
            {this.props.essentials.toitet ? <div /> : <div className='crossout' />}<span className={this.props.essentials.toitet ? `hc-awesome-toilet` : `absent hc-awesome-toilet`} />
          </div>
          <div className='list-text'>{this.props.essentials.toilet ? `Toilet available` : `No toilet available`}</div>
        </div>
        <div className='list'>
          <div className='icon'>
          {this.props.essentials.pets ? <div /> : <div className='crossout' />}<span className={this.props.essentials.pets ? `hc-awesome-pets` : `absent hc-awesome-pets`} />
          </div>
          <div className='list-text'>{this.props.essentials.pets ? `Pets allowed` : `No pets`}</div>
        </div>
      </div>
    )
  }
}

export default Essentials;