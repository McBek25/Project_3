import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FlightNumbersWrapper = styled.div`
    -webkit-stroke-color: white;
    color: #292624;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family:'Oswald', sans-serif;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }

    button {
        background-color: #888582;
        border: 1px solid white;
        margin: 1em 0;
    }

    button:hover {
        background-color: white;
        color: #888582;

    }

    label {
        font-weight: 600;
        margin-right: .75em;
        font-size: 1.25em;
        color: white;
    }

    a {
        font-size: 1.25em;
    }

`

class FlightNumbers extends Component {
    state = {
        flightNumbers: [],
        newFlightNumber: {
            number: '',
            crewMembers: '',
            planeType: '',
            recyclingProduced: ''
        },
        isFlightNumberFormDisplayed: false
    }


  

    getAllFlights = () => {
        axios.get('/api/v1').then(res => {
            this.setState({ flightNumbers: res.data })
        })

    }

    componentDidMount () {
        this.getAllFlights()
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
        
        const recyclingProduced = this.state.newFlightNumber.recyclingProduced === '' ? 0 : this.state.newFlightNumber.recyclingProduced
        e.preventDefault() 
        this.state.newFlightNumber.crewMembers.split(",").forEach(memberNumber => {
            axios.get(`/api/v1/member/number/${memberNumber}`)
            .then(res => {
                console.log(res)
                let member = res.data
                member.individualRecyclingProduced += recyclingProduced
                return member
            }).then(member => axios.put(`/api/v1/member/${member._id}`, member))
        })
        axios
            .post('/api/v1', {
                number: this.state.newFlightNumber.number,
                crewMembers: this.state.newFlightNumber.crewMembers.split(','),
                planeType: this.state.newFlightNumber.planeType,
                recyclingProduced: this.state.newFlightNumber.recyclingProduced
            })
        .then(res => {
            const flightNumbersList = [...this.state.flightNumbers]
            flightNumbersList.unshift(res.data)
            this.setState({
                newFlightNumber: {
                    number: '',
                    crewMembers: '',
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
            <FlightNumbersWrapper>
                <h1>Flight Numbers</h1>
                {
                    this.state.flightNumbers.map(flightNumber => {
                        return (
                            <div key={flightNumber._id}>
                                <Link as="a" to={`/${flightNumber._id}`}>
                                   
                                    {flightNumber.number}
                                </Link>
                            </div>

                        )
                    })
                }
                <button className="btn btn-primary" onClick = {this.toggleFlightNumberForm}> + New Flight Number</button>
                {
                    this.state.isFlightNumberFormDisplayed
                        ? <form onSubmit = {this.createFlightNumber}> 
                            <div>
                                <label htmlFor="Number">Number</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="number"
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.number}
                                    /> 
                            </div>
                            <div>
                                <label htmlFor="crewMembers">Crew Members</label>
                                <input
                                    id="name"
                                    type="text"
                                   name="crewMembers"
   
 
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.crewMember}

                                />
                            </div>
                            <div>
                                <label htmlFor="planeType">Plane Type</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="planeType"
                                    
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.planeType}

                                />
                            </div>
                            <div>
                                <label htmlFor="recyclingProduced">Recycling Produced</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="recyclingProduced"
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.recyclingProduced}

                                />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        : null
            }  
            </FlightNumbersWrapper>  
        )
    }        
}

export default FlightNumbers 