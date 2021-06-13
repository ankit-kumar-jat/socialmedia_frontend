import React, { Component } from 'react'
import App from '../App';
import { SERVER } from '../config'

export class CheckAuthWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialState: null
        }
    }

    componentDidMount() {
        fetch(`${SERVER}/auth/`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        initialState: {
                            isAuthenticated: true,
                            userId: data.userId,
                            username: data.username,
                            refreshPost: false,
                            refreshUser: false,
                        }
                    })
                } else {
                    this.setState({
                        initialState: {
                            isAuthenticated: false,
                            userId: null,
                            username: null,
                            refreshPost: false,
                            refreshUser: false,
                        }
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    initialState: {
                        isAuthenticated: false,
                        userId: null,
                        username: null,
                        refreshUser: false,
                        refreshPost: false,
                    }
                });
            });
    }

    render() {
        return (
            this.state.initialState ? <App initialState={this.state.initialState} /> : <p>Loading...</p>
        )
    }
}

export default CheckAuthWrapper

