import React, { Component } from 'react';
import { Row, Spinner, Jumbotron } from 'reactstrap';


// Custom components
import TopNav from './Nav';
import ExampleSearch from './ExampleSearch';
import MainSearch from './MainSearch';
import SearchResults from './SearchResults';
import Footer from './Footer';
import LogInModal from './LogInModal';
import SignUpModal from './SignUpModal';

import examples from '../data/examples';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
      },
      signUpClicked : false,
      logInClicked: false,
      loggedIn: false,
      dataFetchStatus: false,
      dataFetchError: false,
      dataFetchClicked : false,
      results: [],
      ageGroup: '',
      resource: ''
    }
  }

  getOpenData = (fetchUrl) => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      this.setState({
        dataFetchStatus: true,
        results: res
      })
    })
    .catch((err) => {
      this.setState({ dataFetchError: true});
      console.log(err);
    })
  }

  logIntoApp = () => {
    fetch('/user/login', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: this.state.user.username,
        password: this.state.user.password
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      this.setState({
        user: { ...this.state.user, res}
        })
      this.handleLoggedIn();
    })
    .catch((err) => {
      console.log(err);
      })
  }

  signUp = () => {
    fetch('/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        email: this.state.user.email,
        username: this.state.user.username,
        password: this.state.user.password
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      this.setState({
        user: { ...this.state.user, res}
        })
      this.handleLoggedIn();
    })    .catch((err) => {
      console.log(err);
    })
  }

  handleLoggedIn = () => {
    this.state.user.res.token !== null && this.state.user.res.error != "IM Used"?
    this.setState({loggedIn: true}) :
    this.setState({loggedIn: false})
  }

  changedataFetchClicked = () => {
    this.setState({ dataFetchClicked : true })
  }

  handleLogInClick = () => {
    this.setState({logInClicked: !this.state.logInClicked})
  }

  handleSignUpClick = () => {
    this.setState({signUpClicked: !this.state.signUpClicked})
  }

  handleUsernameChange = (e) => {
    this.setState({user: { ...this.state.user,
      username: e.target.value}}
    )
  }

  handlePasswordChange = (e) => {
    this.setState({
      user : { ...this.state.user,
      password: e.target.value}})
  }

  handleEmailChange = (e) => {
    this.setState({
      user: { ...this.state.user,
      email: e.target.value}
    })
  }

  handleFirstNameChange = (e) => {
    this.setState({
      user: { ...this.state.user,
      firstName: e.target.value}
    })
  }

  handleLastNameChange = (e) => {
    this.setState({
      user: { ...this.state.user,
      lastName: e.target.value}
    })
  }

  render() {
    return (
      <div>
        <TopNav
          loggedInStatus = {this.state.loggedIn}
          handleLogInClick = {() => this.handleLogInClick()}
          handleSignUpClick = {() => this.handleSignUpClick()}/>
        <MainSearch/>
        {this.state.logInClicked ?
          <LogInModal
          username= {this.state.username}
          password = {this.state.password}
          handleLogInClick = {() => this.handleLogInClick()}
          logIntoApp = {() => this.logIntoApp()}
          handleUsernameChange = {this.handleUsernameChange}
          handlePasswordChange = {this.handlePasswordChange}
          /> : ' '
        }
        {this.state.signUpClicked ?
          <SignUpModal
          username= {this.state.username}
          password = {this.state.password}
          handleSignUpClick = {() => this.handleSignUpClick()}
          signUp = {() => this.signUp()}
          handleUsernameChange = {this.handleUsernameChange}
          handlePasswordChange = {this.handlePasswordChange}
          handleFirstNameChange = {this.handleFirstNameChange}
          handleLastNameChange = {this.handleLastNameChange}
          handleEmailChange = {this.handleEmailChange}
          /> : ' '
        }
        <h2>Check out these examples</h2>
        <Row>
        {examples.map((query, index) =>
          <ExampleSearch
            key={index}
            title={query.title}
            text={query.text}
            onClick={() => {this.getOpenData(query.fetchUrl); this.changedataFetchClicked()}}/>
        )}
        </Row>
        {this.state.dataFetchClicked ?
          <Jumbotron
            style = {{marginBottom:'0'}}>
          <h3>{this.state.results.length} RESULTS </h3>
          {this.state.dataFetchClicked ? this.state.dataFetchStatus ?
            this.state.results.map((result, index) => {
              return (
              <SearchResults key = {index} result={result}/>
              )
            }) :
            <Spinner style={{ width: '3rem', height: '3rem' }} />
            : ' ' }
          </Jumbotron>
          :
          " " }
        <Footer/>
      </div>
    )
  }
}

export default Page;
