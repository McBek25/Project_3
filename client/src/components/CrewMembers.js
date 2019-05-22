import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CrewMembersWrapper = styled.div`
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

class CrewMembers extends Component {
    state = {
      
        crewMembers: [],
        newCrewMember: {
            number: '',
            name: '',
            individualRecyclingProduced: 0
        },
        
        isCrewMemberFormDisplayed: false
    }


  

    getAllCrewMembers = () => {
        axios.get('/api/v1/member').then(res => {
            this.setState({ crewMembers: res.data })
        })

    }

    componentDidMount () {
        this.getAllCrewMembers()
       }
   

    toggleCrewMemberForm = () => {
        this.setState((state, props) => {
            return ({ isCrewMemberFormDisplayed: !state.isCrewMemberFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewCrewMember = { ...this.state.newCrewMember }
        cloneNewCrewMember[e.target.name] = e.target.value
        this.setState({ newCrewMember: cloneNewCrewMember })
    }

    createCrewMember = (e) => {
        console.log(this.state.newCrewMember)

        e.preventDefault()
        axios
            .post('/api/v1/member', {
                number: this.state.newCrewMember.number,
                name: this.state.newCrewMember.name,
                individualRecyclingProduced: this.state.newCrewMember.individualRecyclingProduced
            })
        .then(res => {
            const crewMemberList = [...this.state.crewMembers]
            crewMemberList.unshift(res.data)
            this.setState({
                newCrewMember: {
                    number: '',
                    name: '',
                    individualRecyclingProduced: 0
                },
                isCrewMemberFormDisplayed: false,
                crewMembers: crewMemberList
            })
        })
    }

    render() {
        return (
            <CrewMembersWrapper>
                <h1>Crew Members</h1>
                {
                    this.state.crewMembers.map(crewMember => {
                        return (
                            <div key={crewMember._id}>
                                <Link as="a" to={`/crew/${crewMember._id}`}>
                                   
                                    {crewMember.number}
                                </Link>
                            </div>

                        )
                    })
                }
                <button className="btn btn-primary" onClick = {this.toggleCrewMemberForm}> + New Crew Member</button>
                {
                    this.state.isCrewMemberFormDisplayed
                        ? <form onSubmit = {this.createCrewMember}> 
                            <div>
                                <label htmlFor="Number">Number</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="number"
                                    onChange={this.handleChange}
                                    value={this.state.newCrewMember.number}
                                    /> 
                            </div>
                            <div>
                                <label htmlFor="Name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newCrewMember.name}

                                />
                            </div>
                        
                            {/* <div>
                                <label htmlFor="recyclingProduced">Recycling Produced</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="recyclingProduced"
                                    onChange={this.handleChange}
                                    value={this.state.newFlightNumber.recyclingProduced}

                                />
                            </div> */}
                            <button className="btn btn-primary">Create</button>
                        </form>
                        : null
            }  
            </CrewMembersWrapper>  
        )
    }        
}

export default CrewMembers 