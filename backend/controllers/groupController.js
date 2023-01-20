const Group = require('../models/groupModel')
const jwt = require('jsonwebtoken')

const create = async(req,res)=>{
    console.log("here2")
    const {name,about,image} = req.body
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const data=jwt.decode(token,true)
    const username=data['username']
    console.log(data)
    const userId=data['id']
    const userObj = {
        'id':userId,
        'username':username
    }
    try{
        const group = await Group.createGroup(name,about,image,userObj)
        res.status(200).json(group)
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}

module.exports = {create}