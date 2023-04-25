export default class ProductDTO {
    constructor({ title, price, thumbnail, timestamp, description, code, stock, qty, total_price, id }) {
        this.title = title
        this.price = parseInt(price)
        this.thumbnail = thumbnail
        this.timestamp = timestamp
        this.description = description
        this.code = code
        this.stock = stock
        this.qty = qty
        this.total_price = parseInt(total_price)
        this.id = id
    }
}

export function transformToDTO(products) {
    if (Array.isArray(products)) {
        return products.map(p => new ProductDTO(p))
    } else {
        return new ProductDTO(products)
    }
}