import "../assets/css/inputComponent.css"

export default function InputsComponent({
    formdata,
    handleChangeInput
}) {
    return (
        <div className="input-container">
            <div className="input-group item1">
                <div className="item1-child1">
                    <label htmlFor="invoice">Invoice #</label>
                    <input
                        id="invoiceNo"
                        type="text"
                        value={formdata.invoice}
                        placeholder="001"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="item1-child2">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={formdata.date}
                        onChange={handleChangeInput}
                    />
                </div>

            </div>
            <div className="input-group item2">
                <label htmlFor="customer">Customer</label>
                <input
                    type="text"
                    id="customer"
                    value={formdata.customer}
                    placeholder="Customer name"
                    onChange={handleChangeInput}
                />
            </div>
            <div className="input-group item3">
                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    name="address"
                    rows={3}
                    autoComplete="off"
                    value={formdata.address}
                    placeholder="Customer address"
                    onChange={handleChangeInput}
                />
            </div>
        </div>
    )
}