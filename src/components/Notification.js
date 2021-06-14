import React from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	CircularProgress
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { SERVER } from '../config';
import formateDate from '../utils/FormatDate';

const useStyles = makeStyles((theme) => ({
	progressbar: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -15,
		marginLeft: -15,
	},
}));

function Notification() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [notifications, setNotifications] = React.useState();
	const { enqueueSnackbar } = useSnackbar();

	const getNotifications = () => {
		fetch(`${SERVER}/users/notifications`, {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => response.json())
			.then(res => {
				if (res.success) {
					setNotifications(res.notifications);
				} else {
					enqueueSnackbar(res.message, { variant: "error" });
				}
			})
			.catch((error) => {
				enqueueSnackbar('Failed to get notifications', { variant: "error" });
				console.error('Error:', error);
			});
	}

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
		getNotifications()
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const renderNotifications = (
		notifications ? <Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: 'left' }}
			id="account-menu"
			transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={Boolean(anchorEl)}
			onClose={handleMenuClose}
		>
			{/*<MenuItem>Hi {authState.username}!</MenuItem>*/}
			{notifications.length > 0 ? notifications.map((notification) => {
				return (<MenuItem
					onClick={handleMenuClose}
					component={RouterLink}
					to={`/posts/${notification.postId}`}>
					{`${notification.message} ${formateDate(notification.createdAt)}`}
				</MenuItem>)
			})
				: <MenuItem onClick={handleMenuClose}>You have no notifications yet</MenuItem>
			}
		</Menu>
			: (
				<Menu
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: "top", horizontal: 'left' }}
					id="account-menu"
					keepMounted
					transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<MenuItem>
						<div style={{ minWidth: 300, minHeight: 100 }}>
							<CircularProgress className={classes.progressbar} size={30} />
						</div>
					</MenuItem>
				</Menu>
			)
	);
	return (
		<>
			<Tooltip title="Notifications">
				<IconButton aria-label="Notifications" color="inherit" onClick={handleMenuOpen}>
					<NotificationsNoneIcon />
				</IconButton>
			</Tooltip>
			{renderNotifications}
		</>
	)
}

export default Notification;
