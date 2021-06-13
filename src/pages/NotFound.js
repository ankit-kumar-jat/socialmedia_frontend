import React, { Component } from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';




export class NotFound extends Component {
    render() {

        return (
            <React.Fragment>
                <Typography variant="h1" color="initial" align="center">404</Typography>
                <Typography variant="h4" color="initial" align="center">Page Not Found!</Typography>
                <Box mt={2} align="center">
                    <Button color="primary" component={Link} to="/">
                        <ArrowBackIcon /> Go to home
                    </Button>
                </Box>
            </React.Fragment>
        )
    }
}

export default NotFound
