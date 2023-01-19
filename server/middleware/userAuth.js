const jwt = require('jsonwebtoken')
function authenticate(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) return res.status(401)
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return res.status(403)
        req.user=user
        next()
    })
}
module.exports ={authenticate}
