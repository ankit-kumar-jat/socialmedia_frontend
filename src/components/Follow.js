import React from 'react';
import {
    Button,
    CircularProgress
} from '@material-ui/core';
import { SERVER } from '../config';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import AuthContext from '../utils/AuthContext';

const useStyles = makeStyles((theme) => ({
    progressbar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    btnWrapper: {
        position: 'relative',
        marginRight: theme.spacing(1),
    }
}));

function Follow(props) {
    const classes = useStyles()
    const [follow, setFollow] = React.useState(false)
    const [disable, setDisable] = React.useState(false)
    const { authDispatch } = React.useContext(AuthContext);

    const { enqueueSnackbar } = useSnackbar();

    const handleFollow = () => {
        setDisable(true)
        const data = { userId: props.userId };
        fetch(`${SERVER}/users/follow?userId=${props.userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFollow(!follow)
                    authDispatch({
                        type: 'REFUSER'
                    })
                    enqueueSnackbar(data.message, { variant: "success" });
                } else {
                    enqueueSnackbar(data.message, { variant: "error" });
                }
                setDisable(false);
            })
            .catch((error) => {
                enqueueSnackbar("Request failed!", { variant: "error" });
                setDisable(false);
                console.log(error);
            });
    }
    React.useEffect(() => {
        fetch(`${SERVER}/users/follow?userId=${props.userId}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.follow) {
                        setFollow(true)
                    } else {
                        setFollow(false)
                    }
                } else {
                    enqueueSnackbar(data.message, { variant: "error" });
                    setFollow(false)
                }
            })
            .catch((error) => {
            });
    }, [setFollow, props.userId, enqueueSnackbar]);
    return (
        <React.Fragment>
            <div className={classes.btnWrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleFollow}
                    disabled={disable}>
                    {follow ? "Unfollow" : "Follow"}
                </Button>
                {disable && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
            </div>
        </React.Fragment>
    );
}

export default Follow
