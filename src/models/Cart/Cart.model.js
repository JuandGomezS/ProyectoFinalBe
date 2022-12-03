const moment = require("moment");
const { config: { timeFormat } } = require("../../constants/config");

export class CartBody {
    constructor() {
        this.timestamp = moment().format(timeFormat);
        this.productos = [];
    }
}

