const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    groups:{
        type:Array,
    },
    posts:{
        type:Array
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

//hashing password and checking if email already exists or not
userSchema.statics.signup = async function(email,username,password){
    
    const emailExists = await this.findOne({email})
    
    const usernameExists = await this.findOne({username})

    if(emailExists){
        throw Error('email already in use')
    }
    if(usernameExists){
        throw Error('username already in use')
    }
    
    const salt = await bcrypt.genSalt(10)//more number more time to generate the hash
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email:email,password:hash,username:username})

    return user;
}

//LOGIN USER
userSchema.statics.login = async function(email,password){
    
    //on the basis of email we are finding the data
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return {
        "id":user.id,
        "username":user["username"],
    }
}
//GET USER GROUPS
userSchema.statics.getUserGroups = async function (userId){
    console.log(userId)
    const data = await this.findOne({userId})
    console.log(data)
    if(data.groups.length==0) return "You have not joined any group "
    return data.groups    
}


/*
    DELETE POST FOR A PARTICULAR USER
    WHEN DELETING A POST WE NEED TO UPDATE THE USER POST FIELD ALSO 
    WHERE WE ADD THE CREATED THE POST OR DELETE THE POST 
*/

userSchema.statics.deletePost = async function(userId,postId){
    const user = await this.findOne({userId})
    if(!user)throw Error("Something went wrong plz try again")
    const userPost = user.posts
    userPost.remove(postId)
    const status = await this.updateOne({_id:userId},{'$set':{posts:userPost}},{upsert:false})
    if(!status) throw Error("Something went wrong plz try again")
    return true
}


/*
    UPDATE GROUP DEFINES THE STATE OF A USER WHERE
    IF THE USER JOINS A GROUP IT ADDS THE GROUP INFO IN THE GROUP 
    AND IF THE USER LEAVES THEN IT REMOVES FROM THE GROUPS FIELD
*/

userSchema.statics.updateGroup = async function(group,userId,state){
    const user = await this.findById(userId)
    if(!user) throw Error('User does not exists')

    const groups = user.groups
    
    if(state)groups.push(group)
    else groups.pop(group)

    const status = await this.updateOne({_id:userId},{$set:{groups:groups}},{upsert:false})

    if(!status)throw Error("Something went wrong!")

    return status;
}



/*
    GET PROFILE RETURNS THE REQUIRED PROFILE OF THE USER 
*/
userSchema.statics.profile = async function(username){
    const user = this.findOne({username})
    if(!user) throw Error("There is No Such User")
    return user
}

module.exports = mongoose.model('User',userSchema)