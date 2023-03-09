const express = require('express')
const { createUserPost,getAll,deletePost,getPostByGroups,getPostByUserId,getPostByGroupName, getPostByPostIds, comment, getComment }=require('../controllers/postController')
const {authenticate}=require('../middleware/userAuth')

const router = express.Router()

//CREATE POST
router.post('/create',authenticate,createUserPost)

//DELETE POST
router.delete('/delete/:postId',authenticate,deletePost)

// GET POST BY USER ID
router.get('/byUserId',authenticate,getPostByUserId)

//GET POST OF USER BY GROUPID'S(LIST OF GROUPID'S)
router.post('/byGroups',authenticate,getPostByGroups)

//GET POST BY A SINGLE GROUP ID
router.get('/byGroupName/:groupName',authenticate,getPostByGroupName)

//GET POST BY POST ID'S (LIST OF POST ID'S)
router.get('/byPostId',authenticate,getPostByPostIds)

router.post('/comment/:postId',authenticate,comment)
router.get('/comment/:postId',authenticate,getComment)
module.exports =router