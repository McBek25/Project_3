import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FlightNumbers from './components/FlightNumbers'
import SingleFlightNumber from './components/SingleFlightNumber'


class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path = "/" component = {FlightNumbers}/>
            <Route path = "/:id" component = {SingleFlightNumber}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
