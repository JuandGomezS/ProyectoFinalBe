const { validationResult } = require('express-validator');

const validationResults = (req, res, next) => {

    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        let errors = error.array().reduce((unique, o) => {
            if (!unique.some(obj => obj.msg === o.msg && obj.param === o.param && obj.location === o.location)) {
                unique.push(o);
            }
            return unique;
        }, []);

        res.status(403)
        res.json({
            success: false,
            errors
        })
    }
};

module.exports = validationResults