import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom'
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
    Link,
    FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { validateEmail, validatePassword, validateUsername } from '../utils/validator'
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

function Register() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    const [errors, setErrors] = React.useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [disableBtn, setDisableBtn] = React.useState({
        submit: false,
    })
    const { enqueueSnackbar } = useSnackbar();

    const history = useHistory();

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
        } else if (prop === "username") {
            setErrors({
                username: !validateUsername(event.target.value)
            })
        } else if (prop === "confirmPassword") {
            setErrors({
                confirmPassword: event.target.value !== values.password ? true : false
            })
        }
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!errors.email && !errors.password && values.username && values.password && values.email && values.confirmPassword) {
            setDisableBtn({
                submit: true
            });
            const data = {
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            await fetch(`${SERVER}/auth/register`, {
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
                        const variant = 'success';
                        enqueueSnackbar('Registered successfully!', { variant });
                        history.push("/login")
                    } else {
                        const variant = 'error';
                        enqueueSnackbar('Registration failed!', { variant });
                        setDisableBtn({
                            submit: false
                        })
                    }
                })
                .catch((error) => {
                    const variant = 'error';
                    enqueueSnackbar('Registration failed!', { variant });
                    setDisableBtn({
                        submit: false
                    })
                    console.error('Error:', error);
                });
        } else {
            enqueueSnackbar('Username, Email and Password should be valid.', { variant: "warning" });
        }
    }


    return (
        <React.Fragment>
            <Container maxWidth="xs" disableGutters>
                <Box mt={5}>
                    <form onSubmit={handleRegister}>
                        <Typography variant="h4" color="initial">Register</Typography>
                        <Typography variant="body1" color="inherit">to manage your account on LinkBook</Typography>
                        <Box mt={2}>
                            <FormControl fullWidth className={classes.margin} error={errors.username}>
                                <InputLabel htmlFor="userUsername">Username</InputLabel>
                                <Input
                                    id="userUsername"
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange('username')}
                                    startAdornment={
                                        <InputAdornment position="start" >
                                            <PersonIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.margin} error={errors.email}>
                                <InputLabel htmlFor="userEmail">Email</InputLabel>
                                <Input
                                    id="userEmail"
                                    type='email'
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
                                <FormHelperText>Use 8 or more characters with a mix of letters, numbers & symbols</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth className={classes.margin} error={errors.confirmPassword}>
                                <InputLabel htmlFor="userConfirmPassword">Confirm Password</InputLabel>
                                <Input
                                    id="userConfirmPassword"
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                    startAdornment={
                                        <InputAdornment position="start" >
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            { /*<FormControl className={classes.margin}>
                                <Link href="/forgetpass" color="primary">Forgot Your Password?</Link>
                                </FormControl>*/}
                            <FormControl fullWidth className={clsx(classes.margin, classes.relative)} >
                                <Button variant="contained" color="primary" type='submit' disabled={disableBtn.submit}>Register</Button>
                                {disableBtn.submit && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                            </FormControl>
                            <Typography variant="subtitle1" color="initial" className={classes.margin} align="center">
                                Do you have an account? <Link color="primary" component={RouterLink} to="/login" >Login</Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Register
