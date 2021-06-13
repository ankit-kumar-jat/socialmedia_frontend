import { Avatar, CardContent, IconButton, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Component } from 'react'
import formateDate from '../utils/FormatDate';
import { Link as RouterLink } from 'react-router-dom';
import { SERVER } from '../config'

export class Comment extends Component {
    state = {
        user: null,
        isLoading: true
    }

    componentDidMount() {
        fetch(`${SERVER}/users/avatar?userId=${this.props.comment.userId}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    this.setState({ user: res, isLoading: false });
                } else {
                    this.setState({ user: { login: null, avatar: null, userId: this.props.comment.userID }, isLoading: false });
                }
            })
            .catch((error) => {
                this.setState({ user: { login: null, avatar: null, userId: this.props.comment.userID }, isLoading: false });
            });

    }
    render() {
        return (
            <React.Fragment>
                <CardContent style={{ display: 'flex' }}>
                    {!this.state.isLoading ? (<IconButton
                        component={RouterLink}
                        to={`/users/${this.state.user.login}`}
                        aria-label="user profile"
                        style={{ padding: 0, height: 'max-content' }}>
                        <Avatar
                            aria-label="user avatar"
                            src={this.state.user.avatar ? `${SERVER}${this.state.user.avatar}` : ""}>
                        </Avatar>
                    </IconButton>)
                        : (<Skeleton animation="wave" variant="circle" width={40} height={40} />)
                    }
                    <div style={{ marginLeft: 16, flexGrow: 1 }} >
                        {!this.state.isLoading ? (<Typography component="p">
                            <Typography
                                variant='subtitle2'
                                component={RouterLink}
                                to={`/users/${this.state.user.login}`}
                                color="inherit"
                                style={{ textDecoration: "none" }}
                            >
                                {this.state.user.login}
                            </Typography>
                            <Typography
                                component='span'
                                variant='caption'
                                style={{ marginLeft: 8 }}>
                                {formateDate(this.props.comment.created_at)}
                            </Typography>
                        </Typography>)
                            : (<Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 18 }} />)
                        }
                        {!this.state.isLoading ? (<Typography component="p" variant='body2' style={{ marginTop: 8 }}>
                            {this.props.comment.value}
                        </Typography>)
                            : (<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 12 }} />)
                        }
                    </div>
                </CardContent>
            </React.Fragment>
        )
    }
}

export default Comment
