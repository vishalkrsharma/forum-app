const Post = require('../models/postModel')
const jwt = require('jsonwebtoken')


const createUserPost = async(req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data=jwt.decode(token,true)
    const username=data['username']
    console.log(data)
    const userId=data['id']
    const {title,caption}=req.body
    try{
        const data=await Post.createPost(userId,username,"63cafb4aff993bc380585849",title,caption,"brooooo")
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({err:err.message})
    }
    
}
const getAll = async(req,res)=>{
    try{
        const data = await Post.getAllPosts();
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}

const deletePost = async(req,res)=>{
    const id=req.params.post
    console.log(id)
    try{
        const status = await Post.deletePost(id)
        if(status) res.status(200).json({error:false,message:"Post Deleted Successfully"})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}


module.exports = {createUserPost,getAll,deletePost}