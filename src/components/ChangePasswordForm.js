import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    CircularProgress
} from '@material-ui/core'
import React from 'react'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import { validatePassword } from '../utils/validator'
import { SERVER } from '../config';
import clsx from 'clsx';


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

export default function ChangePasswordForm() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showOldPassword: false,
    });

    const [errors, setErrors] = React.useState({
        password: false,
        confirmPassword: false
    });

    const [disableBtn, setDisableBtn] = React.useState({
        submit: false,
    })

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        if (prop === "password") {
            setErrors({
                password: !validatePassword(event.target.value)
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

    const handleClickShowOldPassword = () => {
        setValues({ ...values, showOldPassword: !values.showOldPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangePass = (e) => {
        e.preventDefault();
        console.log("change pass submitted")
        if (!errors.password && !errors.confirmPassword && values.password && values.oldPassword) {
            setDisableBtn({
                submit: true
            });
            const data = {
                oldPassword: values.oldPassword,
                password: values.password,
                confirmPassword: values.confirmPassword
            };
            fetch(`${SERVER}/auth/update-pass`, {
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
                        enqueueSnackbar('Password Changed successfully!', { variant: "success" });
                        setValues({
                            oldPassword: '',
                            password: '',
                            confirmPassword: '',
                            showPassword: false,
                            showOldPassword: false,
                        });
                    } else {
                        enqueueSnackbar(data.message, { variant: "error" });
                    }
                    setDisableBtn({
                        submit: false
                    })
                })
                .catch((error) => {
                    enqueueSnackbar('Password Change failed!', { variant: "error" });
                    setDisableBtn({
                        submit: false
                    })
                    console.error('Error:', error);
                });
        } else {
            enqueueSnackbar('Current password or new password should be valid.', { variant: "warning" });
        }
    }
    return (
        <React.Fragment>
            <form onSubmit={handleChangePass}>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="userCurrentPassword">Current Password</InputLabel>
                    <Input
                        id="userCurrentPassword"
                        type={values.showOldPassword ? 'text' : 'password'}
                        value={values.oldPassword}
                        onChange={handleChange('oldPassword')}
                        /*startAdornment={
                            <InputAdornment position="start" >
                                <VpnKeyIcon />
                            </InputAdornment>
                        }*/
                        endAdornment={
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin} error={errors.password}>
                    <InputLabel htmlFor="userPassword">New Password</InputLabel>
                    <Input
                        id="userPassword"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        /*startAdornment={
                            <InputAdornment position="start" >
                                <VpnKeyIcon />
                            </InputAdornment>
                        }*/
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
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    /*startAdornment={
                        <InputAdornment position="start" >
                            <VpnKeyIcon />
                        </InputAdornment>
                    }*/
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.relative)} >
                    <Button variant="contained" color="primary" type='submit' disabled={disableBtn.submit}>Change Password</Button>
                    {disableBtn.submit && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                </FormControl>
            </form>
        </React.Fragment>
    )
}
