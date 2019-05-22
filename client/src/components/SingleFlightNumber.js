import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import axios from "axios";

class SingleFlightNumber extends Component {
    state = {
        flightNumber: {
            _id: this.props.match.params.id,
            number: '',
            crewMembers: '',
            recyclingProduced: '',
            planeType: ''
        },
        // updateflightNumberInfo: {
        //     _id:'',
        //     number: '',
        //     crewMembers: '',
        //     recyclingProduced: '',
        //     planeType: ''
        // },
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
                <div>
                    <Link to="/">Flight Numbers Home</Link>
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
                            <button>Update</button>
                        </form>
                        : <div>
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
                            <button onClick={this.toggleEditForm}>Edit</button>
                            <button onClick={this.deleteFlightNumber}>Delete</button>
                        </div>
                    }
                </div>
            );

        }
    }

}

export default SingleFlightNumber