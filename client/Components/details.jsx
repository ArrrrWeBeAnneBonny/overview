import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.details, this.props.pricing);
    if (this.props.pricing.instantBook) {
      return (
        <div className='details' >
          <div className='details-title'>Details</div>
          <ul className='details-list col-1'>
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
          <ul className='details-list col-2'>
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
        </div >)
    } else {
      return (
        <div className='details' >
          <div className='details-title'>Details</div>
          <ul className='details-list col-1'>
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
          <ul className='details-list col-2'>
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
            <ul className='details-list col-1'>
              <li className='details-list-text'>
                <b>Response time: </b>Within {this.props.details.resonseTime} hours
              </li>
              <li className='details-list-text'>
                <b>Response rate: </b> {100*this.props.details.resonseRate}%
              </li>
            </ul>
          </div>
        </div >
      )
    }
  }
}

export default Details;