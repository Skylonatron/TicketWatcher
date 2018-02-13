import React from "react"
import PropTypes from "prop-types"

class EventListing extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    var date = new Date(this.props.date)
    this.state.monthWord = this.monthArray()[date.getUTCMonth()]
    this.state.dayNumber = date.getUTCDate()
    this.state.dayWord = this.weekdayArray()[date.getDay()]
    this.state.time = this.getPrettyTime(date)
    this.state.venueName = this.props.venue.name
    this.state.venueCity = this.props.venue.city
    this.state.venueState = this.props.venue.state

  }

  componentDidMount() {
    
  }

  getPrettyTime(date) {
    var hour = date.getHours()

    if(hour > 12){
      return (hour-12) + ":00" + " PM"
    }
    else{
      return (hour) + ":00" + " AM"
    }
  }

  weekdayArray() {
    var weekday = new Array(7);
    weekday[0] =  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return weekday
  }

  monthArray() {
    var month = new Array(12)
    month[0] = "Jan"
    month[1] = "Feb"
    month[2] = "Mar"
    month[3] = "Apr"
    month[4] = "May"
    month[5] = "June"
    month[6] = "July"
    month[7] = "Aug"
    month[8] = "Sep"
    month[9] = "Oct"
    month[10] = "Nov"
    month[11] = "Dec"

    return month
  }

  render () {
    return (
      <a href={"/events/" + this.props.id} className="event-listing-container-link">
        <div className="event-listing-container">
          <div className="event-listing-date-container">
            <div className="event-listing-day-word">
              {this.state.dayWord}
            </div>
            <div>
              {this.state.monthWord + " " + this.state.dayNumber}
            </div>
          </div>
          <div className="event-listing-info-container">
            <div className="event-listing-title">
              {this.props.name}
            </div>
            <div>
              {this.state.time + " " + this.state.venueName + ", " + this.state.venueCity + ", " + this.state.venueState}
            </div>          
          </div>
        </div>
      </a>
    );
  }
}

EventListing.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string
};

export default EventListing
