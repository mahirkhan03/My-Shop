const { verifyToken } = require("../helper")

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(token){
          if(verifyToken(token)){
            next()
          }else{
            res.send({msg:" invalid token " , flag:0})
          }
        }else{
            res.send({msg:" token not found" , flag:0})
        }

    } catch (error) {
        res.send(
            {
                msg: "Internal server error",
                flag: 0
            }
        )
    }
}

module.exports =adminAuth;