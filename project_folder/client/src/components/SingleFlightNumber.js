import React, { Component } from 'react';
import { Redirect, Link } from 'react';
import axios from "axios";

class SingleFlightNumber extends Component {
    state = {
        flightNumber: {
            number: '',
            crewMembers: ''
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }
    
    componentDidMount = () => {
        axios.get(`/api/v1/${this.props.match.params.id}`).then(res => {
            this.setState({flightNumber: res.data})
        })
    }

    deleteFlightNumber = () => {
        axios.delete(`/api/v1/${this.props.match.params.id}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    toggledEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleChange = (e) => {
        const cloneFlightNumber = {...this.state.flightNumber}
        cloneFlightNumber[e.target.name] = e.target.value
        this.setState({flightNumber: cloneFlightNumber})
    }

    updateFlightNumber = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.props.match.params.id}`, {
                number: this.state.flightNumber.name,
                crewMembers: this.state.flightNumber.crewMembers,
                planeType: this.state.flightNumber.planeType,
                recyclingProduced: this.state.flightNumber.recyclingProduced
            })
            .then(res => {
                this.setState({flightNumber: res.data, isEditFormDisplayed: false})
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return (<Redirect to = "/" />)
        }

        return (
            <div>
                <Link to = "/">Flight Numbers Home</Link>
                <h1>Single Flight Number</h1>
                <button onClick = {this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit = {this.updateFlightNumber}>
                            <div>
                                <label htmlFor="number">Number</label>
                                <input
                                    id="number"
                                    type="text"
                                    number="number"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.number}
                                />
                            </div>
                            <div>
                                <label htmlFor="crewMembers">Crew Members</label>
                                <input 
                                    id="number"
                                    type="text"
                                    number="number"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.crewMembers}
                                />
                            </div>
                            <div>
                                <label htmlFor="planeType">Plane Type</label>
                                <input
                                    id="number"
                                    type="text"
                                    number="number"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.crewMembers}
                                />
                            </div>
                            <div>
                                <label htmlFor="recyclingProduced">Recycling Produced</label>
                                <input
                                    id="number"
                                    type="text"
                                    number="number"
                                    onChange={this.handleChange}
                                    value={this.state.flightNumber.recyclingProduced}
                                />
                            </div>
                            <button>Update</button>
                        </form>
                        : <div>
                            <div>
                                Number: {this.state.FlightNumber.number}

                            </div>
                            <div>
                                CrewMembers: {this.state.flightNumber.crewMembers}
                            </div>
                            <div>
                                PlaneType: {this.state.flightNumber.planeType}
                            </div>
                            <div>
                                RecyclingProduced: {this.state.flightNumber.recyclingProduced}
                            </div>
                            <button onClick = {this.deleteFlightNumber}>Delete</button>
                        </div>
                }
            </div>
        );

    }
    
}

export default SingleFlightNumber