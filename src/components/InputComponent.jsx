import "./inputComponent.css"

export default function InputsComponent({
    formdata,
    changeHandler
}) {
    return (
        <div className="input-container">
            <div className="input-group item1">
                <div className="item1-child1">
                    <label htmlFor="invoice">Invoice #</label>
                    <input
                        id="invoice"
                        type="text"
                        value={formdata.invoice}
                        onChange={changeHandler}
                    />
                </div>

                <div className="item1-child2">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={formdata.date}
                        onChange={changeHandler}
                    />
                </div>

            </div>
            <div className="input-group item2">
                <label htmlFor="customer">Customer</label>
                <input
                    type="text"
                    id="customer"
                    value={formdata.customer}
                    onChange={changeHandler}
                />
            </div>
            <div className="input-group item3">
                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    name="address"
                    rows={4}
                    autoComplete="off"
                    value={formdata.address}
                    onChange={changeHandler}
                />
            </div>
        </div>
    )
}