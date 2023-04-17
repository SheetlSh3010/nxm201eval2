const express = require('express');
const mongoose=require("mongoose")
const { Blog } = require('../models/blog.model');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const blogRouter = express.Router();
//blogRouter.use(express.json());

// Get all blogs
blogRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Get a specific blog by ID
blogRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Create a new blog
blogRouter.post('/', auth, async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      author: req.user._id,
    });
    await blog.save();
    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Update a blog
blogRouter.patch('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Delete a blog
blogRouter.delete('/:id', auth, authorize('moderator'), async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id });
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = {blogRouter};