const {check} = require('express-validator');
const validationResults = require('../handlers/handle.validator')


const productValidator = [
    check("title").exists().notEmpty().isString(),
    check("price").exists().notEmpty().isDecimal(),
    check("thumbnail").exists().notEmpty().isString().isURL(),
    check("stock").exists().notEmpty().isNumeric(),
    check("description").exists().notEmpty().isString(),
    check("code").exists().notEmpty().isNumeric(),
    (req, res, next) => validationResults(req, res, next)
]

module.exports = {productValidator};