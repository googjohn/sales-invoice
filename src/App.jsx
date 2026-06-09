import { useState } from 'react'
import { useFetchData, useSendData } from './lib/useFetch'
import Title from './components/Title'
import Notes from './components/ResultAndNotes'
import ProductTable from './components/ProductTable'
import InputsComponent from './components/InputComponent'

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

  const changeHandle = (e) => {
    const { id, value } = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const productUpdateHandle = (e) => {
    const { id, value } = e.currentTarget
    setProductData(prev => ({
      ...prev,
      [id]: id !== 'product' ? parseInt(value) : value
    }))
  }

  const itemHandle = (amount) => {
    const newItem = {
      ...productData,
      amount: amount
    }

    setItems(prev => ([
      ...prev,
      newItem
    ]))

    setProductData({
      product: '',
      quantity: 0,
      price: 0,
    })
  }

  const clearItemHandle = () => {
    setProductData({
      product: '',
      quantity: 0,
      price: 0,
    })
  }

  // change when handling real data
  const saveHandle = async () => {
    if (!items.length) {
      alert('You have not added any product.')
      return
    }
    const finalData = {
      ...formData,
      items
    }

    console.log(finalData)
    await sendData(
      JSON.stringify(finalData),
      'http://168.144.33.28:8081/api/v1/action/add'
    )
    alert(JSON.stringify(finalData))
  }

  const cancelHandle = () => {
    setItems([])
    clearItemHandle()
    setFormData({
      invoice: '',
      date: '',
      customer: '',
      address: '',
      notes: '',
    })
  }
  console.log(items)
  console.log(formData)
  console.log(productData)
  return (
    <>
      <section id="center">
        <div className='container'>
          <Title />
          <InputsComponent
            formdata={formData}
            changeHandle={changeHandle}
          />
          <ProductTable
            productData={productData}
            changeHandler={productUpdateHandle}
            items={items}
            itemHandle={itemHandle}
            clearItemHandle={clearItemHandle}
          />
          <Notes
            items={items}
            formData={formData}
            saveHandle={saveHandle}
            cancelHandle={cancelHandle}
            notesHandle={changeHandle}
          />
        </div>
      </section>
    </>
  )
}

export default App
