import { useState } from 'react'
import InputsComponent from './components/InputComponent'
import Title from './components/Title'
import ProductTable from './components/ProductTable'
import Notes from './components/ResultAndNotes'

function App() {
  const [formData, setFormData] = useState({
    invoice: '',
    date: '',
    customer: '',
    address: '',
  })
  const [productData, setProductData] = useState({
    product: '',
    quantity: 1,
    price: 0,
  })
  const [notes, setNotes] = useState({ notes: '' })
  const [items, setItems] = useState([])

  const changeHandle = (e) => {
    const { id, value } = e.currentTarget
    if (!value) return;
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

  const notesHandle = (e) => {
    const { id, value } = e.currentTarget
    setNotes(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // change when handling real data
  const saveHandle = () => {
    if (!items.length) {
      alert('You have not added any product.')
      return
    }
    const finalData = items.map(item => ({
      ...item,
      ...formData,
      ...notes
    }))

    console.log(finalData)
    const stringified = JSON.stringify(finalData)
    alert(stringified)
  }

  const cancelHandle = () => {
    setItems([])
    setFormData({
      invoice: '',
      date: '',
      customer: '',
      address: '',
    })
    clearItemHandle()
  }
  return (
    <>
      <section id="center">
        <div className='container'>
          <Title />
          <InputsComponent
            formdata={formData}
            changeHandler={changeHandle}
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
            saveHandle={saveHandle}
            cancelHandle={cancelHandle}
            notesHandle={notesHandle}
          />
        </div>
      </section>
    </>
  )
}

export default App
