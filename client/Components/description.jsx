import React from 'react';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false
    }
  }

  render() {
    if (this.state.readMore) {
      return (
        <div className='owner-description'>
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
            {this.props.description}
            <a class="underlined" data-reveal-full-description="" href="#"><strong>Read more...</strong></a>
          </div>
        </div>
      )
    } else {
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
            {this.props.description}

          </div>
        </section>
      )
    }
  }
}
  export default Description;