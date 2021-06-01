import './style.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/header.jsx'
import Description from './Components/description.jsx';
import Lodging from './Components/lodging.jsx';
import Essentials from './Components/essentials.jsx';
import Amenities from './Components/amenities.jsx';
import Details from './Components/details.jsx';
import ProModal from './Components/promodal.jsx';

class Overview extends React.Component {
  constructor() {
    super();
    let query = new URLSearchParams(document.location.search);
    this.state = {
      campId: query.get('campId') ? query.get('campId') : 0,
      siteName: '',
      description: '',
      owner: {},
      lodging: {},
      pricing: {},
      details: {},
      location: {},
      essentials: {},
      amenities: {},
      header: {},
      mounted: false,
      fetched: false,
      showModal: false
    }
    this.fetchOverview();
    this.clickModal = this.clickModal.bind(this);
  }


  fetchOverview() {
    return axios.get('http://localhost:3003/overview/all', { params: { campId: this.state.campId } })
      .then(response => {
        // console.log('Response for get overview', response.data);
        const overview = response.data;
        if (this.state.mounted) {
          this.setState({
            siteName: overview.name,
            owner: overview.owner,
            description: overview.description,
            lodging: overview.lodging,
            pricing: overview.pricing,
            details: overview.details,
            owner: overview.owner,
            location: overview.location,
            essentials: overview.essentials,
            amenities: overview.amenities,
            header: overview.header,
            fetched: true
          });
        }

      })
      .catch(error => {
        console.log('------ERROR IN FETCH OVERVIEW------');
        console.log(error);
      })
  }

  componentDidMount() {
    console.log('rendered');
    this.setState({
      mounted: true
    });
  }

  clickModal(e) {
    e.preventDefault();
    console.log('modal clicked');
    if (this.state.showModal) {
      document.body.classList.remove('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }
    this.setState(prev => ({
      showModal: !prev.showModal
    }));

  }

  render() {
    console.log(this.state)

    if (this.state.fetched && this.state.mounted) {
      return (
        <div className={`main`}>
          <header>
            <title>{this.state.siteName}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          </header>
          <div className='header-bar'>
            <Header header={this.state.header} siteName={this.state.siteName} location={this.state.location} />
          </div>
          <div className='overview'>
            <div className='two-thirds'>
              <Description description={this.state.description} owner={this.state.owner} />
              <div className='tri-card'>
                <Lodging lodging={this.state.lodging} />
                <Essentials essentials={this.state.essentials} />
                <Amenities amenities={this.state.amenities} />
              </div>
              <div className='contact-host'>
                <b>Have a question? </b><a className='contact-host-link' onClick={this.clickModal}>Send {this.state.owner.name} a message!</a>
              </div>
              <Details details={this.state.details} pricing={this.state.pricing} />
            </div>
          </div>
          {this.state.showModal
            ? <div className='modal fade in' style={{ display: 'block' }}><ProModal clickModal={this.clickModal} /> </div>
            : <div className='modal fade' style={{ display: 'none' }}><ProModal clickModal={this.clickModal} /> </div>
          }
          {this.state.showModal && <div className="modal-backdrop fade in" />}
        </div>
      )
    } else {
      return (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));