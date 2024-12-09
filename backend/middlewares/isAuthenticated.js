import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY) //verify token
  //verify token

        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }
        req.id = decode.userId
        next();
    }
    catch (error) {
        console.log(error)
    }

}