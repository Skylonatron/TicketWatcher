import React from "react"
import PropTypes from "prop-types"
import EventListing from './EventListing'


class EventSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {search: '', events: '', loading: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    
  }

  handleChange(event){
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    this.setState({loading: true})
    $.ajax({
      method: 'GET',
      url: "/get_events?event=" + this.state.search,
      context: this,
      success: function(data) {
        this.setState( {loading: false} );
        this.setState( {events: data} );
      },
      error: function(error) { 
        console.log("error" + error); 
      }
    });
    event.preventDefault();
  }

  parseEvents(events) {
    console.log("ParseEvents: ")
    console.log(events)
    if(events.length == 0){
      var parsedEvents = <div> Could not find any events. </div>
    }
    else{
      var parsedEvents = events.map((event) => {
        return(
          <EventListing name={event.name} date={event.eventDateLocal} venue={event.venue} id={event.id}/>
        )
      })
    }

    return <div className="events-container col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 no-pad"> {parsedEvents} </div>
  }

  render () {
    var loading = this.state.loading ? <div class="loader col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10"></div> : null ;
    var events = (this.state.events.length == 0) ? null : this.parseEvents(this.state.events.events)
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="search-bar-container">
            <input type="text" value={this.state.search} placeholder="Search for events" onChange={this.handleChange} className="search-bar" />
            <button type="submit" className="search-bar-submit">
              <i className="material-icons search-bar-submit-image">search</i>
            </button>
        </form>
        {loading}
        {events}
      </div>
    );
  }
}

EventSearch.propTypes = {
  // greeting: PropTypes.string
};

export default EventSearch
