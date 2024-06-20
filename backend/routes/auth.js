const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_secretekey = process.env.KEY;

// for using express validator
const { body, validationResult } = require('express-validator');

let fetchuser = require('../middlewere/fetchuser');

// Router 1 
// create an user using : POST "api/auth/" 
router.post('/createuser',
    body('email', 'Enter a valid Email').isEmail(),
    // username must be an email
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('password', 'Enter a valid Password').isLength({ min: 5 }),

    async (req, res) => {
        let success = true;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": !success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ "success": !success, errors: 'Sorry, this email is already registered' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                email: req.body.email,
                name: req.body.name,
                password: hashpassword,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, jwt_secretekey);

            res.status(200).json({ "success": success, "token": authtoken, "message": 'You are regesterd succesfully' });
        } catch (error) {
            res.status(500).send({ "success": !success, "error": 'Some error occur' });
        }
    },
);



// Router 2 
router.post('/login',
    // username must be an email    
    body('email', 'Enter a valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Enter a valid Password').isLength({ min: 5 }),

    async (req, res) => {
        let success = true;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "error": errors.array() });
        }

        try {
            let isuserExist = await User.findOne({ email: req.body.email });
            if (!isuserExist) {
                return res.status(400).json({ "success": !success, error: 'Not exist' });
            }

            const comparepassword = await bcrypt.compare(req.body.password, isuserExist.password);

            if (!comparepassword)
                return res.status(400).json({ "success": !success, error: 'Invalid Login Credentials' });

            const data = {
                uniqueKey: {
                    id: isuserExist.id
                }
            }
            // jwt.sign(para1,para2); ==>> para1:- (it should be object) some unique key for every user here we are using id of user as a parameter1 ,, para2:- secreate key min 32character
            const authtoken = jwt.sign(data, jwt_secretekey);
            return res.status(200).json({ "success": success, "token": authtoken });

        } catch (error) {
            return res.status(500).send({ "success": !success, error: 'Some error occur' });
        }
    },
);


// Router 3 :- geting user information
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        // const token = req.header('auth-token');
        // const token = req.header('auth-token');
        // console.log('asas->',req.headers['access_token']);
        // console.log(req.header)
        let userId = req.body.userUniqueKey;
       // console.log('asasasas->',userId);
        const user = await User.findById(userId).select("-password");
        res.status(200).send(user);
    } catch (error) {
      //  console.log(error);
        res.status(500).send('Some error occur');
    }
},
);

module.exports = router;