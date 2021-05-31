import React from 'react';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false,
      fullDescription: '',
      shortDescription: ''
    };

    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.setDescription();
  }

  setDescription() {
    if (this.props.description.length > 500) {
      let shortened = this.props.description.slice(0, 365);
      this.setState({
        shortDescription: shortened,
        fullDescription: this.props.description,
        readMore: true
      })
    }
  }

  parseDescription(description) {
    let paragraphs = description.split('\n');

    return (
        <span>
          {paragraphs.map((para, key) =>{
            if(key === paragraphs.length - 1) {
            return para + ' ';
            }
            return (<p key={key}>{para}</p>)
          })}
        </span>
    )
  }

  showMore() {
      console.log('clicked!');
      this.setState({
        readMore: false
      });
  };


  render() {
    return (
      <section className='owner-description'>
        <div className='owner'>
          <div className='owner-photo'>
            <img src={this.props.owner.imageUrl}></img>
            <span className="star-host-badge" ><i className="fa fa-star"></i></span>
          </div>
          <div className='owner-name'>
            <div className='medium'>Hosted by </div>
            {this.props.owner.name}
          </div>
        </div>
        <div className='two-thirds description'>
          <div className="covid-guidelines"><span className="icon fa fa-check"></span> {this.props.owner.name} has self-certified that Hipcamp’s COVID-19 Safety Standards have been  implemented at this listing. See what’s being done <a target="_blank" href="https://support.hipcamp.com/hc/en-us/articles/360043415632">here</a>. </div>
          {this.state.readMore
            ? <div className='shortened'>{this.parseDescription(this.state.shortDescription)}<a className="underlined bold" onClick={this.showMore}> Read more...</a></div>
            : <div className='long'>
              {this.parseDescription(this.props.description)}</div>}
        </div>
      </section>
    )
  }
}
export default Description;