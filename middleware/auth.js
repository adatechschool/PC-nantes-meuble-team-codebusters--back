const jwt = require('jwt-simple');
const secret = 'xxx';
 
// decode
//var decoded = jwt.decode(token, secret);

//console.log(decoded); //=> { foo: 'bar' }

// const auth = (req, res, next) => {
//     const payload = { foo: 'bar', userName: 'juliette', id: '123'};
//     const token = jwt.encode(payload, secret);
//     console.log(token)
//     next()
// }

const auth = (req, res, next) => {
    const token = req.headers.authorization
    //const bearer = req.headers.authorization
    //console.log(bearer)
    //const token = bearer.split(" ")[1]
    console.log(token)
    try {
    const decoded = jwt.decode(token, secret)
    //req.headers.context = decoded
    next()
    } catch(e) {
        console.log(e)
        res.status(403).json({error : 'invalid token'})
    }
}

module.exports = {auth, secret}