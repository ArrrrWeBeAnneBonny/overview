class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Twisselman Ranch'
    }
  }

  componentDidMount() {
    axios.get('/overview', {params: {campId: 14}})
      .then(response => {
        console.log('Response for get overview', response);
      })
      .catch(error => {
        console.log('ERROR in get ', error);
      })

      axios.get('/overview/?campId=55')
      .then(response => {
        console.log('Response for get overview ?', response);
      })
      .catch(error => {
        console.log('ERROR in get ', error);
      })

      axios.get('/overview/')
      .then(response => {
      })
      .catch(error => {
        console.log('ERROR in get ', error);
      })
  }

  render() {
    return (
      <>
      <header>
        <title>{this.state.title}</title>
      </header>
      <h1>Let's Get Down To Business</h1>
      </>
    )
  }
}

ReactDOM.render(<Overview />, document.getElementById('overview'));