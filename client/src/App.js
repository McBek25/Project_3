import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import FlightNumbers from './components/FlightNumbers'
import SingleFlightNumber from './components/SingleFlightNumber'
import CrewMembers from './components/CrewMembers'
import SingleCrewMember from './components/SingleCrewMember'
import styled from 'styled-components'

const AppWrapper = styled.div`
a {
        color: #292624;
        font-weight: 700;
    }
a:hover {
  color: white;
}

`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Router>
          <div>
          <ul className="nav justify-content-end">
              <li className="nav-item"><Link className="nav-link active" as="a" to="/">Flight Numbers</Link></li>
              <li className="nav-item"><Link className="nav-link active" as="a" to="/crew">Crew Members</Link></li>
            </ul>
            <Switch>
              <Route exact path="/" component={FlightNumbers} />
              <Route exact path="/crew" component={CrewMembers} />
              <Route path="/crew/:id" component={SingleCrewMember} />
              <Route path="/:id" component={SingleFlightNumber} />
            </Switch>
          </div>
        </Router>
      </AppWrapper>
    )
  }
}

export default App;
