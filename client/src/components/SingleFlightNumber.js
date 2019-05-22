import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import axios from "axios";

const SingleFlightNumberWrapper = styled.div`
    -webkit-stroke-color: white;
    color: #292624;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family:'Oswald', sans-serif;
    
    .flight-info{
        margin-bottom: 1em;
        font-size: 1.25em;
        font-weight: 600;
    }


    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }

    .buttons {
        display: flex;
        justify-content: space-evenly;
        margin-top: 1em;
    }

    button {
        background-color: #888582;
        border: 1px solid white;
    }

    label {
        color: white;
        margin-right: .75em;
        font-size: 1.25em;
        font-weight:600;
    }
`

class SingleFlightNumber extends Component {
    state = {
        flightNumber: {
            _id: this.props.match.params.id,
            number: '',
            crewMembers: '',
            recyclingProduced: '',
            planeType: ''
        },

        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/v1/${this.props.match.params.id}`).then(res => {
            this.setState({ flightNumber: res.data })
        })
    }

    deleteFlightNumber = () => {
        axios.delete(`/api/v1/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {

        const cloneFlightNumber = { ...this.state.flightNumber }
        cloneFlightNumber[e.target.name] = e.target.value
        this.setState({ flightNumber: cloneFlightNumber })
    }

    handleCrewMemberChange = (e) => {
        const cloneFlightNumber = { ...this.state.flightNumber }
        cloneFlightNumber[e.target.name] = e.target.value.split(",")
        this.setState({ flightNumber: cloneFlightNumber })
    }

    updateFlightNumber = (e) => {
        e.preventDefault()
        console.log(this.state.flightNumber)
        axios
            .put(`/api/v1/${this.props.match.params.id}`, this.state.flightNumber)
            .then(res => {
                this.setState({ flightNumber: res.data, isEditFormDisplayed: false })
            })
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/" />)
        } else {


            return (
                <SingleFlightNumberWrapper>

                    <h1>Single Flight Number</h1>


                    {this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateFlightNumber}>
                            <div>
                                <label htmlFor="number">Number</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="number"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.number}
                                />
                            </div>
                            <div>
                                <label htmlFor="crewMembers">Crew Members</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="crewMembers"
                                    onChange={this.handleCrewMemberChange}
                                    value={this.state.flightNumber.crewMembers}
                                />
                            </div>
                            <div>
                                <label htmlFor="planeType">Plane Type</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="planeType"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.planeType}
                                />
                            </div>
                            <div>
                                <label htmlFor="recyclingProduced">Recycling Produced</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="recyclingProduced"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.recyclingProduced}
                                />
                            </div>
                            <button className="btn btn-primary">Update</button>
                        </form>
                        : <div>
                            <div className="flight-info">
                                <div>
                                    Number: {this.state.flightNumber.number}
                                </div>
                                <div>
                                    CrewMembers: {JSON.stringify(this.state.flightNumber.crewMembers)}
                                </div>
                                <div>
                                    PlaneType: {this.state.flightNumber.planeType}
                                </div>
                                <div>
                                    RecyclingProduced: {this.state.flightNumber.recyclingProduced}
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="btn btn-primary" onClick={this.toggleEditForm}>Edit</button>
                                <button className="btn btn-primary" onClick={this.deleteFlightNumber}>Delete</button>
                            </div>
                        </div>
                    }
                </SingleFlightNumberWrapper>
            );

        }
    }

}

export default SingleFlightNumber