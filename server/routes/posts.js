import express from 'express';

import { getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import { get } from 'mongoose';

const router = express.Router();

//localhost:5000/posts
router.get('/:id', getPost);
router.get('/', getPosts);
router.get('/search', getPostsBySearch);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;