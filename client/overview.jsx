// import './style.css';
import axios from 'axios';
// import React from 'react';
// import ReactDOM from 'react-dom';
import config from '../server/config.js';

import Header from './Components/header.jsx';
import StickyHeader from './Components/stickyheader.jsx';
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
      showModal: false,
      headerInView: true
    }
    this.fetchOverview();
    this.clickModal = this.clickModal.bind(this);
    this.headerState = this.headerState.bind(this);
  }

  headerState(headerInView) {
    console.log(`sticky header ${this.state.headerInView ? 'showing' : 'hiding'}`);
    this.setState({
      headerInView
    });
  };

  fetchOverview() {
    let url = {};
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = config.dev;
    } else {
      url = config.production;
    }
    console.log('node env ', process.env.NODE_ENV, '   urls for get ', url);
    return axios.get(`${url.overview}overview/all`, { params: { campId: this.state.campId } })
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
        // console.log(this.state);
      })
      .catch(error => {
        console.log('------ERROR IN FETCH OVERVIEW------');
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  clickModal(e) {
    e.preventDefault();
    console.log('overview-modal clicked');
    if (this.state.showModal) {
      document.body.classList.remove('overview-modal-open');
    } else {
      document.body.classList.add('overview-modal-open');
    }
    this.setState(prev => ({
      showModal: !prev.showModal
    }));

  }

  render() {
    if (this.state.fetched && this.state.mounted) {
      return (
        <div className={`main`}>
          <header>
            <title>{this.state.siteName}</title>
          </header>
          <div className='header-bar'>
            <Header header={this.state.header} siteName={this.state.siteName} location={this.state.location} clickModal={this.clickModal} setHeaderStatus={this.headerState} hide={this.state.headerInView} />
          </div>
          <StickyHeader header={this.state.header} siteName={this.state.siteName} location={this.state.location} clickModal={this.clickModal} hide={this.state.headerInView} />
          <div className='overview'>
            <div className='two-thirds'>
              <Description description={this.state.description} owner={this.state.owner} clickModal={this.clickModal} />
              <div className='tri-card'>
                <Lodging lodging={this.state.lodging} clickModal={this.clickModal} />
                <Essentials essentials={this.state.essentials} clickModal={this.clickModal} />
                <Amenities amenities={this.state.amenities} clickModal={this.clickModal} />
              </div>
              <div className='contact-host'>
                <b>Have a question? </b><a className='contact-host-link' onClick={this.clickModal}>Send {this.state.owner.name} a message!</a>
              </div>
              <Details details={this.state.details} pricing={this.state.pricing} clickModal={this.clickModal} />
            </div>
          </div>
          {this.state.showModal
            ? <div className='overview-modal fade in' style={{ display: 'block' }}><ProModal clickModal={this.clickModal} /> </div>
            : <div className='overview-modal fade' style={{ display: 'none' }}><ProModal clickModal={this.clickModal} /> </div>
          }
          {this.state.showModal && <div className="overview-modal-backdrop fade in" />}
        </div>
      )
    }

    return null
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));