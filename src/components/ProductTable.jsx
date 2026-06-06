import Product from "./Product";
import Table from "./Table";
import "./product.css"
import "./table.css"

export default function ProductTable({
    productData,
    changeHandler,
    items,
    itemHandle,
    clearItemHandle
}) {

    return (
        <div className="pt-container light-border">
            <Product
                productData={productData}
                changeHandle={changeHandler}
                itemHandle={itemHandle}
                clearItemHandle={clearItemHandle}
            />
            <Table
                items={items}
            />
        </div>
    )
}