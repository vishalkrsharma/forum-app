const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    members:{
        type:Array
    },
    image:{
        type:String
    },
    posts:{
        type:Array,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    admin:{
        type:Object,
    }
})

groupSchema.statics.createGroup = async function(name,about,image,userObj){
    const check = await this.findOne({name})
    if(check)throw Error('Group Name already exists, Try a different name')
    const members=[]
    members.push(userObj)
    const group = await this.create({name:name,about:about,image:image,admin:userObj,members:members})
    console.log(group)
    return group;
}

groupSchema.statics.getGroupById = async function(groupId){
    const group = await this.findOne({_id : groupId})
    if(!group)throw Error("No Such group exists")
    return group;
}

groupSchema.statics.getUserGroupsById = async function(groupIdArray){
    const groups = await this.find({'_id':{'$in':groupIdArray}})
    if(groups.length===0)throw Error("You haven't joined in any group")
    return groups;
}

groupSchema.statics.deletePost = async function(groupId,postId){
    console.log("he")
    const group = await this.findOne({groupId})
    console.log(group)
    if(!group)throw Error("Something went wrong plz try again")
    const groupPost = group.posts
    groupPost.remove(postId)
    const status = await this.updateOne({_id:groupId},{'$set':{posts:groupPost}},{upsert:false})
    if(!status) throw Error("Something went wrong plz try again")
    return true
}

groupSchema.statics.updateMembers = async function(user,groupId,state){
    const group = await this.findById(groupId)
    
    if(!group)throw Error("No such group exists")
    const members = group.members
    
    
    if(state)members.push(user)
    else members.pop(user)

    const status = await this.updateOne({_id:groupId},{$set:{members:members}},{upsert:false})
    if(!status)throw Error("Something went error")
    return true
}

groupSchema.statics.getGroupsByName = async function(groupName){
    const groups = await this.find({name:{$regex:new RegExp('^'+groupName+'.*','i')}})
    if(groups.length===0) throw Error("No groups found")
    return groups
}

module.exports = mongoose.model('Group',groupSchema)