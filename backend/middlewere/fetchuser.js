const jwt = require('jsonwebtoken');

const jwt_secretekey = process.env.KEY;

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    //console.log('fetchUser-> ', token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, jwt_secretekey);  // it will return object having two element 1st unique key that you given during jenerating token and 2nd some key (not require)
        // req.body = data.uniqueKey.id;
       // console.log('re ki id -> ',req.headers)
       // console.log(data)
       // console.log('req k i body wa-> ',req.body)
        req.body.userUniqueKey = data.uniqueKey.id; 
       // console.log('req k i body wa-> ',req.body)
        // const dt = req.userUniqueKey;
       // console.log('fetchUser me id-> ',req.body.userUniqueKey) // NOTE:- uniqueKey is not same as seceret key both are diffrent thing 
        // here uniqueKey is name of the object which we passed during generation of token and id is key and value pair
        // res.send(dt);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;