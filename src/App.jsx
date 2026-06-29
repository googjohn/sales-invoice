import { useState } from 'react'
import { useFetchData, useSendData } from './lib/useFetch'
import Title from './components/Title'
import Notes from './components/ResultAndNotes'
import ProductTable from './components/ProductTable'
import InputsComponent from './components/InputComponent'
import { calculateAmount } from './lib/utility'

function App() {
    const [formData, setFormData] = useState({
        invoiceNo: '',
        date: '',
        customer: '',
        address: '',
        notes: '',
    });

    const [productData, setProductData] = useState({
        product: '',
        quantity: 0,
        price: 0,
    });

    const [items, setItems] = useState([]);
    const { fetchData, data: fetchedData } = useFetchData();
    const { sendData } = useSendData();

    // update formData
    const handleChangeInput = (e) => {
        const { id, value } = e.currentTarget
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }))
    }

    // update productData
    const handleProductDataUpdate = (localProductData) => {
        const { product, quantity, price } = localProductData

        setProductData({
            product,
            quantity: Number(quantity),
            price: Number(price),
        })
    }

    // add productData to items[]
    const addItemHandle = () => {

        const existingIndex = items.findIndex(
            item => productData.product === item.product
        )

        if (items.length === 0) {
            const amount = calculateAmount(productData)
            setItems([{
                ...productData,
                amount
            }])
            clearProductData()
            return;
        };

        if (items.length > 0 && existingIndex === -1) {
            const amount = calculateAmount(productData)
            setItems(prev => ([
                ...prev,
                {
                    ...productData,
                    amount
                }
            ]))
            clearProductData()
            return;
        }

        setItems(prev => {
            const newItems = [...prev]
            const newItem = {
                ...newItems[existingIndex],
                quantity: newItems[existingIndex].quantity + productData.quantity,
                price: productData.price
            }
            newItem.amount = calculateAmount(newItem)
            newItems[existingIndex] = newItem

            return newItems
        })
        clearProductData()
        return;
    }

    // clear productData
    const clearProductData = () => {
        setProductData({
            product: '',
            quantity: 0,
            price: 0,
        })
    }

    // clear formData
    const clearFormData = () => {
        setFormData({
            invoice: '',
            date: '',
            customer: '',
            address: '',
            notes: '',
        })
    }

    // change when handling real data
    const handleSaveAndSend = async () => {
        if (!items.length) {
            alert('Product list is empty.')
            return
        }

        const finalData = {
            ...formData,
            items
        }

        console.log(finalData)
        // await sendData(
        //     finalData,
        //     'http://168.144.33.28:8081/api/v1/action/add'
        // )
        alert(`Sales invoice successfully saved. Data intentionally not sent to backend.
            ${JSON.stringify(finalData)}`
        )
    }

    const handleCancel = () => {
        setItems([])
        clearProductData()
        clearFormData()
    }

    return (
        <>
            <section id="center">
                <div className='container'>
                    <Title />
                    <InputsComponent
                        formdata={formData}
                        handleChangeInput={handleChangeInput}
                    />
                    <ProductTable
                        items={items}
                        addItemHandle={addItemHandle}
                        productData={productData}
                        handleProductDataUpdate={handleProductDataUpdate}
                        clearProductData={clearProductData}
                    />
                    <Notes
                        items={items}
                        formData={formData}
                        handleSaveAndSend={handleSaveAndSend}
                        handleCancel={handleCancel}
                        handleChangeInput={handleChangeInput}
                    />
                </div>
            </section>
        </>
    )
}

export default App
