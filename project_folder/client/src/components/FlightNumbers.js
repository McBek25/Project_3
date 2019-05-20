import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class FlightNumbers extends Component {
    state = {
        flightNumbers: [],
        newFlightNumber: {
            number: '',
            crewMembers: [],
            planeType: '',
            recyclingProduced: ''
        },
        isFlightNumberFormDisplayed: false
    }


    componentDidMount = () => {
        axios.get('/api.v1').then(res => {
            this.setState({ flightNumbers: res.data })
        })
    }

    toggleFlightNumberForm = () => {
        this.setState((state, props) => {
            return ({ isFlightNumberFormDisplayed: !state.isFlightNumberFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewFlightNumber = { ...this.state.newFlightNumber }
        cloneNewFlightNumber[e.target.name] = e.target.value
        this.setState({ newFlightNumber: cloneNewFlightNumber })
    }

    createFlightNumber = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1', {
                number: this.state.newFlightNumber.number,
                crewMembers: this.state.newFlightNumber.crewMembers,
                planeType: this.state.newFlightNumber.planeType,
                recyclingProduced: this.state.newFlightNumber.recyclingProduced
            })
        .then(res => {
            const flightNumbersList = [...this.state.flightNumbers]
            flightNumbersList.unshift(res.data)
            this.setState({
                newFlightNumber: {
                    number: '',
                    crewMembers: [],
                    planeType: '',
                    recyclingProduced: ''
                },
                isFlightNumberFormDisplayed: false,
                flightNumbers: flightNumbersList
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Flight Numbers</h1>
                {
                    this.state.flightNumbers.map(flightNumber => {
                        return (
                            <div key={flightNumber._id}>
                                <Link>
                                    to={`/$flightNumber._id}`}
                                    {flightNumber.number}
                                </Link>
                            </div>

                        )
                    })
                }
                <button onClick = {this.toggleFlightNumberForm}> + New Flight Number</button>
                {
                    this.state.isFlightNumberFormDisplayed
                        ? <form onSubmit = {this.createFlightNumber}> 
                            <div>
                                <label htmlFor = "Number"></label>
                                <input
                                    id="number"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.number}
                                /> 
                            </div>
                            <div>
                                <label htmlFor="crewMembers">Crew Members</label>
                                <input
                                    id="number"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.crewMembers}
                                />
                            </div>
                            <button>Create</button>
                        </form>
                        : null
            }  
            </div>  
        )
    }        
}

export default FlightNumbers 