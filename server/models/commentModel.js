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
    console.log(message,user,postId,parentId);
  
    const post = await Post.findOne({postId})
    console.log("55")
    console.log(post)
    if(!post) throw Error("The post is unavailable!!")
    
    var cmts = post.comments;
    console.log(cmts)
    const comment = await this.create({message:message,user:user,parentId:parentId,postId:postId})

    cmts.push(comment);
    const status = await Post.updateOne({_id:postId},{$set:{comments:cmts}},{upsert:false});
    console.log(status)
    return comment;
}
commentSchema.statics.getAllComments = async function(postId){
    console.log("in model")
    const comments = await this.find({postId})
    if(!comments) return []
    return comments
}
module.exports = mongoose.model("Comment",commentSchema)