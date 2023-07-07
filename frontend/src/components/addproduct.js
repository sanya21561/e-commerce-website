import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    cat_id: '',
    brand_id: '',
    stock: '',
    price: '',
    prod_desc: '',
    prod_name: '',
    invent_id: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmission = (e) => {
    // e.preventDefault()
    console.log(formData)

    axios.post("http://localhost:8000/getallproducts/addproduct", formData)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
    // code to submit the form data to the server using axios
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 h-screen">
      <h1 className="text-3xl font-bold my-6">Add Product</h1>
      <form className="flex flex-col bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmission}>
        <label htmlFor="cat_id" className="text-lg font-medium mb-2">Category ID:</label>
        <input type="number" id="cat_id" name="cat_id" value={formData.cat_id} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="brand_id" className="text-lg font-medium mb-2">Brand ID:</label>
        <input type="number" id="brand_id" name="brand_id" value={formData.brand_id} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="stock" className="text-lg font-medium mb-2">Stock:</label>
        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="price" className="text-lg font-medium mb-2">Price:</label>
        <input type="text" id="price" name="price" value={formData.price} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="prod_desc" className="text-lg font-medium mb-2">Product Description:</label>
        <textarea id="prod_desc" name="prod_desc" value={formData.prod_desc} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="prod_name" className="text-lg font-medium mb-2">Product Name:</label>
        <input type="text" id="prod_name" name="prod_name" value={formData.prod_name} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

        <label htmlFor="invent_id" className="text-lg font-medium mb-2">Inventory ID:</label>
        <input type="number" id="invent_id" name="invent_id" value={formData.invent_id} onChange={handleInputChange} className="px-4 py-2 rounded-md border border-gray-300 mb-4" />

            <button type="submit">Submit</button>
          </form>
        </div>
      )
}

export default AddProduct
