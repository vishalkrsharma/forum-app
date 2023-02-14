const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');

const createUserPost = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const username = data['username'];
  const userId = data['id'];
  const { groupId, groupName, title, caption } = req.body;
  console.log(groupId, groupName);
  try {
    await Post.createPost(userId, username, groupId, title, caption, groupName);
    res.status(200).json({ error: true, message: 'Posted Successfully' });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.status(200).json({ error: false, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const deletePost = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];
  const { postId, groupId } = req.body;
  console.log(postId, groupId, userId);
  try {
    const status = await Post.deletePost(postId, userId, groupId);
    if (status) res.status(200).json({ error: false, message: 'Post Deleted Successfully' });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByGroups = async (req, res) => {
  const { groupIds } = req.body;
  try {
    const posts = await Post.getByGroups(groupIds);
    res.status(200).json({ error: false, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByGroupName = async (req, res) => {
  const { groupName } = req.params;
  try {
    const posts = await Post.getByGroupName(groupName);
    res.status(200).json({ error: false, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByPostIds = async (req, res) => {
  const { postIdArray } = req.body;
  try {
    const posts = await Post.getByPostIds(postIdArray);
    res.status(200).json({ error: true, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByUserId = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];

  try {
    const posts = await Post.getByUserId(userId);
    res.status(200).json({ error: false, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

module.exports = { createUserPost, getAll, deletePost, getPostByGroups, getPostByUserId, getPostByGroupName, getPostByPostIds };
