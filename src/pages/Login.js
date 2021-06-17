import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
    CircularProgress,
    Box,
    Container,
    Input,
    Typography,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Button,
    Link
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import AuthContext from "../utils/AuthContext";
import clsx from 'clsx';
import { validateEmail, validatePassword } from '../utils/validator'
import { useSnackbar } from 'notistack';
import { SERVER } from '../config'

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


function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [errors, setErrors] = React.useState({
        email: false,
        password: false,
    });
    const [disableBtn, setDisableBtn] = React.useState({
        submit: false,
    })
    const { enqueueSnackbar } = useSnackbar();


    const { authDispatch } = React.useContext(AuthContext);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        if (prop === "email") {
            setErrors({
                email: !validateEmail(event.target.value)
            })
        } else if (prop === "password") {
            setErrors({
                password: !validatePassword(event.target.value)
            })
        }
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!errors.email && !errors.password && values.password && values.email) {
            setDisableBtn({
                submit: true
            });
            const data = { email: values.email, password: values.password }
            await fetch(`${SERVER}/auth/login`, {
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
                        enqueueSnackbar('Login successfully!', { variant: "success" });
                        authDispatch({
                            type: 'LOGIN',
                            payload: data
                        });
                    } else {
                        enqueueSnackbar(data.message, { variant: "error" });
                        setDisableBtn({
                            submit: false
                        })
                    }
                })
                .catch((error) => {
                    enqueueSnackbar('Login failed!', { variant: "error" });
                    setDisableBtn({
                        submit: false
                    })
                    console.error('Error:', error);
                });
        } else {
            enqueueSnackbar('Email and Password should be valid.', { variant: "warning" });
        }
    }


    return (
        <React.Fragment>
            <Container maxWidth="xs" disableGutters>
                <Box mt={5}>
                    <form onSubmit={handleLogin}>
                        <Typography variant="h4" color="initial">Log In</Typography>
                        <Typography variant="body1" color="inherit">with your LinkBook account</Typography>
                        <Box mt={2}>
                            <FormControl fullWidth className={classes.margin} error={errors.email}>
                                <InputLabel htmlFor="userEmail">Email</InputLabel>
                                <Input
                                    id="userEmail"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    startAdornment={
                                        <InputAdornment position="start" >
                                            <MailIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.margin} error={errors.password}>
                                <InputLabel htmlFor="userPassword">Password</InputLabel>
                                <Input
                                    id="userPassword"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    startAdornment={
                                        <InputAdornment position="start" >
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <Link component={RouterLink} to="/forgetpass" color="primary">Forgot Your Password?</Link>
                            </FormControl>
                            <FormControl fullWidth className={clsx(classes.margin, classes.relative)} >
                                <Button variant="contained" color="primary" disabled={disableBtn.submit} type='submit'>Log In</Button>
                                {disableBtn.submit && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                            </FormControl>
                            <Typography variant="subtitle1" color="initial" className={classes.margin} align="center">
                                Not registered? <Link component={RouterLink} to="/register" color="primary">Create a account</Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Login
