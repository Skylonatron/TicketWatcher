
import React from "react"
import PropTypes from "prop-types"

class EventWatch extends React.Component {
  constructor(props){
    super(props);
    this.state = {price: ''};

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    $('#flip-me').flip({trigger:'manual'});
    // $('.back').show();
  }

  watchEvent(event) {
    $("#flip-me").flip(true);
    event.preventDefault();
  }

  modifyPrice() {
    $("#flip-me").flip(false);
  }

  handleChange(event){
    this.setState({price: event.target.value});
  }


  // <i class="material-icons user-icons">vpn_key</i>
  //   <%= f.password_field :password, class: "user-field", autocomplete: "off", placeholder: "Password" %>

  render () {
    return (
      <div id="flip-me" className="block-2">
        <div className="align-center front relative blue flip-div align-center">
          <i className="material-icons event-alert-image">notifications_none</i>
          <div>
          Set minimum price to get notified.
          </div>
          <form onSubmit={this.watchEvent}>
            <div className="event-watch-field-container">
              <i class="material-icons user-icons">attach_money</i>
              <input type="text" className="user-field" value={this.state.price} onChange={this.handleChange} />

            </div>
            <div>
              <br></br>
              <button type="submit">
                Watch
              </button>
            </div>
          </form>
        </div>
        <div className="align-center back absolute blue flip-div-back">
          <i className="material-icons event-alert-image">notifications_active</i>
          <div>
            {"Watch Price:" + this.state.price}
          </div>
          <div>
            <button type="submit" onClick={this.modifyPrice}>
              Modify
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventWatch
