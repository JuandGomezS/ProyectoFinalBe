export default class UserDTO {
    constructor({ username, password, name, address, age, telephone, avatar, cartId }) {
        this.username = username
        this.password = password
        this.name = name
        this.address = address
        this.age = age
        this.telephone = telephone
        this.avatar = avatar
        this.cartId = cartId
    }
}

export function transformToDTO(users) {
    if (Array.isArray(users)) {
        return users.map(u => new UserDTO(u))
    } else {
        return new UserDTO(users)
    }
}