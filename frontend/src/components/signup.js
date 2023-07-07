import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    username: '',
    passw: '',
    phone_numb: '',
    address: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    console.log(formData)

    
    axios.post("http://localhost:8000/signup",formData)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
    // code to submit the form data to the server using axios
  }

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <form className="w-full max-w-lg bg-white p-8 rounded shadow-lg" onSubmit={handleSubmission}>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input className="border rounded w-full py-2 px-3" type="text" name="fname" value={formData.fname} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Middle Name</label>
            <input className="border rounded w-full py-2 px-3" type="text" name="mname" value={formData.mname} onChange={handleInputChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input className="border rounded w-full py-2 px-3" type="text" name="lname" value={formData.lname} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">User Name</label>
            <input className="border rounded w-full py-2 px-3" type="text" name="username" value={formData.username} onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input className="border rounded w-full py-2 px-3" type="text" name="passw" value={formData.passw} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input className="border rounded w-full py-2 px-3" type="number" name="phone_numb" value={formData.phone_numb} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input className="border rounded w-full py-2 px-3" type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="mt-4">
          <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
