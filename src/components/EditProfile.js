import React from 'react'
import UserContext from '../utils/UserContext';
import {
    Button,
    FormControl,
    CircularProgress,
    Input,
    InputLabel,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { SERVER } from '../config';
import AuthContext from '../utils/AuthContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    submit: {
        position: 'relative'
    },
    progressbar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    margin: {
        marginTop: theme.spacing(3)
    },
    form: {
        marginBottom: theme.spacing(4)
    }
}));

export default function EditProfile() {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const { authDispatch } = React.useContext(AuthContext);
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        bio: '',
        website: '',
        location: '',
    });
    const [disable, setDisable] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);
        const data = {
            "email": values.email,
            "name": values.name,
            "bio": values.bio,
            "location": values.location,
            "website": values.website
        };
        fetch(`${SERVER}/users/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    enqueueSnackbar('Profile updated!', { variant: "success" })
                    authDispatch({
                        type: 'REFUSER'
                    })
                } else {
                    if (data.status === 401)
                        authDispatch({
                            type: "LOGOUT"
                        })
                    enqueueSnackbar(data.message, { variant: "error" });
                }
                setDisable(false)
            })
            .catch((error) => {
                enqueueSnackbar('Profile updation Failed', { variant: 'error' });
                setDisable(false)
                console.error('Error:', error);
            });
    }

    React.useEffect(() => {
        if (user) {
            setValues({
                name: user.name,
                email: user.email,
                bio: user.bio,
                website: user.website,
                location: user.location,
            })
        }
    }, [user])

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="userName">Name</InputLabel>
                    <Input
                        type="text"
                        id="userName"
                        value={values.name}
                        onChange={e => setValues({ ...values, name: e.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="userEmail">Email</InputLabel>
                    <Input
                        type="email"
                        id="userEmail"
                        value={values.email}
                        onChange={e => setValues({ ...values, email: e.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <TextField
                        fullWidth
                        id="userBio"
                        rows={3}
                        label="Write something about you"
                        value={values.bio}
                        multiline
                        maxLength="200"
                        onChange={e => setValues({ ...values, bio: e.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="userLocation">Location</InputLabel>
                    <Input
                        type="text"
                        id="userLocation"
                        value={values.location}
                        onChange={e => setValues({ ...values, location: e.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="userWebsite">Website</InputLabel>
                    <Input
                        type="url"
                        id="userWebsite"
                        value={values.website}
                        onChange={e => setValues({ ...values, website: e.target.value })}
                    />
                </FormControl>

                <FormControl className={clsx(classes.submit, classes.margin)}>
                    <Button variant="contained" color="primary" type="submit" disabled={disable}>
                        Update Profile
                    </Button>
                    {disable && <CircularProgress size={24} className={classes.progressbar}>
                    </CircularProgress>}
                </FormControl>
            </form>
        </React.Fragment>
    )
}
