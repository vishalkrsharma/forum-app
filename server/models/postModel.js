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

    
    //CREATING A POST
    const post=await this.create({userId:userId,username:username,groupId:group_id,title:title,caption:caption,groupName:grpName})    
    if(!post) throw Error("Cannot Create post! Something went wrong")

    //QUERING USERPOST AND GROUP TO UPDATE THEIR POST SECTION
    const userPost= await User.findOne({username})
    const group = await Group.findOne({grpName})
    console.log(userPost,group)
    //GETTING THE USER AND GROUP POSTS 
    const groupPost=group.posts
    const posts=userPost.posts

    //UPDATING THE ARRAY
    posts.push(post.id)
    groupPost.push(post.id)


    //UPDATING GROUP AND USER 
    /*THIS IS WHEN WE CREATE A POST IT SHOULD ALSO BE PRESENT IN THE GROUP 
    AS WE ARE CREATING A POST INSIDE A SPECIFIC GROUP AND 
    ALSO INSIDE THE USER AS IT IS A USER POST ALSO
    */
    const result = await User.updateOne({username:username},{$set:{posts:posts}},{upsert:false})
    const status = await Group.updateOne({group_id},{$set:{posts:groupPost}},{upsert:false})

    if(!result && !status)
        throw Error("Cannot Update components. Something went wrong")
    
    return post;
}

postSchema.statics.deletePost = async function(postId,userId){
    console.log(postId,userId)
    const post=await this.findById(postId)
    if(post){
        const groupId = post.groupId
        const status= await post.deleteOne()
        if(status.deleteCount==0){
            throw Error('Something went wrong')
        }else{
            console.log("here")
            const checkUser = await User.deletePost(userId,postId)
            console.log("here1")
            const checkGroup = await Group.deletePost(groupId,postId)
            if(checkUser && checkGroup)
            return true
        }
    }
    return false;
}


postSchema.statics.getByGroups = async function(groupIdArray){
    //THE IN QUERY WILL FIND ACCORDING TO MULTIPLE ID'S
    const posts = await this.find({"groupId":{"$in":groupIdArray}}).sort({timestamps:-1})
    console.log(groupIdArray , posts)
    if(posts.length===0)return [];
    return posts
}

postSchema.statics.getByPostId = async function(postId){
    const post = await this.findOne({postId});
    if(!post)return []
    return post
}

postSchema.statics.getByGroupName = async function(groupName){
    const post = await this.find({groupName})
    if(!post) return []
    return post
}

postSchema.statics.getByUserId = async function(userId){
    const posts = await this.find({userId})
    if(!posts)return []
    return posts
}



module.exports = mongoose.model('Post',postSchema)