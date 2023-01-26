const express = require('express')
const { createUserPost,getAll,deletePost,getPostByGroups,getPostByUserId,getPostByGroupId, getPostByPostIds }=require('../controllers/postController')
const {authenticate}=require('../middleware/userAuth')

const router = express.Router()

//CREATE POST
router.post('/create',authenticate,createUserPost)

//GET ALL POST 
router.get('/getAll',authenticate,getAll)

//DELETE POST
router.delete('/delete',authenticate,deletePost)

// GET POST BY USER ID
router.get('/byUserId',authenticate,getPostByUserId)

//GET POST OF USER BY GROUPID'S(LIST OF GROUPID'S)
router.get('/byGroups',authenticate,getPostByGroups)

//GET POST BY A SINGLE GROUP ID
router.get('/byGroupId',authenticate,getPostByGroupId)

//GET POST BY POST ID'S (LIST OF POST ID'S)
router.get('/byPostId',authenticate,getPostByPostIds)

router.post('/comment/:post',(req,res)=>{
    res.status(200).json({id:req.params})
})

module.exports =router