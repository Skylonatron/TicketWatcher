import React from "react"
import PropTypes from "prop-types"
class EventSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {search: '', events: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event){
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    $.ajax({
      method: 'GET',
      url: "/get_events?event=" + this.state.search,
      context: this,
      success: function(data) {
        console.log(data)
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
          <div>
            Description: {event.description}
          </div>
        )
      })
    }

    return parsedEvents
  }

  render () {
    var events = (this.state.events.length == 0) ? null : this.parseEvents(this.state.events.events)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event:
            <input type="text" value={this.state.search} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {events}
      </div>
    );
  }
}

EventSearch.propTypes = {
  // greeting: PropTypes.string
};

export default EventSearch
