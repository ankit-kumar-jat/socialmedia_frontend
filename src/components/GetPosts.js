import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import { SERVER } from '../config';
import {
    Button,
    CircularProgress,
    Box,
} from '@material-ui/core';

export class GetPosts extends Component {
    state = {
        data: null,
        loadMore: false,
        nextPage: 1
    }

    nullPost = { postId: null, userId: null, postImage: null, postText: null, created_at: null };

    getPosts = (page) => {
        fetch(`${SERVER}${this.props.url}?page=${page}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    if (this.state.nextPage > 1) {
                        this.setState({
                            ...this.state,
                            data: {
                                next: res.next,
                                posts: this.state.data.posts.concat(res.posts)
                            },
                            nextPage: this.state.nextPage + 1,
                            loadMore: false,
                        });
                    } else {
                        this.setState({
                            ...this.state,
                            data: res,
                            nextPage: this.state.nextPage + 1,
                            loadMore: false,
                        });
                    }
                } else {
                    // enqueueSnackbar(res.message, { variant: "error" });
                    this.setState({
                        ...this.state,
                        nextPage: this.state.nextPage - 1,
                        loadMore: false
                    });
                }
            })
            .catch((error) => {
                // enqueueSnackbar('Failed to get post', { variant: "error" });
                this.setState({
                    ...this.state,
                    nextPage: this.state.nextPage - 1,
                    loadMore: false
                });
                console.error('Error:', error);
            });
    }

    handleLoadMore = () => {
        this.setState({
            ...this.state,
            loadMore: true
        })
        this.getPosts(this.state.nextPage);
    }

    componentDidMount() {
        this.getPosts(this.state.nextPage);
    }

    componentDidUpdate(prevProps) {
        if (this.props.authState.refreshPost !== prevProps.authState.refreshPost) {
            this.setState({
                ...this.state,
                nextPage: 1,
            })
            this.getPosts(1);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.data ? (this.state.data.posts.map(post => <PostCard post={post} notSkeleton={true} key={post.postId} />))
                    : (<React.Fragment>
                        <PostCard notSkeleton={false} post={this.nullPost} key='skelton1' />
                        <PostCard notSkeleton={false} post={this.nullPost} key='skelton2' />
                    </React.Fragment>)
                }
                {this.state.data && this.state.data.next && <Box
                    display="flex"
                    justifyContent="center"
                    style={{
                        position: 'relative',
                        marginBottom: 24,
                    }}>
                    <Button
                        variant='outlined'
                        color="primary"
                        onClick={this.handleLoadMore}
                        disabled={this.state.loadMore}>
                        Load More
                        </Button>
                    {this.state.loadMore && <CircularProgress
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                        }}>
                    </CircularProgress>}
                </Box>}
            </React.Fragment>
        )
    }
}

export default GetPosts
