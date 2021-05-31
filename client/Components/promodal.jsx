import React from 'react';

class ProModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='modal-dialog modal-open'>
        <div className='modal-content'>

          <div className='modal-header'>
            <button className='close' type='button'><span className='modal-close'>x</span></button>
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