import React from 'react'
import {
    Typography,
    Container, Box,
    FormControl,
    Input, InputLabel,
    Button, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { validateEmail } from '../utils/validator';
import { SERVER } from '../config';

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(3)
    },
    relative: {
        position: 'relative',
    },
    progressbar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

function ForgetPass() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: ''
    });

    const [error, setError] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [generated, setgenerated] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleForgetPass = (e) => {
        e.preventDefault();
        if (!error && values.email) {
            setDisable(true);
            const data = { email: values.email };
            fetch(`${SERVER}/auth/forget-pass`, {
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
                        enqueueSnackbar('Please check your mail for reset link', { variant: "success" });
                        setgenerated(true);
                    } else {
                        enqueueSnackbar(data.message, { variant: "error" });
                    }
                    setDisable(false);
                })
                .catch((error) => {
                    enqueueSnackbar('Failed to generate link!', { variant: "error" });
                    setDisable(false);
                    console.error('Error:', error);
                });
        }
        else {
            enqueueSnackbar('Please enter a valid email', { variant: "Warning" });
        }
    }

    const handleChange = e => {
        setValues({ email: e.target.value });
        setError(!validateEmail(e.target.value));
    }

    return (
        <>
            <Container maxWidth="xs" disableGutters>
                <Box mt={5}>
                    <Typography variant="h4" color="initial">Forget <br />Password</Typography>
                    <Typography variant="body1" color="inherit">Enter your email to generate reset password link.</Typography>
                    {generated && <Typography variant="body1" color="inherit" className={classes.margin}>Reset password link generated successfully.</Typography>}
                    <form onSubmit={handleForgetPass}>
                        <FormControl fullWidth className={classes.margin} error={error}>
                            <InputLabel htmlFor="userEmail">Enter Your Registered Email</InputLabel>
                            <Input
                                id="userEmail"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl fullWidth className={clsx(classes.margin, classes.relative)} >
                            <Button variant="contained" color="primary" disabled={disable} type='submit'>{generated ? "Resend" : "Send"} Reset Link</Button>
                            {disable && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                        </FormControl>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default ForgetPass
