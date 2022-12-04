const moment = require("moment");
const { config: { timeFormat } } = require("../../constants/config");

class CartBody {
    constructor() {
        this.timestamp = moment().format(timeFormat);
        this.products = [];
    }
}

module.exports = CartBody
