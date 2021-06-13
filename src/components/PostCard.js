import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
    CardContent,
    CardActions,
    Tooltip,
    Collapse,
    Divider,
    TextField,
    CircularProgress,
    Menu,
    MenuItem,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../components/Comment';
import AuthContext from '../utils/AuthContext';
import { useSnackbar } from 'notistack';
import UserContext from '../utils/UserContext';
import { SERVER } from "../config";


const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: 10,
        marginBottom: theme.spacing(3),
    },
    cardContent: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    marginLeft: {
        marginLeft: theme.spacing(2)
    },
    commentForm: {
        display: 'flex',
        alignItems: "center",
    },
    commentAvatar: {
        marginRight: theme.spacing(2),
    },
    progressbar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -4,
        marginLeft: -12,
    },
    noPadding: {
        padding: 0,
    },
    media: {
        paddingTop: '56.25%',
    },
}));

export default function PostCard(props) {
    const classes = useStyles();
    const [hide, setHide] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const { authDispatch } = React.useContext(AuthContext);
    const [post, setPost] = React.useState(props.post);
    const [values, setValues] = React.useState({
        comment: ''
    });
    const [liked, setLiked] = React.useState()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const user = React.useContext(UserContext);

    const [disableBtn, setDisableBtn] = React.useState({
        comment: false,
        delete: false,
    });
    const [expanded, setExpanded] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const date = new Date(post.created_at);
    const t = date.toDateString().split(" ");

    const handlePostMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = () => {
        const data = { postId: post.postId };
        if (window.confirm('Are you sure you want to delete post?')) {
            fetch(`${SERVER}/posts/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        enqueueSnackbar('Post Deleted!', { variant: "success" });
                        authDispatch({
                            type: 'REFUSER',
                        });
                        setHide(true);
                    } else {
                        enqueueSnackbar(data.message, { variant: "error" });
                        setDisableBtn({
                            delete: false
                        })
                    }
                })
                .catch((error) => {
                    enqueueSnackbar('Post deletion failed!', { variant: "error" });
                    setDisableBtn({
                        delete: false
                    })
                    console.error('Error:', error);
                });
        }
    }

    const isMenuOpen = Boolean(anchorEl)
    const menuId = `post-${post.postId}-menu`;
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/*<MenuItem>Hi {authState.username}!</MenuItem>*/}
            <MenuItem onClick={handleMenuClose} disabled>Save Post</MenuItem>
            <MenuItem onClick={handleMenuClose} disabled>Report post</MenuItem>
            {!loading && props.notSkeleton && user.userId === post.owner.userId && (<div>
                {/*<Divider />*/}
                <MenuItem onClick={() => { handleMenuClose(); handleDeletePost(); }} >
                    <Typography color='secondary'> Delete post</Typography>
                </MenuItem>
            </div>)}
        </Menu>
    );

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleChange = (event) => {
        setValues({ ...values, comment: event.target.value });
    }

    const handleSubmitNewComment = (e) => {
        e.preventDefault()
        if (values.comment) {
            setDisableBtn({ comment: true })
            const body = { postId: post.postId, value: values.comment }
            fetch(`${SERVER}/posts/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        setValues({ comment: '' });
                        enqueueSnackbar(res.message, { variant: "success" });
                        var comments = post.commentslist;
                        comments.unshift(res);
                        setPost({
                            ...post,
                            comments: post.comments + 1,
                            commentslist: comments
                        });
                    } else {
                        if (res.status === 401)
                            authDispatch({
                                type: "logout"
                            })
                        enqueueSnackbar(res.message, { variant: "error" });

                    }
                    setDisableBtn({ comment: false });
                })
                .catch((error) => {
                    enqueueSnackbar('Failed to get post', { variant: "error" });
                    setDisableBtn({ comment: false });
                    console.error('Error:', error);
                });
        } else {
            enqueueSnackbar("Comment can't be empty", { variant: "warning" });
        }
    }

    const handleLike = () => {
        fetch(`${SERVER}/posts/like?postId=${post.postId}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    if (res.success) {
                        if (res.liked) {
                            setPost({
                                ...post,
                                likes: post.likes + 1,
                            })
                        } else {
                            setPost({
                                ...post,
                                likes: post.likes - 1,
                            })
                        }
                        setLiked(res.liked)
                        // enqueueSnackbar(res.message, { variant: "success" });
                    } else {
                        if (res.status === 401)
                            authDispatch({
                                type: "logout"
                            })
                        enqueueSnackbar(res.message, { variant: "error" });
                    }
                }

            })
            .catch((error) => {
                enqueueSnackbar('Failed to like post', { variant: "error" });
            });
    }

    React.useEffect(() => {
        if (props.notSkeleton) {
            fetch(`${SERVER}/posts/like?postId=${post.postId}`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        setLiked(res.liked);
                        // enqueueSnackbar(res.message, { variant: "success" });
                    }
                    // else {
                    // if (res.status === 401)
                    //     authDispatch({
                    //         type: "logout"
                    //     })
                    // }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    // enqueueSnackbar('Failed to like post', { variant: "error" });
                })
        }
    }, [setLiked, post.postId, props.notSkeleton])

    return (
        <React.Fragment>
            {!hide && <Card className={classes.card} variant="outlined">
                <CardHeader
                    avatar={!loading && props.notSkeleton ? (<IconButton
                        component={RouterLink}
                        to={`/users/${post.owner.login}`}
                        className={classes.noPadding}
                        aria-label="user profile">
                        <Avatar aria-label="user avatar" alt={post.owner.login} src={post.owner.avatar ? `${SERVER}${post.owner.avatar}` : ""}>
                        </Avatar>
                    </IconButton>)
                        : (<Skeleton animation="wave" variant="circle" width={40} height={40} />)
                    }
                    action={!loading && props.notSkeleton ?
                        (<IconButton
                            aria-label="Post options"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handlePostMenuOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>)
                        : null
                    }
                    title={!loading ? (
                        <Typography
                            component={RouterLink}
                            to={`/users/${post.owner.login}`}
                            color="inherit"
                            variant="body2"
                            style={{ textDecoration: "none" }}>
                            {post.owner.login}
                        </Typography>
                    )
                        : (<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />)}
                    subheader={!loading ? `${t[1]} ${t[2]} ${t[3]}` : (<Skeleton animation="wave" height={10} width="40%" />)}
                />
                {!loading && props.notSkeleton ?
                    (post.postImage && <CardMedia
                        style={{
                            height: 0,
                            paddingTop: '56.25%',
                        }}
                        image={`${SERVER}${post.postImage}`}
                        title={`${post.owner.login}'s post`}
                        alt={post.postImage}
                    />
                    )
                    : (<Skeleton animation="wave" variant="rect" className={classes.media} />)
                }
                <CardContent>
                    {!loading && props.notSkeleton ? (<Typography component="p">
                        {post.postText}
                    </Typography>)
                        : (<React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>)
                    }
                </CardContent>

                {!loading && props.notSkeleton ? (<Typography className={classes.marginLeft} variant='subtitle2' component="p">
                    {post.likes} {post.like > 1 ? "Likes" : "Like"}
                    <Typography component="span" variant='subtitle2' className={classes.marginLeft}>{post.comments} {post.comments > 1 ? "Comments" : "Comment"}</Typography>
                </Typography>)
                    : (<Skeleton animation="wave" height={10} width="50%" style={{ marginLeft: 16, marginBottom: 11 }} />)
                }
                <CardActions disableSpacing >
                    {props.notSkeleton ? (<React.Fragment>
                        {liked ? <Tooltip title="Unlike this">
                            <IconButton aria-label="unlike" onClick={handleLike} color='primary'>
                                <ThumbUpAltOutlinedIcon color="inherit" />
                            </IconButton>
                        </Tooltip>
                            : <Tooltip title="Like this">
                                <IconButton aria-label="like" onClick={handleLike}>
                                    <ThumbUpAltOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip title="Comments">
                            <IconButton className={classes.marginLeft} aria-label="comment" onClick={handleExpandClick}>
                                <CommentOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share this">
                            <IconButton aria-label="share" className={classes.marginLeft}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>)
                        : (<div style={{ height: 36 }}></div>)
                    }
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Divider />
                    <CardContent>
                        <form onSubmit={handleSubmitNewComment} className={classes.commentForm}>
                            {user && <Avatar src={user.avatar ? `${SERVER}${user.avatar}` : ""} className={classes.commentAvatar}></Avatar>}
                            <TextField id="commentInput" label="Write a comment..." onChange={handleChange} value={values.comment} fullWidth />
                            <div style={{ position: 'relative' }}>
                                <Tooltip title="Add Comment">
                                    <IconButton aria-label="add comment" color="primary" type='submit' disabled={disableBtn.comment}>
                                        <SendIcon />
                                    </IconButton>
                                </Tooltip>
                                {disableBtn.comment && <CircularProgress size={24} className={classes.progressbar}></CircularProgress>}
                            </div>
                        </form>
                    </CardContent>
                    {props.notSkeleton && (post.commentslist.map(comment => <Comment comment={comment} key={comment.commentId} />))}
                </Collapse>
            </Card>}
            {renderMenu}
        </React.Fragment>
    )
}
