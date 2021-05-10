let isEmpty = require('is-empty')

let validateSignup = (data) => {

    let problems = []

    if (isEmpty(data.name)) {
        problems.push("No name provided")
    }
    if (isEmpty(data.password)) {
        problems.push("No password given")
    } else {
        if (data.password.length < 6) {
            problems.push("The length of the password cannnot be less than 6")
        }
    }
    if (isEmpty(data.email)) {
        problems.push("No email id provided")
    }
    if (isEmpty(data.phone)) {
        problems.push("No phone number provided")
    }

    if (problems.length !== 0) {
        return {
            problems,
            result: false
        }
    } else {
        return {
            problems,
            result: true
        }
    }
}

let signInValidator = (data) => {

    let problems = []

    if (isEmpty(data.email) && isEmpty(data.password)) {
        problems.push("either email or password is not provided")
    }

    if (isEmpty(data.password)) {
        problems.push("No password provided")
    }

    if (problems.length !== 0) {
        return {
            result: false,
            problems
        }
    } else {
        return {
            result: true,
            problems
        }
    }
}

let validateTokenRequest = (data) => {

    let empty = isEmpty(data.token)

    return {
        result: empty ? false : true,
        problems: empty ? ["no token provided"] : []
    }
}


let validateData = (data) => {
    let problems = []

    if (isEmpty(data.services)) {
        problems.push("No services given")
    }

    if (isEmpty(data.products)) {
        problems.push("No products given")
    }

    if (isEmpty(data.parties)) {
        problems.push("No parties given")
    }

    if (isEmpty(data.transations)) {
        problems.push("No transations given ")
    }

    if (isEmpty(data.bussiness)) {
        problems.push("No bussiness given")
    }

    if (isEmpty(data.uid)) {
        problems.push("No user id provided")
    }

    if (problems.length !== 0) {
        res.send({
            result: false,
            problems
        })
    } else {
        res.send({
            result: true,
            problems
        })
    }
}

module.exports = {
    validateSignup,
    signInValidator,
    validateTokenRequest,
    validateData
}