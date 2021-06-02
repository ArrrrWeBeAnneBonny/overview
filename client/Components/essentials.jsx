import React from 'react';

const essentialIcon = {
  campfires: `hc-awesome-fire`,
  toilet: `hc-awesome-toilet`,
  pets: `hc-awesome-pets`
}

class Essentials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      unavailable: []
    }
    this.initialize();
    this.openModal = this.openModal.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.props.clickModal(e);
  }

  initialize() {
    for (let key in this.props.essentials) {
      this.props.essentials[key]
      ? this.state.available.push(key)
      : this.state.unavailable.push(key)
    }
    // console.log(this.state);
  }

  render() {
    // console.log(this.state);
    return (
      <div className='card essentials'>
        <div className='title'>Essentials</div>

        {this.state.available.map((item, key) => {
          return (<div className='list' key={key}>
          <div className='icon'>
            <span className={`${essentialIcon[item]}`} />
          </div>
          <div className='list-text available'>{`${item} allowed`}</div>
        </div>
        )})}

        {this.state.unavailable.map((item, key) => {
          return (<div className='list' key={key + this.state.available.length}>
          <div className='icon'>
            <div className='crossout' /><span className={`absent ${essentialIcon[item]}`} />
          </div>
          <div className='list-text absent'>{`No ${item}`}</div>
        </div>
        )})}

        <div className="more-details"><a data-toggle="modal" data-target="#modal-info-card-lodging-provided" onClick={this.openModal}>Expand</a></div>
      </div>
    )
  }
}

export default Essentials;