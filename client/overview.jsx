// import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
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
      title: 'Twisselman Ranch'
    }
  }

  componentDidMount() {
    axios.get('/overview/all', {params: {campId: this.state.campId}})
      .then(response => {
        console.log('Response for get overview', response.data);
        const overview = response.data;
        console.log(overview.name)
        this.setState({
          siteName: overview.name,
        });
      })
      .catch(error => {
        console.log('Error in the get request :', error);
      })
  }

  render() {
    return (
      <>
      <header>
        <title>{this.state.siteName}</title>
      </header>
      <h1>{this.state.siteName}</h1>

      <Description />
      <Lodging />
      <Essentials />
      <Amenities />
      <Details />
      </>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));