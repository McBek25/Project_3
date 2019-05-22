import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const flightNumbersWrapper = styled.div`
    -webkit-stroke-color: white;
    color: #292624;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family:'Oswald', sans-serif;


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
        
        const recyclingProduced = this.state.newFlightNumber.recyclingProduced
        e.preventDefault() 
        this.state.newFlightNumber.crewMembers.split(",").forEach(memberNumber => {
            axios.get(`/api/v1/member/number/${memberNumber}`)
            .then(res => {
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
            <flightNumbersWrapper>
                <h1>Flight Numbers</h1>
                {
                    this.state.flightNumbers.map(flightNumber => {
                        return (
                            <div key={flightNumber._id}>
                                <Link  to={`/${flightNumber._id}`}>
                                   
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
                                <label htmlFor="Number"></label>
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
                            <button>Create</button>
                        </form>
                        : null
            }  
            </flightNumbersWrapper>  
        )
    }        
}

export default FlightNumbers 