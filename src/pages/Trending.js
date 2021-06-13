import React from 'react'
import {
    Container,
    Box,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
// import { useSnackbar } from 'notistack';
import AuthContext from '../utils/AuthContext';
import GetPosts from '../components/GetPosts';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(2),
        }
    },
    marginBottom: {
        marginBottom: theme.spacing(3),
    },
}));

function Tranding() {
    const { authState } = React.useContext(AuthContext);
    const classes = useStyles();

    // const { enqueueSnackbar } = useSnackbar();


    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Container maxWidth="sm" disableGutters>
                    <Typography variant="h4" className={classes.marginBottom}>Trending</Typography>
                    <GetPosts authState={authState} url='/posts/trending/' />
                </Container>
                {/*<div style={{ flexGrow: 1 }}></div>*/}
            </Box>
        </React.Fragment>
    )
}

export default Tranding;