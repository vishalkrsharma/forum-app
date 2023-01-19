const mongoose = require('mongoose')

const Schema = mongoose.Schema


const postSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    groupId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
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
        type:Int32Array
    }
})



module.exports = mongoose.model('Post',postSchema)