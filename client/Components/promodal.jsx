// import React from 'react';

class ProModal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    e.preventDefault();
    this.props.clickModal(e);
  }

  render() {
    return (
      <div className='modal-dialog'>
        <div className='modal-content'>

          <div className='modal-header'>
            <button className='modal-close' onClick={this.closeModal}>
              <span>x</span></button>
            <h4 className='modal-title'>
              <span className='icon-alert'><i className='fas fa-exclamation-triangle'></i></span>
              <span className='pro-warning'>Upgrade to PRO to unlock this feature!</span>
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default ProModal;