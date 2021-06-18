import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { SERVER } from '../config';
import { useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core'

function PostById() {
	const { postId } = useParams();
	const [post, setPost] = React.useState();
	const [value, setValue] = React.useState("Loading...");

	const { enqueueSnackbar } = useSnackbar();

	
	React.useEffect(() => {
		fetch(`${SERVER}/posts/byid?postId=${postId}`, {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => response.json())
			.then(res => {
				if (res.success) {
					setPost(res.post);
				} else {
					setPost();
					setValue("Request post is either deleted or post id is wrong");
					enqueueSnackbar(res.message, { variant: "error" });
				}
			})
			.catch((error) => {
				setPost();
				setValue("Failed to get post");
				enqueueSnackbar('Failed to get post', { variant: "error" });
				console.error('Error:', error);
			});
	}, [postId, enqueueSnackbar])

	return (
		<>
			{post ? (<PostCard post={post} notSkeleton={true} single={true} />)
				: <Typography variant="subtitle1" color="inherit">{value}</Typography>}

		</>
	)
}

export default PostById;
