let router = require('express').Router()
let auth = require('./auth')
let data = require('./data')

router.use('/auth', auth)
router.use('/data', data)

module.exports = router