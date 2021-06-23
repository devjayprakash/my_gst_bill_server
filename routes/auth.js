let router = require('express').Router()
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { validateSignup, signInValidator, validateTokenRequest, } = require('../util/validators')
let User = require('../database/schema/user')

//user sign up
router.post('/signup', async (req, res, next) => {

    let data = req.body;
    let validate = validateSignup(data)

    if (validate.result) {

        data.password = await bcrypt.hash(data.password, 10)

	    B
        try {
            let user = new User(data)
            let saved_user = await user.save()

            let token = jwt.sign({
                uid: saved_user._id,
                email: saved_user.email
            }, process.env.JWT_PASS)

            res.send({
                result: true,
                token,
                user: {
                    id: saved_user._id,
                    name: saved_user.name,
                    email: saved_user.email,
                    phone: saved_user.phone
                },
                msg: "New user created successfully"
            })

        } catch (err) {
            next(err)
        }

    } else {
        res.send({
            result: false,
            msg: "All the data was not provided",
            problems: validate.problems
        })
    }
})

//user sign in
router.post('/signin', async (req, res, next) => {
    let data = req.body
    let validate = signInValidator(data)

    if (validate.result) {

        try {
            let user = await User.findOne({email : data.email})
            if (user !== null) {

                let password = user.password
                let same = await bcrypt.compare(data.password, password)

                if (same) {
                    let token = jwt.sign({ uid: user._id, email: user.email }, process.env.JWT_PASS)

                    res.send({
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone
                        },
                        token,
                        result: true,
                        msg: "user authenticated successfully"
                    })
                } else {
                    res.send({
                        result: false,
                        msg: "Invalid password"
                    })
                }

            } else {
                res.send({
                    result: false,
                    msg: "No user found with the given email id"
                })
            }
        } catch (err) {
            next(err)
        }

    } else {
        res.send({
            result: false,
            msg: "All the reqested fields were not provided",
            problems: validate.problems
        })
    }

})

//user token verification
router.post("/validateToken", async (req, res) => {
    let data = req.body
    let validate = validateTokenRequest(data)

    if (validate.result) {
        let { token } = data;

        let decoded = jwt.decode(token, process.env.JWT_PASS)

        if (decoded !== null) {
            let id = decoded.uid;

            let user = await User.findById(id)
            delete user.password;

            res.send({
                user,
                result: true,
                msg: "Token verification successfully"
            })
        } else {
		B
            res.send({
                result: false,
                msg: "Invalid token"
            })
		A
        }
 
    } else {
        res.send({
            result: false,
            msg: "No token provided",
            problems: validate.problems
        })
    }

})

module.exports = router
