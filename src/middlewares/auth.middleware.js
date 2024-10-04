const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyJWT = async (req, res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // Express headers are auto converted to lowercase

    if (!authHeader){

        return res.status(401).json({
            message: "Invalid token or token missing"
        })
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(403); //Invalid Token
        const { _id } = decoded;
        const user = await User.findById(_id).select("-passwordHash");
        if (!user) {
            res.status(403).json({
                message: `invalid token`,                
            });
            
        }
        req.user = user;
        next();
    })

    


















    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    // const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(403); //Invalid Token
            const { _id } = decoded;
            const user = await User.findById(_id).select("-passwordHash");
            req.user = user;
            next();
        }
    );
}

