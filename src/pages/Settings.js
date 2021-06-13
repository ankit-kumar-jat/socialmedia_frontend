import {
    Typography,
    Tabs,
    Tab,
    Divider,
    Box,
    Container,
} from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ChangePasswordForm from '../components/ChangePasswordForm';
import EditProfile from '../components/EditProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(2),
        }
    },
    mrBottom: {
        marginBottom: theme.spacing(3),
    },
    mrTop: {
        marginTop: theme.spacing(3),
    }
}));

export default function Settings() {

    const classes = useStyles();
    const [index, setIndex] = React.useState(0);

    const handleChangeIndex = (event, index) => {
        setIndex(index);
    };

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Typography variant="h4" className={classes.mrBottom}>Account Settings</Typography>
                <Tabs
                    value={index}
                    onChange={handleChangeIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    style={{ overflow: "auto" }}
                >
                    <Tab label="Profile" />
                    <Tab label="Password" />
                    {/*<Tab label="Account" />*/}
                </Tabs>
                <Divider />

                {(index === 0) && (<Box index={0} className={classes.mrTop} style={{ display: 'flex' }}>
                    <Container maxWidth="xs" disableGutters>
                        <EditProfile />
                    </Container>
                    <div style={{ flexGrow: 1 }}></div>
                </Box>)}
                {(index === 1) && (<Box index={1} style={{ display: 'flex' }}>
                    <Container maxWidth="xs" disableGutters>
                        <ChangePasswordForm />
                    </Container>
                    <div style={{ flexGrow: 1 }}></div>
                </Box>)}
                {/* {(index === 2) && (<Box index={2} className={classes.mrTop}>
                    Account Settings will come soon...
               </Box>)}*/}
            </Box>
        </React.Fragment>
    )

}

