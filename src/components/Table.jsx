export default function Table({ items }) {
    const rowCount = Math.max(4, items.length)
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="product">Product</th>
                        <th className="quantity">Quantity</th>
                        <th className="price">Price</th>
                        <th className="amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, index) => {
                        const item = items[index]
                        return (
                            <tr key={index}>
                                <td>{item?.product ?? ""}</td>
                                <td>{item?.quantity ?? ""}</td>
                                <td>{item?.price ?? ""}</td>
                                <td>{item?.amount ?? ""}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}