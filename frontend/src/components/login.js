import React, { useState } from 'react';
import axios from 'axios';

const Login = ({user,setUser}) => {
  const [formData, setFormData] = useState({
    username: '',
    passw: '',
  });





  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    //console.log(formData);

    axios
      .post('http://localhost:8000/login', formData)
      .then((res) => {
        
        console.log(res.data);
        if(res.data[0]=== undefined){
            console.log("can't login");
        }else{
            console.log(res.data[0])
            if(res.data[0].user_id >=86 && res.data[0].user_id<=95){
              res.data[0]["role"] = "Deliverer"
              res.data[0]["address"] = "anonymous"
            }else if(res.data[0].user_id>= 1 && res.data[0].user_id<=5){
              res.data[0]["role"] = "Admin"
              res.data[0]["address"] = "anonymous"
            }else{
              res.data[0]["role"] = "Customer"
              axios.get(`http://localhost:8000/login/${res.data[0].user_id}`)
              .then((result)=>{
                console.log("Hellow")
                console.log(result.data[1][0].address)
                res.data[0]["address"] = result.data[1][0].address
              })
              .catch((err)=>console.log(err))

            }
            // console.log(res.data[0])
            setUser(res.data[0])
            console.log(user)
            localStorage.setItem('user',JSON.stringify(res.data[0]))
            console.log(`You are logged in as ${res.data[0].fname}!`)
            console.log(JSON.parse(localStorage.getItem('user')))
        }
      })
      .catch((err) => console.log(err));
    // code to submit the form data to the server using axios
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmission}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Enter username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="passw"
            className="block text-gray-700 font-bold mb-2"
          >
            Enter password
          </label>
          <input
            type="text"
            name="passw"
            value={formData.passw}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
