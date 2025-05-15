const jwt = require("jsonwebtoken")

const authMidleware = async (req,res, next) =>{
    const token = req.header("Authorization")
    // console.log(token)
    if(!token){
        return res.status(401).json("Unauthorized")
    }
    try {
        const decode = jwt.verify(token,"group33");
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json("Unauthorized")
    }
}

module.exports = authMidleware