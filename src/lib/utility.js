export const calculateAmount = (product) => {
    const currPrice = product.price
    const currQuantity = product.quantity
    const total = currPrice * currQuantity
    return total
}
