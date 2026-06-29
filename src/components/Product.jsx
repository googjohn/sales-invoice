import { useState, useEffect } from "react"

export default function Product({
    addItemHandle,
    productData,
    clearProductData,
    handleProductDataUpdate,
}) {
    const [localProduct, setLocalProduct] = useState({
        product: '',
        quantity: '',
        price: '',
    })

    const handleLocalChange = (e) => {
        const { id, value } = e.currentTarget

        setLocalProduct(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const addHandle = () => {
        if (!productData.product && productData.quantity === 0) {
            alert('Please select product before adding')
            return;
        }

        addItemHandle()
        setLocalProduct({
            product: '',
            quantity: '',
            price: '',
        })
    }

    useEffect(() => {
        handleProductDataUpdate(localProduct)
    }, [localProduct])

    const isValid = productData.product
    return (
        <div className="product-container light-border">
            <div className="input-group">
                <div className="item1">
                    <label htmlFor="product">Product</label>
                    <select
                        id="product"
                        value={localProduct.product}
                        onChange={handleLocalChange}
                    >
                        <option value="">Select Product</option>
                        <option value="Product 1">Product 1</option>
                        <option value="Product 2">Product 2</option>
                        <option value="Product 3">Product 3</option>
                    </select>
                </div>
                <div className="item2">
                    <label htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        placeholder="0"
                        value={localProduct.quantity}
                        onChange={handleLocalChange}
                    />
                </div>
                <div className="item3">
                    <label htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        placeholder="0"
                        value={localProduct.price}
                        onChange={handleLocalChange}
                    />
                </div>
            </div>
            <div className="button-group">
                <div className="button-container">
                    <button
                        className="btn add"
                        onClick={addHandle}
                        disabled={!isValid}
                    >
                        {"Add"}
                    </button>
                    <button
                        className="btn clear"
                        onClick={clearProductData}
                    >
                        {'Clear'}
                    </button>
                </div>
            </div>
        </div>
    )
}