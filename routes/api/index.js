const route = require('express').Router()


route.use('/todos',require('./todos'))

exports = module.exports ={route}