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
import { useLocation } from 'react-router-dom';

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

function Home() {
    const { authState } = React.useContext(AuthContext);
    const classes = useStyles();

    // const { enqueueSnackbar } = useSnackbar();

    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page');

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Container maxWidth="sm" disableGutters>
                    <Typography variant="h4" className={classes.marginBottom}>Latest Posts</Typography>
                    <GetPosts authState={authState} url="/posts/" page={page} />
                </Container>
                {/*<div style={{ flexGrow: 1 }}></div>*/}
            </Box>
        </React.Fragment>
    )
}

export default Home;
