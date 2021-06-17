import React from 'react'
import {
	Typography,
	Container, Box,
	FormControl, CircularProgress,
	Button, FormHelperText,
	Input, InputLabel,
	InputAdornment, IconButton,
	Link
} from '@material-ui/core';
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { validatePassword } from '../utils/validator';
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
	},
	marginLow: {
		marginTop: theme.spacing(1)
	}
}));

function ResetPass() {
	const classes = useStyles();
	var { token } = useParams();
	const [values, setValues] = React.useState({
		password: '',
		confirmPassword: '',
		resetPasswordToken: token.split(":")[0],
		tokenId: token.split(":")[1],
	});
	const [errors, setErrors] = React.useState({
		password: false,
		confirmPassword: false,
	});
	const [disable, setDisable] = React.useState(false)

	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();

	const handleResetPass = (e) => {
		e.preventDefault();
		if (values.password && values.resetPasswordToken && values.tokenId && !errors.password && !errors.confirmPassword) {
			setDisable(true)
			const data = {
				password: values.password,
				confirmPassword: values.confirmPassword,
				resetPasswordToken: values.resetPasswordToken,
				tokenId: values.tokenId
			};
			fetch(`${SERVER}/auth/reset-pass`, {
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
						history.push("/login");
					} else {
						enqueueSnackbar(data.message, { variant: "error" });
					}
					setDisable(false);
				})
				.catch((error) => {
					enqueueSnackbar('Password reset failed!', { variant: "error" });
					setDisable(false);
					console.error('Error:', error);
				});
		}
		else {
			enqueueSnackbar('Please enter valid password or confirm password', { variant: "Warning" });
		}

	}

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

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Container maxWidth="xs" disableGutters>
				<Box mt={5}>
					<Typography variant="h4" color="initial">Reset <br />Password</Typography>
					<Typography variant="body1" color="inherit">Enter your new password to reset password.</Typography>
					<form onSubmit={handleResetPass}>
						<FormControl fullWidth className={classes.margin} error={errors.password}>
							<InputLabel htmlFor="userPassword">New Password</InputLabel>
							<Input
								id="userPassword"
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
								onChange={handleChange('password')}
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
						<FormControl fullWidth className={classes.marginLow} error={errors.confirmPassword}>
							<InputLabel htmlFor="userConfirmPassword">Confirm Password</InputLabel>
							<Input
								id="userConfirmPassword"
								type={values.showPassword ? 'text' : 'password'}
								value={values.confirmPassword}
								onChange={handleChange('confirmPassword')}
							/>
						</FormControl>
						<FormControl className={classes.margin}>
							<Link component={RouterLink} to="/forgetpass" color="primary">Resend reset password Link?</Link>
						</FormControl>
						<FormControl fullWidth className={clsx(classes.margin, classes.relative)} >
							<Button variant="contained" color="primary" disabled={disable} type='submit'>Reset Password</Button>
							{disable && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
						</FormControl>
					</form>
				</Box>
			</Container>
		</>
	)
}

export default ResetPass
