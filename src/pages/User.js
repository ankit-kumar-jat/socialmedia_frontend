import React from 'react';
import clsx from 'clsx';
import {
    Typography,
    Avatar,
    Box,
    List,
    ListItem,
    Button,
    Divider,
    Container,
    Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link as RouterLink } from 'react-router-dom';
// import UserContext from '../utils/UserContext';
import AuthContext from '../utils/AuthContext';
import { useSnackbar } from 'notistack';
import NewAvatar from '../components/NewAvatar';
import { SERVER } from '../config';
import Follow from '../components/Follow';

const useStyles = makeStyles((theme) => ({
    box: {
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(2)
        },
    },
    gutters: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3.5),
        }
    },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),

    },
    avatarBox: {
        position: 'relative',
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    flex: {
        display: 'flex',
        // flexWrap: 'wrap',
    },
    mainFlex: {
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    avatarWrapper: {
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(30),
        },
    },
    mrLeft: {
        marginLeft: theme.spacing(1)
    },
    mrRight: {
        marginRight: theme.spacing(1)
    },
    justCenter: {
        justifyContent: 'center',
    }
}));

function User(props) {
    const classes = useStyles();
    const { authState, authDispatch } = React.useContext(AuthContext);
    const { username } = useParams();
    // const user = React.useContext(UserContext);
    const [data, setData] = React.useState();
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        // if (user && username === user.login) {
        //     setData(user);
        // } else {
        fetch(`${SERVER}/users/username/${username}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setData(data)
                } else {
                    if (data.status === 401)
                        authDispatch({
                            type: "LOGOUT"
                        })
                    enqueueSnackbar(data.message, { variant: 'error' });
                }
            })
            .catch((error) => {
                enqueueSnackbar('Failed to get user data', { variant: 'error' })
            });
        // }
    }, [username, enqueueSnackbar, authState.refreshPost, authState.refreshUser, authDispatch]);

    return (
        <React.Fragment>
            {data
                ? (
                    <React.Fragment>
                        <Box className={classes.box}>
                            <Container maxWidth="md" disableGutters>
                                <List className={clsx(classes.flex, classes.mainFlex)}>
                                    <ListItem className={clsx(classes.avatarWrapper, classes.justCenter)}>
                                        <Box className={classes.avatarBox}>
                                            <Avatar
                                                alt={`${data.login}'s avatar`}
                                                src={data.avatar ? `${SERVER}${data.avatar}` : ""}
                                                className={classes.avatar}
                                            ></Avatar>
                                            {authState.userId === data.userId && <Box position="absolute" style={{ bottom: 0, right: 0 }}>
                                                <NewAvatar />
                                            </Box>}
                                        </Box>
                                    </ListItem>
                                    <ListItem disableGutters className={classes.gutters}>
                                        <List style={{ width: '100%' }}>
                                            <ListItem disableGutters>
                                                <Typography variant="h4" style={{ flexGrow: 1 }}>{data.login}</Typography>
                                                {authState.userId === data.userId && <Button variant="contained" color="primary" startIcon={<EditIcon />} component={RouterLink} to="/settings" > edit</Button>}
                                            </ListItem>
                                            <ListItem dense disableGutters>
                                                <Typography variant='body2'>{data.bio ? data.bio : ""}</Typography>
                                            </ListItem>
                                            <ListItem dense disableGutters>
                                                <Typography variant='body1'>{data.location ? data.location : ""}</Typography>
                                            </ListItem>
                                            <ListItem dense disableGutters>
                                                <Typography variant='body1'
                                                    href={data.website ? data.website : ""}
                                                    target="_blank"
                                                    component={Link}>{data.website ? "Website Link" : null}</Typography>
                                            </ListItem>
                                            <ListItem disableGutters>
                                                {authState.userId !== data.userId && <Follow userId={data.userId} />}
                                                <Button className={classes.mrRight} variant="contained" disableElevation>Share Profile</Button>
                                            </ListItem>
                                            <ListItem dense disableGutters>
                                                <List className={classes.flex} >
                                                    <ListItem disableGutters>
                                                        <Typography className={clsx(classes.mrRight)} variant='h6'>{data.posts}</Typography>
                                                        <Typography variant='body1' className={classes.mrRight}>Posts</Typography>
                                                    </ListItem>
                                                    <Divider orientation="vertical" flexItem />
                                                    <ListItem disableGutters>
                                                        <Typography className={clsx(classes.mrRight, classes.mrLeft)} variant='h6'>{data.followers}</Typography>
                                                        <Typography variant='body1' className={classes.mrRight}>Followers</Typography>
                                                    </ListItem>
                                                    <Divider orientation="vertical" flexItem />
                                                    <ListItem disableGutters>
                                                        <Typography className={clsx(classes.mrRight, classes.mrLeft)} variant='h6'>{data.following}</Typography>
                                                        <Typography variant='body1'>Following</Typography>
                                                    </ListItem>
                                                </List>
                                            </ListItem>
                                        </List>
                                    </ListItem>
                                </List>

                            </Container>
                        </Box>
                    </React.Fragment>
                )
                : <Typography>Loading...</Typography>}
        </React.Fragment>
    )
}

export default User
