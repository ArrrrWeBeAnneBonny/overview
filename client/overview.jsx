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
      siteName: 'Twisselman Ranch'
    }
    this.fetchOverview();
  }

  fetchOverview() {
    return axios.get('/overview/all', { params: { campId: this.state.campId } })
    .then(response => {
      console.log('Response for get overview', response.data);
      const overview = response.data;
      this.setState({
        siteName: overview.name,
        owner: overview.owner
      });
      // console.log(this.state)
    });
  }

  componentDidMount() {
    // this.fetchOverview();
    console.log('rendered')
  }

  render() {
    return (
      <div>
      <header>
        <title>{this.state.siteName}</title>
      </header>
      <h1>{this.state.siteName}</h1>

      <Description />
      <Lodging />
      <Essentials />
      <Amenities />
      <Details />
      </div>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));
