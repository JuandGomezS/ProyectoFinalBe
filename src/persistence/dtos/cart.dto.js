export default class CartDTO {
    constructor({ timestamp, products, id }) {
        this.products = products
        this.timestamp = timestamp
        this.id = id
    }
}

export function transformToDTO(products) {
    if (Array.isArray(products)) {
        return products.map(p => new CartDTO(p))
    } else {
        return new CartDTO(products)
    }
}