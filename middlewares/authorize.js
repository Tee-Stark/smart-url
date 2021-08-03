const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = {
    authorize:  async (req, res, next) => {
        const bearerToken = req.get('Authorization');
        if(bearerToken){
            const token = bearerToken.split(" ")[1];
            await jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if(err) res.status(401).json(err);
                req.decoded = decoded;
                next();
            });
        } else {
            res.status(401).json({Error: "Access denied! No authentication token provided"});
        }
    },
    authAdmin: async (req, res, next) => {
        const accessToken = req.get('Authorization');
        if(accessToken) {
            const token = accessToken.split(" ")[1];
            await jwt.verify(accessToken, config.JWT_ADMINSECRET, (err, decoded) => {
                if(err) return res.status(401).json(err);
                req.decoded = decoded;
                next();
            });
        } else {
            res.status(401).json({Error: "Access denied! can't authenticate you as an admin"});
        }
    }
};