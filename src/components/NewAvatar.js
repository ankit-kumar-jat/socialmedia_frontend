import React from 'react'
import {
    Tooltip,
    IconButton,
    Modal,
    Fade,
    Backdrop,
    Card,
    CardActionArea,
    CardActions,
    Button,
    CircularProgress,
    Divider,
    Container,
    CardHeader,
    CardContent,
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import AuthContext from '../utils/AuthContext';
import { SERVER } from "../config";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardRoot: {
        width: '100%',
        maxWidth: 600,
        overflow: 'auto',
        margin: theme.spacing(2),
        position: 'relative',
        outline: 'none',
    },
    media: {
        minHeight: 60,
        maxHeight: 250,
    },
    image: {
        maxHeight: 250,
        maxWidth: '100%',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    progressbar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    btnWrapper: {
        position: 'relative',
    },
    input: {
        display: 'none',
    }
}));

var image = null;

export default function NewAvatar() {
    const classes = useStyles();
    const { authDispatch } = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [disableBtn, setDisableBtn] = React.useState({
        submit: false,
    });
    const [values, setValues] = React.useState({
        preview: '',
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        setDisableBtn({ submit: true });
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            fetch(`${SERVER}/users/update-avatar`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        enqueueSnackbar('Avatar Updated!', { variant: "success" });
                        setValues({ preview: '' })
                        setOpen(false);
                        authDispatch({
                            type: "REFUSER"
                        })
                    } else {
                        if (data.status === 401)
                            authDispatch({
                                type: "LOGOUT"
                            })
                        enqueueSnackbar(data.message, { variant: "error" });
                        setValues({ preview: '' })
                    }
                    setDisableBtn({
                        submit: false
                    })
                })
                .catch((error) => {
                    enqueueSnackbar('Avatar updation Failed', { variant: 'error' });
                    setValues({ preview: '' })
                    setDisableBtn({
                        submit: false
                    })
                    console.error('Error:', error);
                });
        } else {
            setDisableBtn({ submit: false });
            enqueueSnackbar('You need to select an image', { variant: 'warning' });
        }
    }

    const handleInputChange = () => (event) => {
        image = event.target.files[0];
        setValues({ ...values, preview: URL.createObjectURL(event.target.files[0]) });
    }

    return (
        <React.Fragment>
            <Tooltip title="Change avatar">
                <IconButton color="primary" aria-label="add new post" onClick={handleOpen} >
                    <CameraAltIcon />
                </IconButton>
            </Tooltip>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Card className={classes.cardRoot}>
                        <form onSubmit={handleCreatePost}>
                            <CardHeader
                                action={
                                    <Tooltip title="Close">
                                        <IconButton aria-label="Close Modal" onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                title="Update Avatar"
                            />
                            <CardActionArea className={classes.media}>
                                <Container disableGutters className={classes.flexCenter}>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="postImage"
                                        type="file"
                                        onChange={handleInputChange()} />

                                    {values.preview
                                        ? (
                                            <img src={values.preview} alt="Post" className={classes.image} />
                                        )
                                        : <label htmlFor="postImage">
                                            <Tooltip title="Select Avatar Image" component="span">
                                                <Button variant="contained" aria-label="select avatar image" color='primary' startIcon={<CameraAltIcon />}>
                                                    Select Avatar Image
                                                </Button>
                                            </Tooltip>
                                        </label>
                                    }
                                </Container>
                            </CardActionArea>
                            <CardContent className={classes.flexCenter}>
                                {values.preview && <label htmlFor="postImage">
                                    <Tooltip title="Select other image" component="span">
                                        <Button variant="contained" aria-label="select avatar image" color='primary' startIcon={<CameraAltIcon />}>
                                            Select other Image
                                        </Button>
                                    </Tooltip>
                                </label>}
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <div style={{ flexGrow: 1 }}>
                                </div>
                                <Button variant="contained" disableElevation onClick={handleClose}>
                                    Close
                                    </Button>
                                <div className={classes.btnWrapper}>
                                    <Button variant="contained" color="primary" type='submit' disableElevation disabled={disableBtn.submit}>
                                        Update Avatar
                                    </Button>
                                    {disableBtn.submit && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                                </div>
                            </CardActions>
                        </form>
                    </Card>
                </Fade>
            </Modal>
        </React.Fragment>
    );

}

