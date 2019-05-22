import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import axios from "axios";

const SingleCrewMemberWrapper = styled.div`
    -webkit-stroke-color: white;
    color: #292624;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family:'Oswald', sans-serif;

    .buttons {
        display: flex;
        justify-content: space-evenly;
    }

    button {
        background-color: #888582;
        border: 1px solid white;
        margin: 1em 0;
    }

    label {
        color: white;
        margin-right: .75em;
        font-size: 1.25em;
        font-weight: 600;
    }

    .member-info {
        font-weight: 600;
        font-size: 1.25em;
    }
`

class SingleCrewMember extends Component {
    state = {
        crewMember: {
            _id: this.props.match.params.id,
            number: '',
            name: '',
            individualRecyclingProduced: 0
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/v1/member/${this.props.match.params.id}`).then(res => {
            this.setState({ crewMember: res.data })
        })
    }

    deleteCrewMember = () => {
        axios.delete(`/api/v1/member/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {

        const cloneCrewMember = { ...this.state.crewMember }
        cloneCrewMember[e.target.name] = e.target.value
        this.setState({ crewMember: cloneCrewMember })
    }

    handleCrewMemberChange = (e) => {
        const cloneFlightNumber = { ...this.state.flightNumber }
        cloneFlightNumber[e.target.name] = e.target.value.split(",")
        this.setState({ flightNumber: cloneFlightNumber })
    }

    updateCrewMember = (e) => {
        e.preventDefault()
        console.log(this.state.crewMember)
        axios
            .put(`/api/v1/member/${this.props.match.params.id}`, this.state.crewMember)
            .then(res => {
                this.setState({ crewMember: res.data, isEditFormDisplayed: false })
            })
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/crew" />)
        } else {


            return (
                <SingleCrewMemberWrapper>

                    <h1>Single Crew Member</h1>


                    {this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateCrewMember}>
                            <div>
                                <label htmlFor="number">Number</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="number"
                                    onChange={this.handleChange}
                                    value={this.state.crewMember.number}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Crew Member's Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.crewMember.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="individualRecyclingProduced">Individual Recycling Produced</label>
                                <input
                                    id="individualRecyclingProduced"
                                    type="text"
                                    name="individualRecyclingProduced"
                                    onChange={this.handleChange}
                                    value={this.state.crewMember.individualRecyclingProduced}
                                />
                            </div>
                            <button className="btn btn-primary">Update</button>
                        </form>
                        : <div>
                            <div className="member-info">
                                Number: {this.state.crewMember.number}
                            </div>

                            <div className="member-info">
                                Name: {JSON.stringify(this.state.crewMember.name)}
                            </div>

                            <div className="member-info">
                                Individual Recycling Produced: {this.state.crewMember.individualRecyclingProduced}
                            </div>
                            <div className="buttons">
                                <button className="btn btn-primary" onClick={this.toggleEditForm}>Edit</button>
                                <button className="btn btn-primary" onClick={this.deleteCrewMember}>Delete</button>
                            </div>
                        </div>
                    }
                </SingleCrewMemberWrapper>
            );

        }
    }

}

export default SingleCrewMember