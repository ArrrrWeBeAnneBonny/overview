import css from './style.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/header.jsx'
import Description from './Components/description.jsx';
import Lodging from './Components/lodging.jsx';
import Essentials from './Components/essentials.jsx';
import Amenities from './Components/amenities.jsx';
import Details from './Components/details.jsx';

console.log(css)
class Overview extends React.Component {
  constructor(props) {
    super(props);
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
      fetched: false
    }
    this.fetchOverview();
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
    this.state.mounted = true;
  }

  render() {
    console.log(this.state)

    if (this.state.fetched && this.state.mounted) {
      return (
        <div className='main'>
          <header>
            <title>{this.state.siteName}</title>
          </header>
          <h1>{this.state.siteName}</h1>
          <Header header={this.state.header} />
          <div className='two-thirds'>

            <Description description={this.state.description} owner={this.state.owner} />

            <div className='tri-card'>
              <Lodging lodging={this.state.lodging} />
              <Essentials essentials={this.state.essentials} />
              <Amenities amenities={this.state.amenities} />
            </div>
            <div className='contact-host'>
              <b>Have a question? </b><a className='contact-host-link'>Send {this.state.owner.name} a message!</a>
            </div>
            <Details details={this.state.details} pricing={this.state.pricing} />
          </div>
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

ReactDOM.render(<Overview />, document.getElementById('overview')); 1