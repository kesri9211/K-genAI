//routes are use to maintain  the structure
import express from 'express';
import { createPost, getAllPosts } from '../controllers/Post.js';

const router = express.Router();
router.get("/", getAllPosts);
router.post("/",createPost);

export default router;