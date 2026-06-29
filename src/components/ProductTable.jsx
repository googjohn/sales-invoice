import Product from "./Product";
import Table from "./Table";
import "../assets/css/product.css"
import "../assets/css/table.css"

export default function ProductTable({
    items,
    addItemHandle,
    productData,
    clearProductData,
    handleProductDataUpdate,
}) {

    return (
        <div className="pt-container light-border">
            <Product
                addItemHandle={addItemHandle}
                productData={productData}
                handleProductDataUpdate={handleProductDataUpdate}
                clearProductData={clearProductData}
            />
            <Table
                items={items}
            />
        </div>
    )
}