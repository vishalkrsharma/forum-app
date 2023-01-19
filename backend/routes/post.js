const { json } = require('express')
const express = require('express')

const router = express.Router()

//to create post
router.post('/create',(req,res)=>{
    res.status(200).json({message:"In Post create"})
})

//to get all the post 
router.get('/getAll',(req,res)=>{
    res.status(200).json({message:"In Get All"})
})

//to get a post
router.get('/:user',(req,res)=>{
    res.status(200).json({id:req.params})
})

//to delete a post
router.delete('/delete/:user',(req,res)=>{
    res.status(200).json({id:req.params})
})

router.post('/comment/:user',(req,res)=>{
    res.status(200).json({id:req.params})
})

module.exports =router