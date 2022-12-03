const moment = require("moment");
const { config: { timeFormat } } = require("../../constants/config");

class ProductBody {
    constructor({ title, description, code, thumbnail, price, stock }) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail || null;
        this.price = Number(price);
        this.stock = Number(stock);
        this.timestamp = moment().format(timeFormat);
    }
}

module.exports = ProductBody;