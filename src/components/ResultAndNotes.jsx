import "./notes.css"

export default function Notes({
    items,
    saveHandle,
    cancelHandle
}) {
    const totalAmount = items.reduce((acc, cur) => {
        acc += parseInt(cur.amount)
        return acc
    }, 0)

    return (
        <div className="notes-container">
            <div className="notes-result-container">
                <div className="item1">
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" rows={4}></textarea>
                </div>
                <div className="item2">
                    <span className="amount-heading">Total Amount</span>
                    <span className="amount">{totalAmount.toFixed(2)}</span>
                </div>
            </div>
            <div className="save-button-container">
                <button
                    className="btn add"
                    onClick={saveHandle}
                >
                    {"Save"}
                </button>
                <button className="btn cancel"
                    onClick={cancelHandle}
                >
                    {"Cancel"}
                </button>
            </div>
        </div>
    )
}