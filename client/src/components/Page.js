import React, { Component } from 'react';
import { Row, Spinner, Jumbotron } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';



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
    this.myRef = React.createRef();

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
      apiResults: [],
      userSavedResults : [],
      ageQuery: {},
      programQuery: {}
    }
  }

  getOpenData = (fetchUrl) => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      this.setState({
        dataFetchStatus: true,
        apiResults: res
      })
    })
    .catch((err) => {
      this.setState({ dataFetchError: true});
      console.log(err);
    })
  }

  constructFetchUrlFromSavedResource = () => {
    return `https://data.cityofnewyork.us/resource/kvhd-5fmu.json?$where=unique_id_number%20in%20(${this.state.userSavedResults.toString()})`
  }

  constructCustomFetchUrl = () => {
    if (this.state.programQuery.selectedOption && this.state.ageQuery.selectedOption) {
      return `https://data.cityofnewyork.us/resource/kvhd-5fmu.json?$where=program_category%20like%20%27${this.state.programQuery.selectedOption.value}%27AND%20(population_served%20like%20%27%25${this.state.ageQuery.selectedOption.value}%25%27%20or%20population_served%20like%20%27Everyone%27)`
    } else { alert('Select search options.')}
  }

  getUserSavedResources = () => {
    fetch('/user/resources/list', {
      headers: {
        'Authorization': 'Bearer ' + this.state.user.res.token,
        'Content-Type' : 'application/json'
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.map(resource => {
        this.setState({
          userSavedResults: [...this.state.userSavedResults, `\"${resource.uniqueIdNumber}\"`]
        })
      })
      this.getOpenData(this.constructFetchUrlFromSavedResource());
      this.changedataFetchClicked();
    })
    .catch((err) => {console.log(err)})
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
      localStorage.setItem('userToken', res.token)
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
      localStorage.setItem('userToken', res.token);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  addResourceToDb = (uniqueIdNumber, programCategory) => {
    console.log('add resource to db triggered');
    const apiName = "Benefits and Programs API";
    const apiResourceJson = "kvhd-5fmu.json";

    if (this.state.loggedIn) {
    fetch('/resource/add', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.state.user.res.token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        apiName: apiName,
        apiResourceJson: apiResourceJson,
        uniqueIdNumber: uniqueIdNumber,
        programCategory: programCategory
      })
    })
    .then((res) => {return res.json()})
    .then((res) => {this.saveResourceToUser(uniqueIdNumber, programCategory)})
    .catch((err) => {console.log(err)})
  } else {
    alert('You must be logged in to do this.');}
  }



  saveResourceToUser = (uniqueIdNumber, programCategory) => {
    console.log('add resource to user triggered');
    const apiName = "Benefits and Programs API";
    const apiResourceJson = "kvhd-5fmu.json";

    fetch('/user/add', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.state.user.res.token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        apiName: apiName,
        apiResourceJson: apiResourceJson,
        uniqueIdNumber: uniqueIdNumber,
        programCategory: programCategory
      })
    })
    .then((res) => {return res.json()})
    .catch((err) => {console.log(err)})
  }

  fetchCustomQuery = () => {
    this.getOpenData(this.constructCustomFetchUrl());
    this.changedataFetchClicked();
  }

  handleLoggedIn = () => {
    this.state.user.res.token !== null && this.state.user.res.error !== "IM Used"?
    this.setState({loggedIn: true}) :
    this.setState({loggedIn: false})
  }

  changedataFetchClicked = () => {
    this.setState({ dataFetchClicked : true })
    this.myRef.current.scrollIntoView({behavior: "smooth"});
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

  handleAgeGroupQueryChange = selectedOption => {
      this.setState({
        ageQuery : { selectedOption }
      })
    };


  handleResourceQueryChange =  selectedOption  => {
    this.setState({
      programQuery : { selectedOption }
    })
  }



  render() {
    return (
      <div>
        <TopNav
          loggedInStatus = {this.state.loggedIn}
          handleLogInClick = {() => this.handleLogInClick()}
          handleSignUpClick = {() => this.handleSignUpClick()}
          getUserSavedResources = {() => this.getUserSavedResources()}/>
        <MainSearch
          ageValue = {this.state.ageQuery}
          programValue = {this.state.programQuery}
          handleAgeGroupQueryChange = {this.handleAgeGroupQueryChange}
          handleResourceQueryChange = {this.handleResourceQueryChange}
          fetchCustomQuery = {this.fetchCustomQuery}
          />
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
        <div ref={this.myRef}></div>
        {this.state.dataFetchClicked ?
          <Jumbotron
            style = {{marginBottom:'0'}}>
          <h3>{this.state.apiResults.length} RESULTS </h3>
          {this.state.dataFetchClicked ? this.state.dataFetchStatus ?
            this.state.apiResults.map((result, index) => {
              return (
              <SearchResults
                key = {index}
                result={result}
                addResourceToDb = {this.addResourceToDb}
                loggedInStatus = {this.state.loggedIn}/>
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
