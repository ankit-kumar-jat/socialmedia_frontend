import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import {
    Tooltip,
    IconButton,
    Modal,
    Fade,
    Backdrop,
    Card,
    CardActionArea,
    // CardMedia,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    TextField,
    // Divider,
    Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack'
import { validatePostText } from "../utils/validator";
import AuthContext from '../utils/AuthContext';
import { SERVER } from '../config'

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
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    closeBtn: {
        position: 'absolute',
        right: theme.spacing(.5),
        top: theme.spacing(.5),
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

export default function NewPost() {
    const history = useHistory();
    const classes = useStyles();
    const { authDispatch } = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [disableBtn, setDisableBtn] = React.useState({
        submit: false,
    });
    const [values, setValues] = React.useState({
        preview: '',
        postText: '',
    });

    const [errors, setErrors] = React.useState({
        postText: false
    })
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
        if (validatePostText(values.postText)) {
            const formData = new FormData();
            if (image)
                formData.append('image', image);

            formData.append('postText', values.postText);
            fetch(`${SERVER}/posts/create`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        enqueueSnackbar('Post Created!', { variant: "success" });
                        setValues({ image: '', postText: '' });
                        setOpen(false);
                        authDispatch({
                            type: 'REFPOST'
                        })
                        history.push(`/posts/${data.post._id}`);
                    } else {
                        if (data.status === 401)
                            authDispatch({
                                type: "LOGOUT"
                            })
                        enqueueSnackbar(data.message, { variant: "error" });
                    }
                    setDisableBtn({
                        submit: false
                    })
                })
                .catch((error) => {
                    enqueueSnackbar('Post Creation Failed', { variant: 'error' });
                    setDisableBtn({
                        submit: false
                    })
                    console.error('Error:', error);
                });
        } else {
            setDisableBtn({ submit: false });
            enqueueSnackbar('Post text must be 10-255 characters long', { variant: 'warning' });
        }
    }

    const handleInputChange = (prop) => (event) => {
        if (prop === 'image') {
            image = event.target.files[0];
            setValues({ ...values, preview: URL.createObjectURL(event.target.files[0]) });
        } else {
            setValues({ ...values, [prop]: event.target.value });
            setErrors({ postText: !validatePostText(event.target.value) })
        }
    }

    return (
        <React.Fragment>
            <Tooltip title="New Post">
                <IconButton color="inherit" aria-label="add new post" onClick={handleOpen} >
                    <AddIcon />
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
                            <CardActionArea className={classes.media}>
                                <Container disableGutters className={classes.imageWrapper}>
                                    {/*<CardMedia
                                    className={classes.media}
                                    image='${SERVER}/images/profile/profile-ankit.jpg'
                                    title="Contemplative Reptile"
                                />*/}
                                    <div></div>{/*this is because a container must hava a child */}
                                    {values.preview && <img src={values.preview} alt="Post" className={classes.image} />}
                                </Container>
                            </CardActionArea>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    id="postText"
                                    label="Whats Happening?"
                                    multiline
                                    rows={4}
                                    value={values.postText}
                                    onChange={handleInputChange('postText')}
                                    error={errors.postText}
                                />
                            </CardContent>
                            {/*<Divider />*/}
                            <CardActions>
                                <div style={{ flexGrow: 1 }}>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="postImage"
                                        type="file"
                                        onChange={handleInputChange('image')} />
                                    <label htmlFor="postImage">
                                        <Tooltip title="Add post image" component="span">
                                            <IconButton aria-label="Add post image" color='primary'>
                                                <CameraAltIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </label>
                                </div>
                                <Button variant="contained" disableElevation onClick={handleClose}>
                                    Close
                                </Button>
                                <div className={classes.btnWrapper}>
                                    <Button variant="contained" color="primary" type='submit' disableElevation disabled={disableBtn.submit}>
                                        Create Post
                                    </Button>
                                    {disableBtn.submit && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                                </div>
                            </CardActions>
                        </form>
                        <CardActions className={classes.closeBtn}>
                            <Tooltip title="Close">
                                <IconButton aria-label="Close Modal" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
                </Fade>
            </Modal>
        </React.Fragment>
    );

}

