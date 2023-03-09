const mongoose = require("mongoose")

const Schema = mongoose.Schema
const Post = require('../models/postModel')

const commentSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    user:{
        type:Object,
        required:true
    },
    parentId:{
        type:String,
    },
    postId:{
        type:String,
        required:true
    },
    like:{
        type:Array
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}) 

commentSchema.statics.createComment = async function(message,user,parentId=null,postId){
    const post = await Post.findOne({postId})
    if(!post) throw Error("The post is unavailable!!")
    var cmts = post.comments;
    const comment = await this.create({message:message,user:user,parentId:parentId,postId:postId})
    const status = await Post.updateOne({_id:postId},{$set:{comments:cmts}},{upsert:false});
    return comment;
}
commentSchema.statics.getAllComments = async function(postId){
    const comments = await this.find({postId})
    if(!comments) return []
    return comments
}
module.exports = mongoose.model("Comment",commentSchema)