const { json } = require('express')
const express = require('express')
const {createUserPost,getAll,deletePost}=require('../controllers/postController')
const {authenticate}=require('../middleware/userAuth')
const router = express.Router()

//CREATE POST
router.post('/create',authenticate,createUserPost)

//GET ALL POST 
router.get('/getAll',authenticate,getAll)


//DELETE POST
router.delete('/delete/:post',authenticate,deletePost)

router.post('/comment/:post',(req,res)=>{
    res.status(200).json({id:req.params})
})

module.exports =router