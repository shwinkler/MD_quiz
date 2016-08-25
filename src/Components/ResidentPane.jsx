const React = require('react');
const jwtDecode = require('jwt-decode');
import { Link } from 'react-router';
import store from './../store';
const stateLossActions = require('./../actions/stateLossActions.js');

const ResidentPane = React.createClass({

  getInitialState() {
    return ({
      dailyQuestionData: [],
    });
  },

  setResidentState(stateObj) {
    this.setState(stateObj);
  },

  componentWillMount() {
    // check to see if there is state in app
    // if (this.props.getState.firstName === '') {
    if (store.getState().userState.firstName === '') {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      const noStateAction = stateLossActions.noUserState(token);
      store.dispatch(noStateAction);
      // this.props.setAppState(token);
    }
  },

  render() {
    return (
      <div className='residentPane md-width-70 lg-width-30'>
        <p id="userFirstName">Hi {store.getState().userState.firstName}!
          <Link className='homeIcon' to='/resident/'>
            <i className='material-icons md-36 md-dark'>
            home
            </i>
          </Link>
        </p>
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.props.setAppState,
            getState: this.props.getState,
            setResidentState: this.setResidentState,
            residentState: this.state })}
      </div>
    );
  },
});

module.exports = ResidentPane;

