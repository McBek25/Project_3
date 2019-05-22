import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import FlightNumbers from './components/FlightNumbers'
import SingleFlightNumber from './components/SingleFlightNumber'
import CrewMembers from './components/CrewMembers'
import SingleCrewMember from './components/SingleCrewMember'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Link to="/">Flight Numbers</Link>
          <Link to="/crew">Crew Members</Link>
          <Switch>
            <Route exact path = "/" component = {FlightNumbers}/>
            <Route exact path = "/crew" component = {CrewMembers}/>
            <Route path = "/crew/:id" component = {SingleCrewMember}/>
            <Route path = "/:id" component = {SingleFlightNumber}/> 
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
