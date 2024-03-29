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

  componentDidMount() {
    this.handleLoggedIn();
    this.getUserSavedResources();
  }


  getOpenData = (fetchUrl) => {
    if (fetchUrl !== null) {
    fetch(fetchUrl)
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        alert('You have no saved resources. Add one and try again!')
      } else {
        this.setState({
          dataFetchStatus: true,
          apiResults: res
        })
        this.changedataFetchClicked();
      }
    })
    .catch((err) => {
      this.setState({ dataFetchError: true});
      console.log(err);
    })
  }
}

  constructFetchUrlFromSavedResource = () => {
    return `https://data.cityofnewyork.us/resource/kvhd-5fmu.json?$where=unique_id_number%20in%20(${this.state.userSavedResults.toString()})`
  }

  constructCustomFetchUrl = () => {
    if (this.state.programQuery.selectedOption && this.state.ageQuery.selectedOption) {
      if (this.state.programQuery.selectedOption.value === "Child Care") {
        return 'https://data.cityofnewyork.us/resource/kvhd-5fmu.json?program_category=Child%20Care'
      } else {
      return `https://data.cityofnewyork.us/resource/kvhd-5fmu.json?$where=program_category%20like%20%27${this.state.programQuery.selectedOption.value}%27AND%20(population_served%20like%20%27%25${this.state.ageQuery.selectedOption.value}%25%27%20or%20population_served%20like%20%27Everyone%27or%20age_group%20like%20%27%25${this.state.ageQuery.selectedOption.value}%25%27)`
      }
    }
    else {
      alert('Select search options.');
      return null;}
  }

  getUserSavedResources = () => {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('userToken') !== "undefined") {
      fetch('http://3.91.249.13:8081/user/resources/list', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
          'Content-Type' : 'application/json'
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({userSavedResults: []})
        res.map(resource => {
          this.setState({
            userSavedResults: [...this.state.userSavedResults, `\"${resource.uniqueIdNumber}\"`]
          })
        })
      })
      // .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)})
      }
  }

  logIntoApp = () => {
    fetch('http://3.91.249.13:8081/user/login', {
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
      localStorage.setItem('userToken', res.token)
      this.handleLoggedIn();
    })
    .catch((err) => {
      console.log(err);
      })
  }

  signUp = () => {
    fetch('http://3.91.249.13:8081/user/signup/', {
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
      localStorage.setItem('userToken', res.token)
      this.handleLoggedIn();
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
    fetch('http://3.91.249.13:8081/resource/add', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
    .then((res) => {console.log(res)})
    .then((res) => {this.saveResourceToUser(uniqueIdNumber, programCategory)})
    .catch((err) => {console.log(err)})
  } else {
    alert('You must be logged in to do this.');}
  }

  saveResourceToUser = (uniqueIdNumber, programCategory) => {
    console.log('add resource to user triggered');
    const apiName = "Benefits and Programs API";
    const apiResourceJson = "kvhd-5fmu.json";

    fetch('http://3.91.249.13:8081/user/add', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
    .then((res) => {
      this.getUserSavedResources();
      alert('Resource successfully added.');
    })
    .catch((err) => {console.log(err)})
  }

  deleteResourceToUser = (uniqueIdNumber, programCategory) => {
    console.log('delete resource to user triggered');
    const apiName = "Benefits and Programs API";
    const apiResourceJson = "kvhd-5fmu.json";

    fetch('http://3.91.249.13:8081/user/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
    .then((res) => {
      this.getUserSavedResources();
      alert('Resource successfully deleted.');
    })
    .catch((err) => {console.log(err)})
  }

  fetchCustomQuery = () => {
    this.getOpenData(this.constructCustomFetchUrl());
    console.log(this.constructCustomFetchUrl());
  }

  handleLoggedIn = () => {
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken') !== "undefined" ?
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
          handleLoggedIn = {() => this.handleLoggedIn()}
          handleLogInClick = {() => this.handleLogInClick()}
          handleSignUpClick = {() => this.handleSignUpClick()}
          getUserSavedResources = {() => {this.getOpenData(this.constructFetchUrlFromSavedResource())}}/>
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
                userSavedResults = {this.state.userSavedResults}
                key = {index}
                result={result}
                addResourceToDb = {this.addResourceToDb}
                deleteResourceToUser = {this.deleteResourceToUser}
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
