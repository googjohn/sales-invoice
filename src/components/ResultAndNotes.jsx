import "../assets/css/notes.css"

export default function Notes({
    items,
    formData,
    handleSaveAndSend,
    handleCancel,
    handleChangeInput,
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
                    <textarea
                        name="notes"
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        placeholder="Leave remarks..."
                        onChange={handleChangeInput}
                    ></textarea>
                </div>
                <div className="item2">
                    <span className="amount-heading">Total Amount</span>
                    <span className="amount">{totalAmount.toFixed(2)}</span>
                </div>
            </div>
            <div className="save-button-container">
                <button
                    className="btn add"
                    onClick={handleSaveAndSend}
                >
                    {"Save"}
                </button>
                <button className="btn cancel"
                    onClick={handleCancel}
                >
                    {"Cancel"}
                </button>
            </div>
        </div>
    )
}