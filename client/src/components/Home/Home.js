import React from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';
import { useState } from 'react';
import Pagination from '../Pagination';

import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const [search, setSearch] = useState(''); //[europe, asia] => europe, asia
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    const handlekeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => {
        console.log(tag)
        setTags([...tags, tag]);
    };

    const handleDeleteChip = (tagToDelete) => {
        console.log(tagToDelete)
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleKeyPressTags = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            handleAddChip(e.target.value);
            e.target.value = '';
        }
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyPress={handlekeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ marginTop: 15 }}
                            />
                            <div>
                                <TextField
                                    label="Add a tag"
                                    variant="outlined"
                                    onKeyPress={handleKeyPressTags}
                                    fullWidth
                                    inputProps={{ placeholder: 'Type and press enter' }}
                                    style={{ marginTop: 15 }}
                                />
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => handleDeleteChip(tag)}
                                        style={{ margin: 5 }}
                                    />
                                ))}
                            </div>
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;