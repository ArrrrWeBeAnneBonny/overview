// import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.props.clickModal(e);
  }

  render() {
    // console.log(this.props.details, this.props.pricing);
    if (this.props.pricing.instantBook) {
      return (
        <section className='details' >
          <div className='details-title'>Details</div>
          <div className='details-list'>
            <ul className='col-1'>
              <li className='details-list-text'>
                <b>Check in: </b> After {this.props.details.checkInTime}
              </li>
              <li className='details-list-text'>
                <b>Check out: </b> Before {this.props.details.checkOutTime}
              </li>
              <li className='details-list-text'>
                <b>Cancellation policy: </b> {this.props.details.cancellationPolicy}
              </li>
            </ul>
            <ul className='col-2'>
              <li className='details-list-text'>
                <b>On arrival: </b> {this.props.details.onArrival}
              </li>
              <li className='details-list-text'>
                <b>Minimum nights: </b> {this.props.pricing.minimumNights} night
          </li>
              <li className='details-list-text'>
                <b>Accepts bookings: </b> {this.props.pricing.monthsOutForBooking} months out
          </li>
              <li className='details-list-text'>
                <b>Weeknight discount: </b> {this.props.pricing.weeknightDiscount * 100}% off
          </li>
            </ul>
          </div>
        </section>)
    } else {
      return (
        <section className='details' >
          <div className='details-title'>Details</div>
          <div className='details-list'>
            <ul className='col-1'>
              <li className='details-list-text'>
                <b>Check in: </b> After {this.props.details.checkInTime}
              </li>
              <li className='details-list-text'>
                <b>Check out: </b> Before {this.props.details.checkOutTime}
              </li>
              <li className='details-list-text'>
                <b>Cancellation policy: </b> {this.props.details.cancellationPolicy}
              </li>
            </ul>
            <ul className='col-2'>
              <li className='details-list-text'>
                <b>On arrival: </b> {this.props.details.onArrival}
              </li>
              <li className='details-list-text'>
                <b>Minimum nights: </b> {this.props.details.checkInTime} night
              </li>
              <li className='details-list-text'>
                <b>Accepts bookings: </b> {this.props.pricing.monthsOutForBooking} months out
              </li>
              <li className='details-list-text'>
                <b>Weeknight discount: </b> {this.props.pricing.weeknightDiscount * 100}% off
              </li>
            </ul>
            <div className='detail-responses'>
              <ul className='col-1'>
                <li className='details-list-text'>
                  <b>Response time: </b>Within {this.props.details.responseTime} hours
              </li>
                <li className='details-list-text'>
                  <b>Response rate: </b> {100 * this.props.details.responseRate}%
              </li>
              </ul>
            </div>
          </div>
        </section>
      )
    }
  }
}

export default Details;