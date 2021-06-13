import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    ThemeProvider,
    Container,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
} from '@material-ui/core';
import { zhCN } from '@material-ui/core/locale';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PersonIcon from '@material-ui/icons/Person';
import WhatshotIcon from '@material-ui/icons/Whatshot';
// import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
// import CollectionsIcon from '@material-ui/icons/Collections';
import SettingsIcon from '@material-ui/icons/Settings';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AuthContext from "../utils/AuthContext";
import UserContext from '../utils/UserContext';
import { useSnackbar } from 'notistack';
import NewPost from './NewPost';
import { SERVER } from '../config'
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
    },
    //added by me
    grow: {
        flexGrow: 1,
    },
    mrLeft: {
        marginLeft: theme.spacing(1),
    },
    title: {
        textDecoration: 'none',
    },
    justCenter: {
        justifyContent: 'center',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));

function Navigation(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { authState, authDispatch } = React.useContext(AuthContext);
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [locale, setLocale] = React.useState('zhCN')
    const location = useLocation();

    const { enqueueSnackbar } = useSnackbar();
    const container = window !== undefined ? () => window().document.body : undefined;

    // theme
    const light = {
        palette: {
            type: 'light',
        },
    }
    const dark = {
        palette: {
            type: 'dark',
        },
    }
    const [myTheme, setTheme] = React.useState(true);
    const appliedTheme = createMuiTheme((myTheme ? light : dark), zhCN);

    const icon = !myTheme ? <Brightness7Icon /> : <Brightness4Icon />

    const handleThemeChange = () => {
        setTheme(!myTheme);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // profile menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerHide = () => {
        if (mobileOpen) {
            setMobileOpen(!mobileOpen);
        }
    }

    React.useEffect(() => {
        if (authState.isAuthenticated) {
            fetch(`${SERVER}/users/username/${authState.username}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUser(data)
                    } else {
                        if (data.status === 401)
                            authDispatch({
                                type: "LOGOUT"
                            })
                        setUser(null)
                    }
                })
                .catch((error) => {
                    setUser(null)
                });
        }
    }, [authState, authState.refreshUser, authDispatch])

    const handleLogout = () => {
        fetch(`${SERVER}/auth/logout`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const variant = 'success';
                    enqueueSnackbar('Logout successfully!', { variant });
                    authDispatch({ type: 'LOGOUT' });
                } else {
                    const variant = 'error';
                    enqueueSnackbar('Logout failed!', { variant });
                }
            })
            .catch((error) => {
                const variant = 'error';
                enqueueSnackbar('Logout failed!', { variant });
            });
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} >
                <ListItem>
                    <div className={classes.grow}></div>
                    <IconButton aria-label="Close Drawer" color="inherit" onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                </ListItem>
            </div>
            <Divider />
            {user && <Hidden smDown implementation="css">
                <List className={classes.userInfo}>
                    <ListItem className={classes.justCenter}>
                        <IconButton component={RouterLink} to={`/users/${user.login}`} area-label='view' style={{ padding: 0 }}>
                            <Avatar
                                className={classes.avatar}
                                src={user.avatar ? `${SERVER}${user.avatar}` : ""}
                                alt={`${user.login}'s avatar`}>
                            </Avatar>
                        </IconButton>
                    </ListItem>
                    <ListItem className={classes.justCenter} dense>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to={`/users/${user.login}`}
                            color="inherit"
                            style={{ textDecoration: "none" }}
                        >{user.login}</Typography>
                    </ListItem>
                    <ListItem className={classes.justCenter} dense>
                        <List style={{ display: 'flex' }} disablePadding>
                            <ListItem style={{ display: 'flex', flexDirection: "column" }} dense>
                                <Typography variant='body1'>Posts</Typography>
                                <Typography variant="h6">{user.posts}</Typography>
                            </ListItem>
                            <ListItem style={{ display: 'flex', flexDirection: "column" }} dense>
                                <Typography variant='body1'>Followers</Typography>
                                <Typography variant="h6">{user.followers}</Typography>
                            </ListItem>
                            <ListItem style={{ display: 'flex', flexDirection: "column" }} dense>
                                <Typography variant='body1'>Following</Typography>
                                <Typography variant="h6">{user.following}</Typography>
                            </ListItem>
                        </List>
                    </ListItem>
                </List>
            </Hidden>}
            <Divider />
            <List>
                {[
                    { name: "Home", icon: <HomeIcon />, index: 1, to: '/' },
                    { name: "Feed", icon: <RssFeedIcon />, index: 2, to: "/feed" },
                    { name: "Trending", icon: <WhatshotIcon />, index: 3, to: "/trending" },
                    // { name: "Explore", icon: <SearchIcon />, index: 4, to: "/explore" },
                    // { name: "New", icon: <CollectionsIcon />, index: 4, to: "/new" },
                    { name: "Settings", icon: <SettingsIcon />, index: 5, to: "/settings" },
                    { name: "My Profile", icon: <PersonIcon />, index: 6, to: `/users/${authState.username}` }
                ].map((item, index) => (
                    <ListItem button
                        key={item.index}
                        selected={location.pathname === item.to}
                        component={RouterLink}
                        to={item.to}
                        onClick={handleDrawerHide}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => { handleDrawerHide(); handleLogout(); }}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: 'left' }}
            id="account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {/*<MenuItem>Hi {authState.username}!</MenuItem>*/}
            <MenuItem onClick={handleMenuClose} component={RouterLink} to='/settings'>Account Settings</MenuItem>
            <MenuItem onClick={handleMenuClose} component={RouterLink} to={`/users/${authState.username}`} >Profile</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
        </Menu>
    );

    return (
        <ThemeProvider theme={appliedTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        {authState.isAuthenticated ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : ""}
                        <Typography variant="h6" noWrap className={classes.title} component={RouterLink} to="/" color="inherit">
                            LinkBook
                        </Typography>
                        <div className={classes.grow}></div>
                        {authState.isAuthenticated && <NewPost />}
                        <Tooltip title="Theme Toggle">
                            <IconButton aria-label="Theme toggle" onClick={handleThemeChange} color="inherit">
                                {icon}
                            </IconButton>
                        </Tooltip>
                        {authState.isAuthenticated ? (
                            <React.Fragment>
                                {/*<Tooltip title="Notifications">
                                    <IconButton aria-label="Notifications" color="inherit">
                                        <NotificationsNoneIcon />
                                    </IconButton>
                        </Tooltip>*/}
                                <Tooltip title="Account">
                                    <IconButton
                                        aria-label="Current User"
                                        color="inherit"
                                        edge="end"
                                        aria-controls="account-menu"
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>

                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button color="inherit" component={Link} to="/login" className={classes.mrLeft}>Login</Button>
                                <Button color="inherit" component={Link} to="/register" className={classes.mrLeft}>Register</Button>
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {authState.isAuthenticated ? (
                    <nav className={classes.drawer} aria-label="Drawer">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden mdUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>)
                    : ""
                }
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Container maxWidth="xl">
                        <UserContext.Provider value={user}>
                            {props.children}
                        </UserContext.Provider>
                    </Container>

                </main>
            </div>
        </ThemeProvider>
    );
}

Navigation.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navigation;