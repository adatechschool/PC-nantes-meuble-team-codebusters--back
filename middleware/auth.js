const jwt = require('jwt-simple');
const secret = 'xxx';
 
const auth = (req, res, next) => {
    const token = req.headers.authorization
    try {
    const decoded = jwt.decode(token, secret)
    req.headers.context = decoded
    next()
    } catch(e) {
        console.log(e.message)
        res.status(403).json({error : 'invalid token'})
    }
}

module.exports = {auth, secret}