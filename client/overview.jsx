import './style.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Description from './Components/description.jsx';
import Lodging from './Components/lodging.jsx';
import Essentials from './Components/essentials.jsx';
import Amenities from './Components/lodging.jsx';
import Details from './Components/details.jsx';


class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      campId: 0,
      siteName: 'Twisselman Ranch',
      owner: '',
      description: '',
      lodging: '',
      pricing: '',
      details: '',
      owner: '',
      location: '',
      essentials: '',
      amenities: '',
      header: ''
    }
    this.fetchOverview();
  }

  fetchOverview() {
    return axios.get('http://localhost:3003/overview/all', { params: { campId: this.state.campId } })
      .then(response => {
        // console.log('Response for get overview', response.data);
        const overview = response.data;
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
          header: overview.header
        });
        console.log(this.state)
      });
  }

  componentDidMount() {
    // this.fetchOverview();
    console.log('rendered')
  }

  render() {
    return (
      <div id='main'>
        <header>
          <title>{this.state.siteName}</title>
        </header>
        <h1>{this.state.siteName}</h1>
        <div className="recommend-percentage" data-placement="bottom" data-toggle="tooltip" title="" data-original-title="This recommendation is based on responses from the Hipcamp community members  who have verified stays at this listing.">
          <span className="icon fa fa-thumbs-up"></span> {Math.trunc(100*this.state.header.percentRec)}% <span className="recommend-text">Recommend</span>
        </div>
        <Description description={this.state.description} owner={this.state.owner} />
        <div id='tri-card'>
        <Lodging lodging={this.state.lodging} />
        <Essentials essentials={this.state.essentials} />
        <Amenities amenities={this.state.amenities} />
        </div>
        <Details details={this.state.details} />
      </div>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));