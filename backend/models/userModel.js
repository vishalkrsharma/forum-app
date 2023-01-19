const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')



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
})

//hashing password and checking if email already exists or not
userSchema.statics.signup = async function(email,username,password){
    
    const exists = await this.findOne({email})


    if(exists){
        throw Error('email already in use')
    }
    const salt = await bcrypt.genSalt(10)//more number more time to generate the hash
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email:email,password:hash,username:username})

    return user;
}
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
    console.log('hi')
    return user['_id']
}

module.exports = mongoose.model('User',userSchema)