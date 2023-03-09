const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');
const Comment = require('../models/commentModel')

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
const getPostByPostIds = async (req, res) => {
  const authHeaders = req.headers['authorization']
  const token = authHeaders && authHeaders.split(' ')[1]
  const user = jwt.decode(token,true)
  const userId = user['id']
  try {
    const posts = await Post.getByUserId(userId);
    res.status(200).json({ error: true, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
const deletePost = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];
  const postId = req.params.postId;
  console.log(postId)
  try {
    const status = await Post.deletePost(postId, userId);
    if (status) res.status(200).json({ error: false, message: 'Post Deleted Successfully' });
    else throw Error("Something went wrong!")
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByGroups = async (req, res) => {
  const { groups } = req.body;
  try {
    const posts = await Post.getByGroups(groups);
    if(posts.length==0) res.status(200).json({ error: false, message: 'No Such Posts!', data: posts }); 
    else res.status(200).json({ error: false, message: 'Success', data: posts });
    
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const getPostByGroupName = async (req,res)=>{
    const {groupName} = req.params
    try{
        const posts = await Post.getByGroupName(groupName)
        if(posts.length==0)res.status(200).json({error:false,message:"This Groups hasn't posted yet",data:posts})
        else res.status(200).json({error:false,message:"Success",data:posts})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}

const getPostByUserId = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userId = data['id'];

  try {
    const posts = await Post.getByUserId(userId);
    if(posts.length == 0)res.status(200).json({ error: false, message: 'No such posts!!', data: posts });
    else res.status(200).json({ error: false, message: 'Success', data: posts });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

const comment = async(req,res)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const data = jwt.decode(token, true);
  const userObj = {
    "username":data["username"],
    "id":data['id']
  }
  const postId = req.params.postId;
  const {message,parentId} = req.body;
  try{
    const comment  =await Comment.createComment(message,userObj,parentId,postId);
    res.status(200).json({error:false,message:"Commented Succesfully",data:comment});
  }catch(e){
    res.status(400).json({error:true,message:e.message})
  }
}
const getComment = async(req,res)=>{
  const postId = req.params.postId;
  try{
    const comments = await Comment.getAllComments(postId)
    if(comments.length==0)res.status(200).json({error:false,message:"There are no comments!!",data:comments});
    else res.status(200).json({error:false,message:"Success",data:comments})
  }catch(e){
    res.status(400).json({error:true,message:e.message})
  }
}
module.exports = { createUserPost, getAll, deletePost, getPostByGroups, getPostByUserId, getPostByGroupName, getPostByPostIds ,comment,getComment};
