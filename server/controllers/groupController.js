const Group = require('../models/groupModel')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


//CREATE GROUP
const create = async(req,res)=>{
    
    const {name,about,image} = req.body
    
    //GETTING TOKEN FROM THE HEADERS AND DECODING IT
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data = jwt.decode(token,true)
    const username=data['username']
    const userId=data['id']
    const userObj = {
        'id':userId,
        'username':username
    }


    try{
        const group = await Group.createGroup(name,about,image,userObj)
        await User.updateGroup({'_id':group._id,'name':group.name},userId,true)
        res.status(200).json({error:false,message:"Success",data:group})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
    
}

//GET A SINGLE GROUP
const getGroup = async (req,res)=>{
    const {groupId} = req.params
    try{
        const group = await Group.getGroupById(groupId)
        res.status(200).json({error:false,message:"Success",data:group})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}


//GET GROUPS ACCORDING TO GROUP ID'S
const getUserGroups = async (req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data = jwt.decode(token,true)
    const userId = data['userId']
    try{
        const groups = await Group.getUserGroupsById(userId)
        if(groups.length==0)res.status(200).json({error:false,message:"You haven't joined in any group",data:groups})
        else res.status(200).json({error:false,message:"Success",data:groups})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}

//JOIN A GROUP
const join = async(req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data = jwt.decode(token,true)
    console.log(data['id'])
    const user = {
        'id':data['id'],
        'username':data['username']
    }
    const {id,groupName} = req.body
    try{
        await Group.updateMembers(user,id,true)
        await User.updateGroup({'_id':id,"name":groupName},user['id'],true)
        res.status(200).json({error:false,message:"Joined Successfully"})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}


//LEAVE A GROUP
const leave = async(req,res)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data = jwt.decode(token,true)
    console.log(data['id'])
    const user = {
        'id':data['id'],
        'username':data['username']
    }
    const {id} = req.body
    try{
        await Group.updateMembers(user,id,false)
        await User.updateGroup({'id':id},user['id'],false)
        
        res.status(200).json({error:false,message:"You left the Group"})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}


//SEARCH A GROUP BY NAME
const searchGroup = async (req,res)=>{
    const {groupName} = req.body
    try{
        const groupList = await Group.getGroupsByName(groupName)
        if(groupList.length==0)res.status(200).json({error:false,message:"No Groups available",data:groupList})
        else res.status(200).json({error:false,message:'Success',data:groupList})
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}

module.exports = {create,getGroup,join,leave,getUserGroups,searchGroup}