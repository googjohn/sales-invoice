import { useEffect, useState } from 'react'
import InputsComponent from './components/InputComponent'
import Title from './components/Title'
import ProductTable from './components/ProductTable'
import Notes from './components/ResultAndNotes'
import useFetch from './lib/useFetch'

function App() {
  const [formData, setFormData] = useState({
    invoice: '',
    date: '',
    customer: '',
    address: '',
    notes: '',
  })
  const [productData, setProductData] = useState({
    product: '',
    quantity: 1,
    price: 0,
  })
  // const [notes, setNotes] = useState({ notes: '' });
  const [items, setItems] = useState([]);
  const [sendData, setSendData] = useState(false);
  const [getData, setGetData] = useState(false);
  // const { useGetData, useSendData } = useFetch();

  const changeHandle = (e) => {
    const { id, value } = e.currentTarget
    // if (!value) return;
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
      quantity: 1,
      price: 0,
    })
  }

  const clearItemHandle = () => {
    setProductData({
      product: '',
      quantity: 1,
      price: 0,
    })
  }

  // const notesHandle = (e) => {
  //   const { id, value } = e.currentTarget
  //   setNotes(prev => ({
  //     ...prev,
  //     [id]: value
  //   }))
  // }
  // const callPostRequest = (finalData) => {
  // const url = 'http://localhost:1992/api/add'
  // useSendData(finalData, url)
  // }
  // change when handling real data
  const saveHandle = () => {
    if (!items.length) {
      alert('You have not added any product.')
      return
    }
    const finalData = {
      ...formData,
      items
    }

    console.log(finalData)
    const stringified = JSON.stringify(finalData)
    // callPostRequest(finalData)
    alert(stringified)
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
