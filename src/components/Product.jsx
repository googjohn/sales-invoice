export default function Product({
    productData,
    changeHandle,
    itemHandle,
    clearItemHandle
}) {
    const addHandle = () => {
        const currPrice = productData.price
        const currQuantity = productData.quantity
        const total = (currPrice * currQuantity).toFixed(2)
        itemHandle(total)
    }

    return (
        <div className="product-container light-border">
            <div className="input-group">
                <div className="item1">
                    <label htmlFor="product">Product</label>
                    <select
                        id="product"
                        value={productData.product}
                        onChange={changeHandle}
                    >
                        <option value="">Select Product</option>
                        <option value="Product1">something1</option>
                        <option value="Product2">something2</option>
                        <option value="Product3">something3</option>
                    </select>
                </div>
                <div className="item2">
                    <label htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        // placeholder="0"
                        value={productData.quantity}
                        onChange={changeHandle}
                    />
                </div>
                <div className="item3">
                    <label htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        // placeholder="0"
                        value={productData.price}
                        onChange={changeHandle}
                    />
                </div>
            </div>
            <div className="button-group">
                <div className="button-container">
                    <button
                        className="btn add"
                        onClick={addHandle}
                    >
                        {"Add"}
                    </button>
                    <button
                        className="btn clear"
                        onClick={clearItemHandle}
                    >
                        {'Clear'}
                    </button>
                </div>
            </div>
        </div>
    )
}