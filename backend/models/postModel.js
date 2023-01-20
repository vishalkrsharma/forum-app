const mongoose = require('mongoose')
const User = require('../models/userModel')
const Group = require('../models/groupModel')
const Schema = mongoose.Schema


const postSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    timestamps:{
        type:Date,
        default:Date.now()
    },
    username:{
        type:String,
        required:true,
    },
    groupId:{
        type:String,
        required:true,
    },
    groupName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    comments:{
        type:Array,
    },
    like:{
        type:Array
    },
    likeCount:{
        type:Number
    }
})

postSchema.statics.createPost=async function(userId,username,group_id,title,caption,grpName){

    const post=await this.create({userId:userId,username:username,groupId:group_id,title:title,caption:caption,groupName:grpName})    
    const userPost= await User.findOne({username})
    const group = await Group.findOne({group_id})
    const groupPost=group.posts
    const posts=userPost.posts
    posts.push(post.id)
    groupPost.push(post.id)
    const result = await User.updateOne({username:username},{$set:{posts:posts}},{upsert:false})
    const status = await Group.updateOne({group_id},{$set:{posts:groupPost}},{upsert:false})
    console.log(result,status)
    if(!post) throw Error("Cannot Create post! Something went wrong")
    return post;
}

postSchema.statics.getAllPosts = async function(){
    const posts=await this.find().lean()
    
    if(posts.length==0) return {error:true,message:"There is no Post"}
    return posts
}

postSchema.statics.deletePost = async function(postId){
    const post=await this.findByIdAndRemove(postId)
    if(!post){
        throw Error('No such post available for the id specified')
    }
    return true
}

module.exports = mongoose.model('Post',postSchema)