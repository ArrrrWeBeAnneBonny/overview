import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Twisselman Ranch'
    }
  }

  componentDidMount() {
    axios.get('/overview', {params: {campId: this.state.campId}})
      .then(response => {
        console.log('Response for get overview', response.data);
        const overview = response.data;
        console.log(overview.name)
        this.setState({
          siteName: overview.name,
        });
      })
      .then(response => {
        console.log('Response for get location', response.data);
        return axios.get('/overview/owner', { params: { campId: this.state.campId } })
      })
  }

  render() {
    return (
      <>
      <header>
        <title>{this.state.siteName}</title>
      </header>
      <h1>{this.state.siteName}</h1>
      </>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));