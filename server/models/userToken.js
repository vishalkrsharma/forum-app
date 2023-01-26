const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userTokenSchema = new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            required:true
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 30 * 86400, // 30 days
        },
    }
)
userTokenSchema.statics.registerToken = async function(id,refToken){
    const user = this.findOne({id})
    if(user) await user.deleteOne();
    const status =await this.create({userId:id,token:refToken})
    console.log(status)
    if(!status)throw Error('Cannot store Token')
    return 'Success';
}
userTokenSchema.statics.verifyToken = async function(refToken){
    if(refToken==null)throw Error('Reference Token is Null')
    const token = this.findOne({refToken})
    if(!token) throw Error('User is logged out')
    return true;
}
userTokenSchema.statics.deleteToken = async function(userId){
    const status = await this.findByIdAndRemove(userId)
    console.log(status)
    if(!status)throw Error('you are logged out! Kindly login ')
    return status
}
module.exports = mongoose.model("Token",userTokenSchema)

 