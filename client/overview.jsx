class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      siteName: 'Twisselman Ranch',
      campId: 0
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
      .catch(error => {
        console.log('ERROR in get ', error);
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