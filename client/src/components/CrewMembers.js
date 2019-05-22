import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <div>
                <h1>Crew Members</h1>
                {
                    this.state.crewMembers.map(crewMember => {
                        return (
                            <div key={crewMember._id}>
                                <Link  to={`/crew/${crewMember._id}`}>
                                   
                                    {crewMember.number}
                                </Link>
                            </div>

                        )
                    })
                }
                <button onClick = {this.toggleCrewMemberForm}> + New Crew Member</button>
                {
                    this.state.isCrewMemberFormDisplayed
                        ? <form onSubmit = {this.createCrewMember}> 
                            <div>
                                <label htmlFor="Number"></label>
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
                            <button>Create</button>
                        </form>
                        : null
            }  
            </div>  
        )
    }        
}

export default CrewMembers 